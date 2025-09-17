import { createClient } from "@supabase/supabase-js"

// Verificar variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validar formato da URL
if (supabaseUrl && !supabaseUrl.includes("supabase.co")) {
  console.warn("⚠️ URL do Supabase pode estar incorreta:", supabaseUrl)
}

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Variáveis de ambiente do Supabase não configuradas")
  // Não falhar durante o build, apenas avisar
  if (process.env.NODE_ENV === 'production') {
    console.warn("⚠️ Supabase não configurado - algumas funcionalidades podem não funcionar")
  } else {
    throw new Error("Variáveis de ambiente do Supabase não configuradas")
  }
}

// Criar cliente Supabase com configuração mais específica
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey, {
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
    })
  : {
      from: () => ({
        select: () => ({ eq: () => ({ single: () => ({ data: null, error: { message: "Supabase não configurado" } }) }) }),
        insert: () => ({ select: () => ({ single: () => ({ data: null, error: { message: "Supabase não configurado" } }) }) }),
        update: () => ({ eq: () => ({ select: () => ({ single: () => ({ data: null, error: { message: "Supabase não configurado" } }) }) }) }),
        delete: () => ({ eq: () => ({ data: null, error: { message: "Supabase não configurado" } }) }),
      }),
    } as any

// Cliente Supabase criado

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
