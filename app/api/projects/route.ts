import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")

    let query = supabase.from("projects_with_category").select("*").eq("is_active", true)

    if (category && category !== "todos") {
      query = query.eq("category_slug", category)
    }

    if (featured === "true") {
      query = query.eq("is_featured", true)
    }

    query = query.order("is_featured", { ascending: false }).order("created_at", { ascending: false })

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: "Erro ao buscar projetos" }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Erro ao buscar projetos:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
