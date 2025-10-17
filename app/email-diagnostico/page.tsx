"use client"

import { useState } from "react"

export default function EmailDiagnosticoPage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [testEmail, setTestEmail] = useState("michelquaresma025@gmail.com")
  const [adminEmail, setAdminEmail] = useState("huiosconsutoria@gmail.com")

  const runDiagnostic = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/email-diagnostico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testEmail,
          adminEmail,
        }),
      })
      const data = await response.json()
      setResults(data)
    } catch (error) {
      setResults({
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">🔍 Diagnóstico do Sistema de Email</h1>

          <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h3 className="font-bold text-yellow-800">⚠️ Importante:</h3>
            <ul className="mt-2 text-yellow-700 space-y-1">
              <li>• Este diagnóstico verifica a configuração do Resend</li>
              <li>• Testa o envio de emails diretamente</li>
              <li>• Verifica se há problemas com o domínio de envio</li>
              <li>• Mostra logs detalhados do processo</li>
            </ul>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="testEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email para Teste (seu email):
              </label>
              <input
                type="email"
                id="testEmail"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email do Admin:
              </label>
              <input
                type="email"
                id="adminEmail"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={runDiagnostic}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Executando diagnóstico..." : "🔍 Executar Diagnóstico Completo"}
            </button>
          </div>

          {results && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">📊 Resultados:</h2>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="font-bold mr-2">Status:</span>
                  {results.success ? (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md">✅ Sucesso</span>
                  ) : (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md">❌ Falha</span>
                  )}
                </div>

                {results.testEmailId && (
                  <div className="bg-green-50 p-3 rounded-md mb-3">
                    <p className="text-green-700">✅ Email de teste enviado com sucesso! ID: {results.testEmailId}</p>
                  </div>
                )}

                {results.adminEmailId && (
                  <div className="bg-green-50 p-3 rounded-md mb-3">
                    <p className="text-green-700">✅ Email de admin enviado com sucesso! ID: {results.adminEmailId}</p>
                  </div>
                )}

                {results.error && (
                  <div className="bg-red-50 p-3 rounded-md mb-3">
                    <p className="text-red-700">❌ Erro: {results.error}</p>
                    {results.errorDetails && <p className="text-red-600 mt-1">{results.errorDetails}</p>}
                  </div>
                )}
              </div>

              <div className="bg-black text-green-400 p-4 rounded-lg overflow-auto text-sm">
                <pre>{JSON.stringify(results, null, 2)}</pre>
              </div>
            </div>
          )}

          <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4">
            <h3 className="font-bold text-blue-800">💡 Dicas:</h3>
            <ul className="mt-2 text-blue-700 space-y-1">
              <li>• Verifique a caixa de spam após o teste</li>
              <li>• A API key do Resend deve começar com "re_"</li>
              <li>• O domínio onboarding@resend.dev tem limitações</li>
              <li>• Considere verificar seu próprio domínio no Resend</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
