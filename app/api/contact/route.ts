import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { sendContactNotification, sendAutoReply } from "@/lib/email"

export async function GET() {
  return NextResponse.json({
    message: "API de contato funcionando!",
    timestamp: new Date().toISOString(),
    env: {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Configurado" : "❌ Não configurado",
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Configurado" : "❌ Não configurado",
      resendKey: process.env.RESEND_API_KEY ? "✅ Configurado" : "❌ Não configurado",
    },
  })
}

export async function POST(request: Request) {
  try {
    console.log("=== INICIANDO PROCESSAMENTO CONTATO ===")

    const body = await request.json()
    console.log("📝 Dados recebidos:", body)

    // Validar dados obrigatórios
    if (!body.nome || !body.email || !body.mensagem) {
      console.log("❌ Dados obrigatórios faltando")
      return NextResponse.json(
        {
          success: false,
          error: "Nome, email e mensagem são obrigatórios",
        },
        { status: 400 },
      )
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      console.log("❌ Email inválido:", body.email)
      return NextResponse.json(
        {
          success: false,
          error: "Formato de email inválido",
        },
        { status: 400 },
      )
    }

    // Preparar dados para o banco
    const contactData = {
      name: body.nome.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.telefone?.trim() || null,
      company: body.empresa?.trim() || null,
      service_type: body.servico?.trim() || null,
      message: body.mensagem.trim(),
      status: "novo",
    }

    console.log("✅ Dados preparados:", contactData)

    // 1. Testar conexão com Supabase
    console.log("🔌 Testando conexão Supabase...")

    try {
      const { error: testError } = await supabase.from("contacts").select("count", { count: "exact", head: true })

      if (testError) {
        console.error("❌ Erro teste conexão:", testError)
        throw testError
      }

      console.log("✅ Conexão Supabase OK")
    } catch (connectionError) {
      console.error("❌ Falha na conexão:", connectionError)
      return NextResponse.json(
        {
          success: false,
          error: "Erro de conexão com banco de dados",
          details: connectionError instanceof Error ? connectionError.message : "Erro desconhecido",
        },
        { status: 500 },
      )
    }

    // 2. Salvar no banco de dados
    console.log("💾 Salvando contato no banco...")

    const { data: savedContact, error: dbError } = await supabase
      .from("contacts")
      .insert([contactData])
      .select()
      .single()

    if (dbError) {
      console.error("❌ Erro ao salvar:", dbError)
      return NextResponse.json(
        {
          success: false,
          error: "Erro ao salvar contato",
          details: dbError.message,
        },
        { status: 500 },
      )
    }

    console.log("✅ Contato salvo! ID:", savedContact.id)

    // 3. Enviar emails (em paralelo para ser mais rápido)
    console.log("📧 Enviando emails...")

    const [notificationResult, autoReplyResult] = await Promise.allSettled([
      sendContactNotification(contactData),
      sendAutoReply(contactData),
    ])

    // Processar resultado da notificação
    let adminEmailSent = false
    if (notificationResult.status === "fulfilled") {
      const result = notificationResult.value
      if (result.success) {
        console.log("✅ Notificação admin enviada")
        adminEmailSent = true
      } else if (result.skipped) {
        console.log("⏭️ Notificação admin pulada")
        adminEmailSent = true
      } else {
        console.warn("⚠️ Falha notificação admin:", result.error)
      }
    } else {
      console.error("❌ Erro notificação admin:", notificationResult.reason)
    }

    // Processar resultado da auto-resposta
    let clientEmailSent = false
    if (autoReplyResult.status === "fulfilled") {
      const result = autoReplyResult.value
      if (result.success) {
        console.log("✅ Auto-resposta enviada")
        clientEmailSent = true
      } else if (result.skipped) {
        console.log("⏭️ Auto-resposta pulada")
        clientEmailSent = true
      } else {
        console.warn("⚠️ Falha auto-resposta:", result.error)
      }
    } else {
      console.error("❌ Erro auto-resposta:", autoReplyResult.reason)
    }

    // 4. Resposta final
    const response = {
      success: true,
      message: "Contato enviado com sucesso! Entraremos em contato em breve.",
      contact: {
        id: savedContact.id,
        name: savedContact.name,
        email: savedContact.email,
        created_at: savedContact.created_at,
      },
      emails: {
        admin: adminEmailSent,
        client: clientEmailSent,
      },
      timestamp: new Date().toISOString(),
    }

    console.log("🎉 PROCESSAMENTO CONCLUÍDO COM SUCESSO!")
    console.log("📊 Resultado:", response)

    return NextResponse.json(response)
  } catch (error) {
    console.error("💥 ERRO CRÍTICO:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
        details: error instanceof Error ? error.message : "Erro desconhecido",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
