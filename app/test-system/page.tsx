"use client"

import { useState } from "react"
import Header from "@/components/Header"

export default function TestSystem() {
  const [testResults, setTestResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const runTests = async () => {
    setIsLoading(true)
    setTestResults(null)

    try {
      // Teste 1: Configuração geral
      console.log("🔍 Testando configuração...")
      const configResponse = await fetch("/api/contact", { method: "GET" })
      const configResult = await configResponse.json()

      // Teste 2: Email (se configurado)
      console.log("📧 Testando email...")
      const emailResponse = await fetch("/api/test-email", { method: "GET" })
      const emailResult = await emailResponse.json()

      // Teste 3: Formulário de contato
      console.log("📝 Testando formulário...")
      const formResponse = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: "Teste Sistema",
          email: "teste@huios.com",
          telefone: "(91) 99999-9999",
          empresa: "Huios Teste",
          servico: "Consultoria",
          mensagem: "Esta é uma mensagem de teste do sistema.",
        }),
      })
      const formResult = await formResponse.json()

      setTestResults({
        config: configResult,
        email: emailResult,
        form: formResult,
        timestamp: new Date().toLocaleString("pt-BR"),
      })
    } catch (error) {
      console.error("Erro nos testes:", error)
      setTestResults({
        error: error instanceof Error ? error.message : "Erro desconhecido",
        timestamp: new Date().toLocaleString("pt-BR"),
      })
    } finally {
      setIsLoading(false)
    }
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
            maxWidth: "800px",
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
            🔧 Teste do Sistema
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
            <p style={{ marginBottom: "20px", lineHeight: "1.6" }}>
              Esta página testa todos os componentes do sistema de contato:
            </p>
            <ul style={{ marginBottom: "20px", paddingLeft: "20px" }}>
              <li>✅ Configuração do Supabase</li>
              <li>✅ Conexão com banco de dados</li>
              <li>✅ Sistema de emails (Resend)</li>
              <li>✅ Formulário de contato</li>
            </ul>

            <button
              onClick={runTests}
              disabled={isLoading}
              style={{
                background: isLoading ? "#666" : "linear-gradient(45deg, #15ff00, #04ff00)",
                color: "#000",
                border: "none",
                padding: "15px 30px",
                borderRadius: "25px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: isLoading ? "not-allowed" : "pointer",
                width: "100%",
              }}
            >
              {isLoading ? "🔄 Executando testes..." : "🚀 Executar Testes"}
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

              <div
                style={{
                  background: "#111",
                  padding: "20px",
                  borderRadius: "10px",
                  fontFamily: "monospace",
                  fontSize: "14px",
                  overflow: "auto",
                  maxHeight: "500px",
                }}
              >
                <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{JSON.stringify(testResults, null, 2)}</pre>
              </div>

              <div style={{ marginTop: "20px", fontSize: "0.9rem", color: "#ccc" }}>
                <strong>Timestamp:</strong> {testResults.timestamp}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
