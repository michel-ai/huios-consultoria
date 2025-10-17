import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    console.log("=== DIAGNÓSTICO DE EMAIL ===")

    const body = await request.json()
    const testEmail = body.testEmail || "michelquaresma025@gmail.com"
    const adminEmail = body.adminEmail || "huiosconsutoria@gmail.com"

    console.log("📧 Email para teste:", testEmail)
    console.log("📧 Email do admin:", adminEmail)

    // Verificar variáveis de ambiente
    const resendKey = process.env.RESEND_API_KEY
    console.log("🔑 RESEND_API_KEY:", resendKey ? `${resendKey.substring(0, 10)}...` : "Não configurada")

    if (!resendKey) {
      return NextResponse.json({
        success: false,
        error: "RESEND_API_KEY não configurada",
        config: {
          resendConfigured: false,
        },
      })
    }

    // Inicializar Resend
    console.log("🚀 Inicializando Resend...")
    const resend = new Resend(resendKey)

    // Testar envio para o email de teste
    console.log("📤 Enviando email de teste para:", testEmail)
    let testEmailResult
    try {
      const { data: testData, error: testError } = await resend.emails.send({
        from: "Huios Consultoria <onboarding@resend.dev>",
        to: [testEmail],
        subject: "🧪 Teste de Diagnóstico - Huios Consultoria",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 5px;">
            <h1 style="color: #15ff00; text-align: center;">🧪 Teste de Email</h1>
            <p>Este é um email de <strong>diagnóstico</strong> para verificar se o sistema está funcionando corretamente.</p>
            <p><strong>Data/Hora:</strong> ${new Date().toLocaleString("pt-BR")}</p>
            <p><strong>Destinatário:</strong> ${testEmail}</p>
            <p><strong>Status:</strong> Se você está vendo esta mensagem, o sistema está funcionando! ✅</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="margin: 0; color: #666;">Este é um email automático, por favor não responda.</p>
            </div>
          </div>
        `,
      })

      if (testError) {
        console.error("❌ Erro ao enviar email de teste:", testError)
        testEmailResult = { success: false, error: testError }
      } else {
        console.log("✅ Email de teste enviado com sucesso:", testData?.id)
        testEmailResult = { success: true, id: testData?.id }
      }
    } catch (error) {
      console.error("❌ Exceção ao enviar email de teste:", error)
      testEmailResult = {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }
    }

    // Testar envio para o email do admin
    console.log("📤 Enviando email de teste para admin:", adminEmail)
    let adminEmailResult
    try {
      const { data: adminData, error: adminError } = await resend.emails.send({
        from: "Huios Consultoria <onboarding@resend.dev>",
        to: [adminEmail],
        subject: "🔔 Teste de Notificação Admin - Huios Consultoria",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 5px;">
            <h1 style="color: #15ff00; text-align: center;">🔔 Teste de Notificação</h1>
            <p>Este é um email de <strong>diagnóstico</strong> para verificar se as notificações de admin estão funcionando.</p>
            <p><strong>Data/Hora:</strong> ${new Date().toLocaleString("pt-BR")}</p>
            <p><strong>Destinatário Admin:</strong> ${adminEmail}</p>
            <p><strong>Status:</strong> Se você está vendo esta mensagem, o sistema de notificações está funcionando! ✅</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="margin: 0; color: #666;">Este é um email automático, por favor não responda.</p>
            </div>
          </div>
        `,
      })

      if (adminError) {
        console.error("❌ Erro ao enviar email de admin:", adminError)
        adminEmailResult = { success: false, error: adminError }
      } else {
        console.log("✅ Email de admin enviado com sucesso:", adminData?.id)
        adminEmailResult = { success: true, id: adminData?.id }
      }
    } catch (error) {
      console.error("❌ Exceção ao enviar email de admin:", error)
      adminEmailResult = {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }
    }

    // Verificar limites do Resend
    console.log("🔍 Verificando limites do Resend...")
    let limitsInfo
    try {
      // Não há API pública para verificar limites, então apenas informamos
      limitsInfo = {
        note: "O plano gratuito do Resend tem limite de 100 emails/dia e 3.000/mês",
        recommendation: "Verifique se você não atingiu o limite diário",
      }
    } catch (error) {
      console.error("❌ Erro ao verificar limites:", error)
      limitsInfo = { error: "Não foi possível verificar limites" }
    }

    // Resultado final
    const success = testEmailResult.success || adminEmailResult.success
    const result = {
      success,
      timestamp: new Date().toISOString(),
      testEmail: {
        to: testEmail,
        result: testEmailResult,
      },
      adminEmail: {
        to: adminEmail,
        result: adminEmailResult,
      },
      testEmailId: testEmailResult.success ? testEmailResult.id : null,
      adminEmailId: adminEmailResult.success ? adminEmailResult.id : null,
      config: {
        resendConfigured: true,
        resendKeyPrefix: resendKey.substring(0, 10) + "...",
      },
      limits: limitsInfo,
      recommendations: [
        "Verifique a caixa de spam após o teste",
        "Considere verificar seu próprio domínio no Resend",
        "O domínio onboarding@resend.dev tem limitações",
      ],
    }

    if (!success) {
      result.error = "Falha ao enviar um ou mais emails"
      if (testEmailResult.error) {
        result.errorDetails = `Erro no email de teste: ${testEmailResult.error}`
      } else if (adminEmailResult.error) {
        result.errorDetails = `Erro no email de admin: ${adminEmailResult.error}`
      }
    }

    console.log("✅ Diagnóstico concluído!")
    return NextResponse.json(result)
  } catch (error) {
    console.error("💥 Erro crítico no diagnóstico:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno no diagnóstico",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
