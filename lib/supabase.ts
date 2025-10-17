import { createClient } from "@supabase/supabase-js"

// Verificar variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log("=== CONFIGURAÇÃO SUPABASE DEBUG ===")
console.log("URL completa:", supabaseUrl)
console.log("URL válida:", supabaseUrl ? "✅ Definida" : "❌ Não definida")
console.log("Key válida:", supabaseKey ? "✅ Definida" : "❌ Não definida")

// Validar formato da URL
if (supabaseUrl && !supabaseUrl.includes("supabase.co")) {
  console.warn("⚠️ URL do Supabase pode estar incorreta:", supabaseUrl)
}

if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️ Variáveis de ambiente do Supabase não configuradas - modo desenvolvimento")
  // Em modo desenvolvimento, não vamos falhar, apenas avisar
}

// Criar cliente Supabase com configuração mais específica
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co", 
  supabaseKey || "placeholder_key", 
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        "Content-Type": "application/json",
      },
    },
    db: {
      schema: "public",
    },
  }
)

console.log("✅ Cliente Supabase criado com sucesso")

// Tipos para o banco de dados
export interface Contact {
  id?: string
  name: string
  email: string
  phone?: string | null
  company?: string | null
  service_type?: string | null
  message: string
  status?: string
  created_at?: string
  updated_at?: string
}

export interface Service {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  features: string[]
  pricing: {
    basico: string
    intermediario: string
    avancado: string
  }
  is_active: boolean
}

export interface Project {
  id: string
  title: string
  slug: string
  client_name: string
  description: string
  challenge?: string
  solution?: string
  technologies: string[]
  results: string[]
  metrics: {
    duration: string
    team: string
    investment: string
    roi: string
  }
  image_url?: string
  is_featured: boolean
  category_name: string
  category_icon: string
  category_color: string
}

export interface Testimonial {
  id: string
  client_name: string
  client_role: string
  client_company: string
  client_avatar: string
  rating: number
  testimonial_text: string
  project_name: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  specialty: string
  bio: string
  skills: string[]
  experience_years: number
  display_order: number
}
