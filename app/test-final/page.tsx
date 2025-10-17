"use client"

import { useState } from "react"
import Header from "@/components/Header"

export default function TestFinal() {
  const [testResults, setTestResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const runCompleteTest = async () => {
    setIsLoading(true)
    setTestResults(null)

    try {
      console.log("🚀 Iniciando teste completo do sistema...")

      const response = await fetch("/api/test-complete-system")
      const results = await response.json()

      setTestResults(results)
      console.log("Resultados:", results)
    } catch (error) {
      console.error("Erro no teste:", error)
      setTestResults({
        error: error instanceof Error ? error.message : "Erro desconhecido",
        timestamp: new Date().toISOString(),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const testEmailOnly = async () => {
    setIsLoading(true)

    try {
      console.log("📧 Testando apenas o sistema de email...")

      const response = await fetch("/api/send-test-email", { method: "POST" })
      const results = await response.json()

      alert(results.success ? "✅ Email enviado com sucesso!" : "❌ Erro no envio do email")
      console.log("Resultados do email:", results)
    } catch (error) {
      console.error("Erro no teste de email:", error)
      alert("❌ Erro no teste de email")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    if (status.includes("✅")) return "✅"
    if (status.includes("❌")) return "❌"
    return "⏳"
  }

  return (
    <>
      <Header />

      <div
        style={{
          minHeight: "100vh",
          padding: "120px 20px 40px",
          background: "#000",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            color: "#fff",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              color: "#15ff00",
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            🎯 Teste Final do Sistema
          </h1>

          <div
            style={{
              background: "rgba(21, 255, 0, 0.05)",
              border: "1px solid rgba(21, 255, 0, 0.2)",
              borderRadius: "15px",
              padding: "30px",
              marginBottom: "30px",
            }}
          >
            <h2 style={{ color: "#15ff00", marginBottom: "20px" }}>🔧 Configuração Atual</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <strong>Supabase URL:</strong> ✅ Configurado
                <br />
                <strong>Supabase Key:</strong> ✅ Configurado
                <br />
                <strong>Resend Key:</strong> ✅ Configurado (Nova chave)
              </div>
              <div>
                <strong>Site URL:</strong> http://localhost:3000
                <br />
                <strong>Email Admin:</strong> huiosconsutoria@gmail.com
                <br />
                <strong>Status:</strong> Pronto para teste
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <button
              onClick={runCompleteTest}
              disabled={isLoading}
              style={{
                background: isLoading ? "#666" : "linear-gradient(45deg, #15ff00, #04ff00)",
                color: "#000",
                border: "none",
                padding: "20px",
                borderRadius: "15px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? "🔄 Testando..." : "🚀 Teste Completo"}
            </button>

            <button
              onClick={testEmailOnly}
              disabled={isLoading}
              style={{
                background: isLoading ? "#666" : "rgba(21, 255, 0, 0.1)",
                color: "#15ff00",
                border: "2px solid #15ff00",
                padding: "20px",
                borderRadius: "15px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? "🔄 Testando..." : "📧 Testar Email"}
            </button>
          </div>

          {testResults && (
            <div
              style={{
                background: "rgba(21, 255, 0, 0.05)",
                border: "1px solid rgba(21, 255, 0, 0.2)",
                borderRadius: "15px",
                padding: "30px",
              }}
            >
              <h2
                style={{
                  color: "#15ff00",
                  marginBottom: "20px",
                  fontSize: "1.5rem",
                }}
              >
                📊 Resultados dos Testes
              </h2>

              {testResults.environment && (
                <div style={{ marginBottom: "30px" }}>
                  <h3 style={{ color: "#15ff00", marginBottom: "15px" }}>🔧 Ambiente</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
                    {Object.entries(testResults.environment).map(([key, value]) => (
                      <div
                        key={key}
                        style={{
                          background: "#111",
                          padding: "15px",
                          borderRadius: "8px",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ fontSize: "1.5rem", marginBottom: "5px" }}>{getStatusIcon(value as string)}</div>
                        <div style={{ fontSize: "0.9rem", color: "#ccc" }}>
                          {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {testResults.tests && (
                <div style={{ marginBottom: "30px" }}>
                  <h3 style={{ color: "#15ff00", marginBottom: "15px" }}>🧪 Testes</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
                    {Object.entries(testResults.tests).map(([key, test]: [string, any]) => (
                      <div
                        key={key}
                        style={{
                          background: "#111",
                          padding: "20px",
                          borderRadius: "8px",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{getStatusIcon(test.status)}</div>
                        <div style={{ fontSize: "1.1rem", marginBottom: "5px", color: "#15ff00" }}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </div>
                        <div style={{ fontSize: "0.9rem", color: "#ccc" }}>{test.status}</div>
                        {test.contactsCount !== undefined && (
                          <div style={{ fontSize: "0.8rem", color: "#888", marginTop: "5px" }}>
                            {test.contactsCount} contatos
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <details
                style={{
                  background: "#111",
                  padding: "20px",
                  borderRadius: "10px",
                  marginTop: "20px",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "#15ff00",
                    marginBottom: "15px",
                  }}
                >
                  🔍 Detalhes Técnicos
                </summary>
                <pre
                  style={{
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    fontSize: "12px",
                    color: "#ccc",
                    overflow: "auto",
                    maxHeight: "400px",
                  }}
                >
                  {JSON.stringify(testResults, null, 2)}
                </pre>
              </details>
            </div>
          )}

          <div
            style={{
              background: "rgba(21, 255, 0, 0.05)",
              border: "1px solid rgba(21, 255, 0, 0.2)",
              borderRadius: "15px",
              padding: "20px",
              marginTop: "30px",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "#15ff00", marginBottom: "15px" }}>📋 Próximos Passos</h3>
            <p style={{ marginBottom: "15px", lineHeight: "1.6" }}>
              1. Execute o teste completo para verificar todos os sistemas
              <br />
              2. Teste o formulário de contato em:{" "}
              <a href="/contato" style={{ color: "#15ff00" }}>
                /contato
              </a>
              <br />
              3. Verifique se os emails estão chegando em: huiosconsutoria@gmail.com
              <br />
              4. Se tudo estiver funcionando, o sistema está pronto para produção!
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
