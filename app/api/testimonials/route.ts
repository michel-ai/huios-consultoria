import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: "Erro ao buscar depoimentos" }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Erro ao buscar depoimentos:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
