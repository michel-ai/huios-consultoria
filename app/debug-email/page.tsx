"use client"

import { useState } from "react"

export default function DebugEmailPage() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testEmailConfig = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/debug-email", {
        method: "POST",
      })
      const data = await response.json()
      setResults(data)
    } catch (error) {
      setResults({ error: "Erro ao testar configuração" })
    } finally {
      setLoading(false)
    }
  }

  const testCompleteFlow = async () => {
    setLoading(true)
    try {
      const testData = {
        nome: "Teste Debug Email",
        email: "michelquaresma025@gmail.com",
        telefone: "91986066544",
        empresa: "Teste",
        servico: "Debug",
        mensagem: "Teste de debug do sistema de emails",
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      })
      const data = await response.json()
      setResults(data)
    } catch (error) {
      setResults({ error: "Erro no teste completo" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">🔍 Debug Sistema de Emails</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={testEmailConfig}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Testando..." : "🧪 Testar Configuração Email"}
            </button>

            <button
              onClick={testCompleteFlow}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Testando..." : "🚀 Testar Fluxo Completo"}
            </button>
          </div>

          {results && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">📊 Resultados:</h2>
              <pre className="bg-black text-green-400 p-4 rounded-lg overflow-auto text-sm">
                {JSON.stringify(results, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h3 className="font-bold text-yellow-800">⚠️ Checklist de Verificação:</h3>
            <ul className="mt-2 text-yellow-700 space-y-1">
              <li>• RESEND_API_KEY está configurada?</li>
              <li>• Domínio verificado no Resend?</li>
              <li>• Email de origem autorizado?</li>
              <li>• Caixa de spam verificada?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
