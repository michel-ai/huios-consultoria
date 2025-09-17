import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabase.from("services").select("*").eq("is_active", true).order("name")

    if (error) {
      return NextResponse.json({ error: "Erro ao buscar serviços" }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Erro ao buscar serviços:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
