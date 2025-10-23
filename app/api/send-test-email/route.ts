import { NextResponse } from "next/server"

export async function POST() {
  try {
    console.log("=== TESTE DE EMAIL COM NOVA CHAVE RESEND ===")

    // Verificar se a chave está configurada
    const resendKey = process.env.RESEND_API_KEY
    console.log("Chave Resend:", resendKey ? `${resendKey.substring(0, 10)}...` : "Não configurada")

    if (!resendKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Chave do Resend não configurada",
        },
        { status: 500 },
      )
    }

    // Importar e testar o sistema de email
    const { sendContactNotification, sendAutoReply } = await import("@/lib/email")

    const testContactData = {
      name: "Teste com Nova Chave Resend",
      email: "huiosconsutoria@gmail.com",
      phone: "(91) 98606-6544",
      company: "Huios Consultoria",
      service_type: "Teste",
      message: "Este é um teste do sistema de email com a nova chave do Resend configurada.",
    }

    console.log("📧 Enviando email de notificação...")
    const notificationResult = await sendContactNotification(testContactData)

    console.log("📧 Enviando auto-resposta...")
    const autoReplyResult = await sendAutoReply(testContactData)

    const results = {
      success: true,
      message: "Teste de email concluído",
      results: {
        notification: notificationResult,
        autoReply: autoReplyResult,
      },
      timestamp: new Date().toISOString(),
    }

    console.log("Resultados:", JSON.stringify(results, null, 2))

    return NextResponse.json(results)
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
