import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    message: "API de teste de email funcionando!",
    timestamp: new Date().toISOString(),
    instructions: [
      "1. Configure GMAIL_APP_PASSWORD no Vercel",
      "2. Use a senha de app do Gmail (não a senha normal)",
      "3. Teste o endpoint /api/send-email-direct"
    ]
  })
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Simular envio de email (para teste)
    console.log("📧 Simulando envio de email:")
    console.log("- Para: huiosconsutoria@gmail.com")
    console.log("- De:", email)
    console.log("- Nome:", name)
    console.log("- Mensagem:", message)

    return NextResponse.json({
      success: true,
      message: "Email simulado enviado com sucesso!",
      details: {
        to: "huiosconsutoria@gmail.com",
        from: email,
        subject: `Contato de ${name}`,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido"
    }, { status: 500 })
  }
}
