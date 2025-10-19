import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { sendContactNotification, sendAutoReply } from "@/lib/email"
import { sendContactNotificationSMTP, sendAutoReplySMTP } from "@/lib/email-smtp"

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

    // 1. Verificar se Supabase está configurado
    console.log("🔌 Verificando configuração Supabase...")
    
    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                                process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co" &&
                                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && 
                                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "placeholder_key"

    let savedContact = null

    if (isSupabaseConfigured) {
      // 2. Salvar no banco de dados (se configurado)
      console.log("💾 Salvando contato no banco...")

      try {
        const { data: dbContact, error: dbError } = await supabase
          .from("contacts")
          .insert([contactData])
          .select()
          .single()

        if (dbError) {
          console.error("❌ Erro ao salvar:", dbError)
          throw dbError
        }

        savedContact = dbContact
        console.log("✅ Contato salvo! ID:", savedContact.id)
      } catch (dbError) {
        console.error("❌ Erro no banco:", dbError)
        return NextResponse.json(
          {
            success: false,
            error: "Erro ao salvar contato no banco de dados",
            details: dbError instanceof Error ? dbError.message : "Erro desconhecido",
          },
          { status: 500 },
        )
      }
    } else {
      console.log("⚠️ Supabase não configurado - pulando salvamento no banco")
      // Criar um contato simulado para o retorno
      savedContact = {
        id: `temp_${Date.now()}`,
        ...contactData,
        created_at: new Date().toISOString(),
      }
    }

    // 3. Enviar emails (tentar Resend primeiro, depois SMTP como fallback)
    console.log("📧 Enviando emails...")

    // Tentar Resend primeiro
    let notificationResult, autoReplyResult
    
    try {
      [notificationResult, autoReplyResult] = await Promise.allSettled([
        sendContactNotification(contactData),
        sendAutoReply(contactData),
      ])
      
      // Verificar se Resend funcionou
      const resendWorked = notificationResult.status === "fulfilled" && 
                          notificationResult.value.success
      
      if (!resendWorked) {
        console.log("⚠️ Resend falhou, tentando SMTP...")
        throw new Error("Resend falhou")
      }
    } catch (error) {
      console.log("🔄 Tentando SMTP como fallback...")
      [notificationResult, autoReplyResult] = await Promise.allSettled([
        sendContactNotificationSMTP(contactData),
        sendAutoReplySMTP(contactData),
      ])
    }

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
