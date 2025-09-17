import { Resend } from "resend"

// Verificar se a chave do Resend está configurada
const resendKey = process.env.RESEND_API_KEY
// Domínio personalizado para emails
const emailDomain = process.env.EMAIL_DOMAIN || "onboarding@resend.dev"
let resend: Resend | null = null

if (resendKey) {
  resend = new Resend(resendKey)
  console.log("✅ Resend configurado com chave:", resendKey.substring(0, 10) + "...")
  console.log("📧 Domínio de email:", emailDomain)
} else {
  console.warn("⚠️ RESEND_API_KEY não configurada - emails não serão enviados")
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  service_type?: string | null
  message: string
}

export async function sendContactNotification(contactData: ContactFormData) {
  try {
    if (!resend) {
      console.warn("⚠️ Resend não configurado - pulando envio de notificação")
      return {
        success: false,
        error: "Serviço de email não configurado",
        skipped: true,
      }
    }

    console.log("📧 Enviando notificação para admin...")
    console.log("Dados do contato:", contactData)

    // Usar o domínio personalizado se configurado
    const fromEmail = emailDomain.includes("@") ? emailDomain : `contato@${emailDomain}`

    const { data, error } = await resend.emails.send({
      from: `Huios Consultoria <${fromEmail}>`,
      to: ["huiosconsutoria@gmail.com"],
      subject: `🚀 Novo contato - ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: #000; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="color: #15ff00; text-align: center; margin: 0; font-size: 24px;">
              🚀 Novo Contato - Huios Consultoria
            </h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 10px; border-left: 5px solid #15ff00;">
            <h2 style="color: #333; margin-top: 0;">Detalhes do Contato:</h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #15ff00;">Nome:</strong>
              <span style="color: #333; margin-left: 10px;">${contactData.name}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #15ff00;">Email:</strong>
              <span style="color: #333; margin-left: 10px;">${contactData.email}</span>
            </div>
            
            ${
              contactData.phone
                ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #15ff00;">Telefone:</strong>
              <span style="color: #333; margin-left: 10px;">${contactData.phone}</span>
            </div>
            `
                : ""
            }
            
            ${
              contactData.company
                ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #15ff00;">Empresa:</strong>
              <span style="color: #333; margin-left: 10px;">${contactData.company}</span>
            </div>
            `
                : ""
            }
            
            ${
              contactData.service_type
                ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #15ff00;">Serviço de Interesse:</strong>
              <span style="color: #333; margin-left: 10px;">${contactData.service_type}</span>
            </div>
            `
                : ""
            }
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #15ff00;">Mensagem:</strong>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 10px; border-left: 3px solid #15ff00;">
                ${contactData.message.replace(/\n/g, "<br>")}
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                📅 Recebido em: ${new Date().toLocaleString("pt-BR")}
              </p>
            </div>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("❌ Erro ao enviar notificação:", error)
      return { success: false, error: error }
    }

    console.log("✅ Notificação enviada com sucesso:", data?.id)
    return { success: true, data: data }
  } catch (error) {
    console.error("❌ Erro ao enviar notificação:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    }
  }
}

export async function sendAutoReply(contactData: ContactFormData) {
  try {
    if (!resend) {
      console.warn("⚠️ Resend não configurado - pulando auto-resposta")
      return {
        success: false,
        error: "Serviço de email não configurado",
        skipped: true,
      }
    }

    console.log("📧 Enviando auto-resposta para:", contactData.email)

    // Usar o domínio personalizado se configurado
    const fromEmail = emailDomain.includes("@") ? emailDomain : `contato@${emailDomain}`

    const { data, error } = await resend.emails.send({
      from: `Huios Consultoria <${fromEmail}>`,
      to: [contactData.email],
      subject: "✅ Obrigado pelo seu contato - Huios Consultoria",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: #000; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="color: #15ff00; text-align: center; margin: 0; font-size: 24px;">
              Huios Consultoria
            </h1>
            <p style="color: white; text-align: center; margin: 10px 0 0 0; font-size: 16px;">
              Transformando empresas através da tecnologia
            </p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 10px; border-left: 5px solid #15ff00;">
            <h2 style="color: #333; margin-top: 0;">Olá, ${contactData.name}! 👋</h2>
            
            <p style="color: #333; line-height: 1.6; font-size: 16px;">
              Obrigado por entrar em contato conosco! Recebemos sua mensagem e nossa equipe irá analisá-la com atenção.
            </p>
            
            <p style="color: #333; line-height: 1.6; font-size: 16px;">
              <strong>Próximos passos:</strong>
            </p>
            
            <ul style="color: #333; line-height: 1.8; font-size: 16px;">
              <li>📋 Nossa equipe técnica irá analisar sua solicitação</li>
              <li>📞 Entraremos em contato em até 24 horas</li>
              <li>💡 Apresentaremos uma proposta personalizada</li>
              <li>🚀 Iniciaremos o projeto após aprovação</li>
            </ul>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #15ff00;">
              <h3 style="color: #15ff00; margin-top: 0; font-size: 18px;">📞 Contatos Diretos:</h3>
              <p style="color: #333; margin: 5px 0; font-size: 16px;">
                <strong>Telefone:</strong> (91) 9860-66544
              </p>
              <p style="color: #333; margin: 5px 0; font-size: 16px;">
                <strong>Email:</strong> huiosconsutoria@gmail.com
              </p>
              <p style="color: #333; margin: 5px 0; font-size: 16px;">
                <strong>Horário:</strong> Segunda a Sexta, 8h às 18h
              </p>
            </div>
            
            <p style="color: #333; line-height: 1.6; font-size: 16px;">
              Enquanto isso, convidamos você a conhecer mais sobre nossos serviços e casos de sucesso em nosso site.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/portfolio" style="background-color: #15ff00; color: #000; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                🎯 Ver Nossos Projetos
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              Atenciosamente,<br>
              <strong style="color: #15ff00;">Equipe Huios Consultoria</strong>
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("❌ Erro ao enviar auto-resposta:", error)
      return { success: false, error: error }
    }

    console.log("✅ Auto-resposta enviada com sucesso:", data?.id)
    return { success: true, data: data }
  } catch (error) {
    console.error("❌ Erro ao enviar auto-resposta:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    }
  }
}

// Função para testar configuração de email
export async function testEmailConfig() {
  if (!resend) {
    return {
      success: false,
      error: "RESEND_API_KEY não configurada",
      configured: false,
    }
  }

  try {
    console.log("🧪 Testando configuração do Resend...")

    // Usar o domínio personalizado se configurado
    const fromEmail = emailDomain.includes("@") ? emailDomain : `contato@${emailDomain}`

    // Testar enviando um email simples
    const { data, error } = await resend.emails.send({
      from: `Huios Consultoria <${fromEmail}>`,
      to: ["michelquaresma025@gmail.com"], // Seu email para teste
      subject: "🧪 Teste de Configuração - Huios Consultoria",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: #15ff00;">🧪 Teste de Email</h1>
          <p>Este é um email de teste para verificar se o sistema está funcionando corretamente.</p>
          <p><strong>Data/Hora:</strong> ${new Date().toLocaleString("pt-BR")}</p>
          <p><strong>Status:</strong> Sistema funcionando! ✅</p>
          <p><strong>Domínio:</strong> ${fromEmail}</p>
        </div>
      `,
    })

    if (error) {
      console.error("❌ Erro no teste:", error)
      return { success: false, error: error, configured: true }
    }

    console.log("✅ Email de teste enviado:", data?.id)
    return { success: true, data: data, configured: true }
  } catch (error) {
    console.error("❌ Erro no teste:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
      configured: true,
    }
  }
}
