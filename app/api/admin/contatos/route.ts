import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    console.log("🔍 Buscando contatos...")

    const { data: contacts, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("❌ Erro ao buscar contatos:", error)
      return NextResponse.json(
        {
          success: false,
          error: "Erro ao buscar contatos",
          details: error.message,
        },
        { status: 500 },
      )
    }

    console.log(`✅ ${contacts.length} contatos encontrados`)

    return NextResponse.json({
      success: true,
      contacts,
    })
  } catch (error) {
    console.error("❌ Erro crítico:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
