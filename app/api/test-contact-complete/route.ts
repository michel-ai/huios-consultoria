import { NextResponse } from "next/server"

export async function POST() {
  try {
    console.log("=== TESTE COMPLETO DO FORMULÁRIO DE CONTATO ===")

    const testData = {
      nome: "Teste Sistema Completo",
      email: "michelquaresma025@gmail.com", // Usando seu email para teste
      telefone: "(91) 9860-66544",
      empresa: "Huios Consultoria",
      servico: "Consultoria",
      mensagem: "Este é um teste completo do sistema de contato com Supabase e envio de emails configurados.",
    }

    console.log("Enviando dados de teste:", testData)

    // Chamar a API de contato
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    })

    const result = await response.json()

    console.log("Resultado do teste:", result)

    return NextResponse.json({
      success: true,
      message: "Teste completo executado",
      testData,
      apiResponse: result,
      status: response.status,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Erro no teste completo:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro no teste completo",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
