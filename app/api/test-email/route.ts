import { NextResponse } from "next/server"
import { testEmailConfig } from "@/lib/email"

export async function GET() {
  try {
    console.log("=== TESTE DE CONFIGURAÇÃO DE EMAIL ===")

    const result = await testEmailConfig()

    console.log("Resultado do teste:", result)

    return NextResponse.json({
      success: result.success,
      message: result.success ? "Email de teste enviado com sucesso!" : "Falha no teste de email",
      details: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Erro no teste de email:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Erro no teste de email",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
