import { NextResponse } from "next/server"

export async function GET() {
  console.log("=== TESTE COMPLETO DO SISTEMA ===")

  try {
    const results = {
      timestamp: new Date().toISOString(),
      environment: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Configurado" : "❌ Não configurado",
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Configurado" : "❌ Não configurado",
        resendKey: process.env.RESEND_API_KEY ? "✅ Configurado" : "❌ Não configurado",
      },
      tests: {
        supabase: { status: "pending" },
        email: { status: "pending" },
        contact: { status: "pending" },
      },
    }

    // 1. Teste do Supabase
    console.log("🔍 Testando Supabase...")
    try {
      const { supabase } = await import("@/lib/supabase")
      const { count, error } = await supabase.from("contacts").select("*", { count: "exact", head: true })

      if (error) {
        results.tests.supabase = {
          status: "❌ Erro",
          error: error.message,
        }
      } else {
        results.tests.supabase = {
          status: "✅ Sucesso",
          contactsCount: count || 0,
        }
      }
    } catch (error) {
      results.tests.supabase = {
        status: "❌ Erro",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }
    }

    // 2. Teste do Email
    console.log("📧 Testando sistema de email...")
    try {
      const { testEmailConfig } = await import("@/lib/email")
      const emailResult = await testEmailConfig()

      results.tests.email = {
        status: emailResult.success ? "✅ Sucesso" : "❌ Erro",
        configured: emailResult.configured,
        details: emailResult,
      }
    } catch (error) {
      results.tests.email = {
        status: "❌ Erro",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }
    }

    // 3. Teste do formulário de contato
    console.log("📝 Testando formulário de contato...")
    try {
      const testContact = {
        nome: "Teste Sistema Completo",
        email: "teste@huios.com",
        telefone: "(91) 99999-9999",
        empresa: "Huios Teste",
        servico: "Consultoria",
        mensagem: "Teste completo do sistema de contato com nova chave Resend.",
      }

      // Simular chamada para a API de contato
      const contactResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testContact),
        },
      )

      const contactResult = await contactResponse.json()

      results.tests.contact = {
        status: contactResult.success ? "✅ Sucesso" : "❌ Erro",
        details: contactResult,
      }
    } catch (error) {
      results.tests.contact = {
        status: "❌ Erro",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }
    }

    console.log("=== RESULTADOS DOS TESTES ===")
    console.log(JSON.stringify(results, null, 2))

    return NextResponse.json(results)
  } catch (error) {
    console.error("Erro geral no teste:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro no teste completo do sistema",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
