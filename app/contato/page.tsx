"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    servico: "",
    mensagem: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")
    setSuccessMessage("")

    try {
      // Validar dados antes de enviar
      if (!formData.nome.trim() || !formData.email.trim() || !formData.mensagem.trim()) {
        setErrorMessage("Por favor, preencha todos os campos obrigatórios.")
        setSubmitStatus("error")
        setIsSubmitting(false)
        return
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setErrorMessage("Por favor, insira um email válido.")
        setSubmitStatus("error")
        setIsSubmitting(false)
        return
      }

      console.log("Enviando dados:", formData)

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      console.log("Resultado:", result)

      if (!response.ok) {
        setErrorMessage(result.error || `Erro ${response.status}`)
        setSubmitStatus("error")
        setIsSubmitting(false)
        return
      }

      if (result.success) {
        setSubmitStatus("success")
        setSuccessMessage(result.message || "Mensagem enviada com sucesso!")
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          empresa: "",
          servico: "",
          mensagem: "",
        })

        // Scroll para o topo para mostrar a mensagem de sucesso
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        setErrorMessage(result.error || "Ocorreu um erro ao enviar o formulário.")
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      setErrorMessage("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.")
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="hero_area" style={{ minHeight: "60vh" }}>
        <div className="container" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "3.5rem", fontWeight: "700", marginBottom: "30px", color: "#15ff00" }}>
              Entre em Contato
            </h1>
            <p style={{ fontSize: "1.2rem", color: "#ffffff" }}>
              Estamos prontos para transformar sua empresa. Fale conosco!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-2" style={{ gap: "60px", alignItems: "start" }}>
            {/* Contact Form */}
            <div>
              <h2 style={{ fontSize: "2rem", marginBottom: "30px", color: "#15ff00" }}>Solicite um Orçamento</h2>

              {submitStatus === "success" && (
                <div
                  style={{
                    background: "rgba(21, 255, 0, 0.1)",
                    border: "1px solid #15ff00",
                    borderRadius: "10px",
                    padding: "20px",
                    marginBottom: "30px",
                    color: "#15ff00",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "10px" }}>✅</div>
                  <h3 style={{ marginBottom: "10px", fontSize: "1.3rem" }}>Mensagem Enviada!</h3>
                  <p style={{ marginBottom: "15px" }}>{successMessage}</p>
                  <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                    📧 Você receberá uma confirmação por email
                    <br />📞 Nossa equipe entrará em contato em até 24 horas
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div
                  style={{
                    background: "rgba(255, 0, 0, 0.1)",
                    border: "1px solid #ff0000",
                    borderRadius: "10px",
                    padding: "20px",
                    marginBottom: "30px",
                    color: "#ff0000",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "10px" }}>❌</div>
                  <p>{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                  <input
                    type="text"
                    name="nome"
                    placeholder="Seu Nome *"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="form-control"
                    style={{ minHeight: "50px" }}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Seu E-mail *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-control"
                    style={{ minHeight: "50px" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                  <input
                    type="tel"
                    name="telefone"
                    placeholder="Seu Telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="form-control"
                    style={{ minHeight: "50px" }}
                  />
                  <input
                    type="text"
                    name="empresa"
                    placeholder="Sua Empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    className="form-control"
                    style={{ minHeight: "50px" }}
                  />
                </div>

                <select
                  name="servico"
                  value={formData.servico}
                  onChange={handleChange}
                  className="form-control"
                  style={{ marginBottom: "20px", minHeight: "50px" }}
                >
                  <option value="">Selecione o serviço de interesse</option>
                  <option value="Mikrotik">Mikrotik</option>
                  <option value="Huawei">Huawei</option>
                  <option value="Datacom">Datacom</option>
                  <option value="Monitoramento">Monitoramento</option>
                  <option value="Automação">Automação</option>
                  <option value="Consultoria">Consultoria</option>
                  <option value="Outros">Outros</option>
                </select>

                <textarea
                  name="mensagem"
                  placeholder="Descreva seu projeto ou necessidade *"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="form-control"
                  style={{ marginBottom: "30px", resize: "vertical", minHeight: "120px" }}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{
                    width: "100%",
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    minHeight: "50px",
                    fontSize: "1.1rem",
                    position: "relative",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span style={{ marginRight: "10px" }}>🔄</span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <span style={{ marginRight: "10px" }}>📧</span>
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 style={{ fontSize: "2rem", marginBottom: "30px", color: "#15ff00" }}>Informações de Contato</h2>

              <div className="card" style={{ marginBottom: "30px" }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                  <div style={{ fontSize: "2rem", marginRight: "15px" }}>📍</div>
                  <div>
                    <h4 style={{ color: "#15ff00", marginBottom: "5px" }}>Endereço</h4>
                    <p style={{ color: "#ffffff" }}>Belém, Pará, Brasil</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                  <div style={{ fontSize: "2rem", marginRight: "15px" }}>📞</div>
                  <div>
                    <h4 style={{ color: "#15ff00", marginBottom: "5px" }}>Telefone</h4>
                    <p style={{ color: "#ffffff" }}>
                      <a href="https://wa.me/5591986066544" target="_blank" style={{ color: "#15ff00", textDecoration: "none", cursor: "pointer", display: "inline-block", pointerEvents: "auto", zIndex: 999, position: "relative" }}>
                        (91) 98606-6544
                      </a>
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                  <div style={{ fontSize: "2rem", marginRight: "15px" }}>✉️</div>
                  <div>
                    <h4 style={{ color: "#15ff00", marginBottom: "5px" }}>E-mail</h4>
                    <p style={{ color: "#ffffff" }}>
                      <a href="mailto:huiosconsutoria@gmail.com" style={{ color: "#15ff00", textDecoration: "none", cursor: "pointer", display: "inline-block", pointerEvents: "auto", zIndex: 999, position: "relative" }}>
                        huiosconsutoria@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ fontSize: "2rem", marginRight: "15px" }}>🕒</div>
                  <div>
                    <h4 style={{ color: "#15ff00", marginBottom: "5px" }}>Horário</h4>
                    <p style={{ color: "#ffffff" }}>Segunda a Sexta: 8h às 18h</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 style={{ color: "#15ff00", marginBottom: "20px" }}>Por que escolher a Huios?</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li style={{ color: "#ffffff", marginBottom: "10px", display: "flex", alignItems: "center" }}>
                    <span style={{ color: "#15ff00", marginRight: "10px" }}>✓</span>
                    Equipe certificada e experiente
                  </li>
                  <li style={{ color: "#ffffff", marginBottom: "10px", display: "flex", alignItems: "center" }}>
                    <span style={{ color: "#15ff00", marginRight: "10px" }}>✓</span>
                    Suporte técnico 24/7
                  </li>
                  <li style={{ color: "#ffffff", marginBottom: "10px", display: "flex", alignItems: "center" }}>
                    <span style={{ color: "#15ff00", marginRight: "10px" }}>✓</span>
                    Soluções personalizadas
                  </li>
                  <li style={{ color: "#ffffff", marginBottom: "10px", display: "flex", alignItems: "center" }}>
                    <span style={{ color: "#15ff00", marginRight: "10px" }}>✓</span>
                    Preços competitivos
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
