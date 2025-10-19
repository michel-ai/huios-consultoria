import nodemailer from 'nodemailer'

// Configuração do Gmail SMTP
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'huiosconsutoria@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASSWORD
  }
})

export interface ContactFormData {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  service_type?: string | null
  message: string
}

export async function sendContactNotificationSMTP(contactData: ContactFormData) {
  try {
    console.log("📧 Enviando notificação via SMTP...")
    console.log("Dados do contato:", contactData)

    const mailOptions = {
      from: 'huiosconsutoria@gmail.com',
      to: 'huiosconsutoria@gmail.com',
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
            
            ${contactData.phone ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #15ff00;">Telefone:</strong>
              <span style="color: #333; margin-left: 10px;">${contactData.phone}</span>
            </div>
            ` : ''}
            
            ${contactData.company ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #15ff00;">Empresa:</strong>
              <span style="color: #333; margin-left: 10px;">${contactData.company}</span>
            </div>
            ` : ''}
            
            ${contactData.service_type ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #15ff00;">Serviço:</strong>
              <span style="color: #333; margin-left: 10px;">${contactData.service_type}</span>
            </div>
            ` : ''}
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #15ff00;">Mensagem:</strong>
              <div style="color: #333; margin-top: 10px; padding: 15px; background-color: #f9f9f9; border-radius: 5px; border-left: 3px solid #15ff00;">
                ${contactData.message}
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #000; border-radius: 10px;">
            <p style="color: #15ff00; margin: 0; font-size: 14px;">
              📧 Este email foi enviado automaticamente pelo site da Huios Consultoria
            </p>
            <p style="color: #15ff00; margin: 5px 0 0 0; font-size: 12px;">
              Responda diretamente para: ${contactData.email}
            </p>
          </div>
        </div>
      `
    }

    const result = await transporter.sendMail(mailOptions)
    console.log("✅ Notificação SMTP enviada com sucesso:", result.messageId)
    return { success: true, data: result }
  } catch (error) {
    console.error("❌ Erro ao enviar notificação SMTP:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    }
  }
}

export async function sendAutoReplySMTP(contactData: ContactFormData) {
  try {
    console.log("📧 Enviando auto-resposta via SMTP para:", contactData.email)

    const mailOptions = {
      from: 'huiosconsutoria@gmail.com',
      to: contactData.email,
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
            <h2 style="color: #333; margin-top: 0;">Olá ${contactData.name}!</h2>
            
            <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
              Obrigado por entrar em contato conosco! Recebemos sua mensagem e entraremos em contato em breve.
            </p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #15ff00; margin-top: 0;">Resumo do seu contato:</h3>
              <p style="color: #333; margin: 5px 0;"><strong>Nome:</strong> ${contactData.name}</p>
              <p style="color: #333; margin: 5px 0;"><strong>Email:</strong> ${contactData.email}</p>
              ${contactData.phone ? `<p style="color: #333; margin: 5px 0;"><strong>Telefone:</strong> ${contactData.phone}</p>` : ''}
              ${contactData.company ? `<p style="color: #333; margin: 5px 0;"><strong>Empresa:</strong> ${contactData.company}</p>` : ''}
              ${contactData.service_type ? `<p style="color: #333; margin: 5px 0;"><strong>Serviço:</strong> ${contactData.service_type}</p>` : ''}
            </div>
            
            <p style="color: #333; line-height: 1.6;">
              Nossa equipe analisará sua solicitação e retornaremos em até 24 horas úteis.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #000; border-radius: 10px;">
            <p style="color: #15ff00; margin: 0; font-size: 14px;">
              🚀 Huios Consultoria - Transformando empresas através da tecnologia
            </p>
          </div>
        </div>
      `
    }

    const result = await transporter.sendMail(mailOptions)
    console.log("✅ Auto-resposta SMTP enviada com sucesso:", result.messageId)
    return { success: true, data: result }
  } catch (error) {
    console.error("❌ Erro ao enviar auto-resposta SMTP:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    }
  }
}
