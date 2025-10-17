import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    console.log(`🔍 Buscando contato ID: ${id}`)

    const { data: contact, error } = await supabase.from("contacts").select("*").eq("id", id).single()

    if (error) {
      console.error("❌ Erro ao buscar contato:", error)
      return NextResponse.json(
        {
          success: false,
          error: "Erro ao buscar contato",
          details: error.message,
        },
        { status: 500 },
      )
    }

    if (!contact) {
      return NextResponse.json(
        {
          success: false,
          error: "Contato não encontrado",
        },
        { status: 404 },
      )
    }

    console.log(`✅ Contato encontrado: ${contact.name}`)

    return NextResponse.json({
      success: true,
      contact,
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

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    console.log(`🔄 Atualizando contato ID: ${id}`)

    const { data: contact, error } = await supabase.from("contacts").update(body).eq("id", id).select().single()

    if (error) {
      console.error("❌ Erro ao atualizar contato:", error)
      return NextResponse.json(
        {
          success: false,
          error: "Erro ao atualizar contato",
          details: error.message,
        },
        { status: 500 },
      )
    }

    console.log(`✅ Contato atualizado: ${contact.name}`)

    return NextResponse.json({
      success: true,
      contact,
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
