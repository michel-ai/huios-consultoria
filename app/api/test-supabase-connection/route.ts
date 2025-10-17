import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    console.log("=== TESTE DE CONEXÃO SUPABASE ===")

    // Verificar variáveis de ambiente
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log("URL:", supabaseUrl)
    console.log("Key:", supabaseKey ? `${supabaseKey.substring(0, 20)}...` : "Não definida")

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Variáveis de ambiente não configuradas",
          config: {
            url: !!supabaseUrl,
            key: !!supabaseKey,
          },
        },
        { status: 500 },
      )
    }

    // Testar conexão básica
    console.log("Testando conexão...")
    const { data, error } = await supabase.from("contacts").select("count", { count: "exact", head: true })

    if (error) {
      console.error("Erro na conexão:", error)
      return NextResponse.json(
        {
          success: false,
          error: "Erro na conexão com Supabase",
          details: error.message,
          code: error.code,
          hint: error.hint,
        },
        { status: 500 },
      )
    }

    // Testar inserção simples
    console.log("Testando inserção...")
    const testData = {
      name: "Teste Conexão",
      email: "teste@exemplo.com",
      message: "Teste de conexão automático",
      status: "teste",
    }

    const { data: insertData, error: insertError } = await supabase
      .from("contacts")
      .insert([testData])
      .select()
      .single()

    if (insertError) {
      console.error("Erro na inserção:", insertError)
      return NextResponse.json(
        {
          success: false,
          error: "Erro ao inserir dados de teste",
          details: insertError.message,
          code: insertError.code,
          hint: insertError.hint,
        },
        { status: 500 },
      )
    }

    // Limpar dados de teste
    await supabase.from("contacts").delete().eq("id", insertData.id)

    return NextResponse.json({
      success: true,
      message: "Conexão Supabase funcionando perfeitamente!",
      test_id: insertData.id,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Erro geral:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
