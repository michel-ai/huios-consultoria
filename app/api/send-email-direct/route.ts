import { NextResponse } from "next/server"
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { name, email, phone, company, service, message } = await request.json()

    // Configuração do Gmail SMTP
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: 'huiosconsutoria@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASSWORD
      }
    })

    // Email para admin
    const adminMailOptions = {
      from: 'huiosconsutoria@gmail.com',
      to: 'huiosconsutoria@gmail.com',
      subject: `🚀 Novo contato - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #15ff00; text-align: center;">🚀 Novo Contato - Huios Consultoria</h1>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h2>Detalhes do Contato:</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Telefone:</strong> ${phone}</p>` : ''}
            ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ''}
            ${service ? `<p><strong>Serviço:</strong> ${service}</p>` : ''}
            <p><strong>Mensagem:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #15ff00;">
              ${message}
            </div>
          </div>
          
          <p style="text-align: center; color: #666;">
            Responda diretamente para: ${email}
          </p>
        </div>
      `
    }

    // Auto-resposta para cliente
    const clientMailOptions = {
      from: 'huiosconsutoria@gmail.com',
      to: email,
      subject: "✅ Obrigado pelo seu contato - Huios Consultoria",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #15ff00; text-align: center;">Huios Consultoria</h1>
          <p style="text-align: center; color: #666;">Transformando empresas através da tecnologia</p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h2>Olá ${name}!</h2>
            <p>Obrigado por entrar em contato conosco! Recebemos sua mensagem e entraremos em contato em breve.</p>
            
            <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #15ff00;">
              <h3>Resumo do seu contato:</h3>
              <p><strong>Nome:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Telefone:</strong> ${phone}</p>` : ''}
              ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ''}
              ${service ? `<p><strong>Serviço:</strong> ${service}</p>` : ''}
            </div>
            
            <p>Nossa equipe analisará sua solicitação e retornaremos em até 24 horas úteis.</p>
          </div>
          
          <p style="text-align: center; color: #666;">
            🚀 Huios Consultoria - Transformando empresas através da tecnologia
          </p>
        </div>
      `
    }

    // Enviar emails
    const [adminResult, clientResult] = await Promise.allSettled([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions)
    ])

    const adminSuccess = adminResult.status === 'fulfilled'
    const clientSuccess = clientResult.status === 'fulfilled'

    return NextResponse.json({
      success: true,
      message: "Emails enviados com sucesso!",
      results: {
        admin: adminSuccess,
        client: clientSuccess
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error("Erro ao enviar emails:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido"
    }, { status: 500 })
  }
}
