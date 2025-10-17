// Arquivo para testar a configuração do Supabase
export function testSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log("=== TESTE DE CONFIGURAÇÃO SUPABASE ===")
  console.log("URL:", url)
  console.log("URL válida:", url ? (url.includes("supabase.co") ? "✅" : "❌ URL inválida") : "❌ URL não definida")
  console.log("Key:", key ? `${key.substring(0, 20)}...` : "❌ Key não definida")
  console.log("Key válida:", key ? (key.length > 100 ? "✅" : "❌ Key muito curta") : "❌ Key não definida")

  if (!url || !key) {
    throw new Error("Configuração do Supabase incompleta")
  }

  if (!url.includes("supabase.co")) {
    throw new Error("URL do Supabase inválida")
  }

  if (key.length < 100) {
    throw new Error("Chave do Supabase inválida")
  }

  return { url, key }
}
