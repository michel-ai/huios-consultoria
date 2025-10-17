import { NextResponse } from "next/server"
import { testEmailConfig } from "@/lib/email"

export async function POST() {
  try {
    console.log("=== DEBUG SISTEMA DE EMAIL ===")

    // Verificar variáveis de ambiente
    const envCheck = {
      RESEND_API_KEY: process.env.RESEND_API_KEY ? "✅ Configurada" : "❌ Não configurada",
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      NODE_ENV: process.env.NODE_ENV || "development",
    }

    console.log("Variáveis de ambiente:", envCheck)

    // Testar configuração do Resend
    const emailTest = await testEmailConfig()
    console.log("Teste de email:", emailTest)

    // Informações detalhadas
    const debugInfo = {
      timestamp: new Date().toISOString(),
      environment: envCheck,
      emailTest: emailTest,
      resendKey: process.env.RESEND_API_KEY ? `${process.env.RESEND_API_KEY.substring(0, 10)}...` : "Não configurada",
    }

    return NextResponse.json({
      success: true,
      message: "Debug executado com sucesso",
      debug: debugInfo,
    })
  } catch (error) {
    console.error("Erro no debug:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro no debug",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
