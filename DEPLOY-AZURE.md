# 🚀 Guia de Deploy para Microsoft Azure

## ✅ Status do Projeto
- **Build de Produção:** ✅ Funcionando
- **Servidor de Produção:** ✅ Funcionando
- **Configurações Azure:** ✅ Prontas
- **Site:** ✅ Acessível em http://localhost:3000

## 📋 Pré-requisitos
1. **Conta Microsoft Azure** ativa
2. **Node.js 18+** instalado
3. **Git** configurado (opcional)

## 🔧 Configuração do Azure App Service

### 1. Criar App Service
1. Acesse o [Portal do Azure](https://portal.azure.com)
2. Clique em "Create a resource"
3. Selecione "Web App"
4. Configure:
   - **Subscription:** Sua assinatura
   - **Resource Group:** Crie novo ou use existente
   - **Name:** `huios-consultoria` (ou nome desejado)
   - **Runtime stack:** Node 18 LTS
   - **Operating System:** Linux
   - **Region:** East US (ou mais próxima)
   - **Pricing Plan:** B1 Basic (ou superior)

### 2. Configurar Variáveis de Ambiente
No Azure Portal, vá para:
**App Service > Configuration > Application settings**

Adicione estas variáveis:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_APP_URL=https://your-app.azurewebsites.net
NODE_ENV=production
PORT=8080
```

### 3. Configurar Domínio Personalizado (Opcional)
1. Vá para **Custom domains**
2. Adicione seu domínio
3. Configure DNS conforme instruções

## 🚀 Métodos de Deploy

### Método 1: Deploy via Git (Recomendado)
1. **Conectar repositório:**
   - Vá para **Deployment Center**
   - Escolha "GitHub" ou "Local Git"
   - Conecte seu repositório

2. **Deploy automático:**
   - O Azure fará build automático
   - Monitor em **Logs**

### Método 2: Deploy via ZIP
1. **Fazer build local:**
   ```bash
   pnpm build
   ```

2. **Compactar arquivos:**
   - Selecione: `.next`, `public`, `package.json`, `web.config`
   - Crie arquivo ZIP

3. **Upload no Azure:**
   - Vá para **Advanced Tools > Kudu**
   - Acesse **Debug console > CMD**
   - Faça upload do ZIP
   - Extraia na pasta `site/wwwroot`

### Método 3: Deploy via Azure CLI
```bash
# Instalar Azure CLI
npm install -g @azure/cli

# Login
az login

# Deploy
az webapp deployment source config-zip \
  --resource-group myResourceGroup \
  --name huios-consultoria \
  --src huios-consultoria.zip
```

## 📁 Arquivos de Configuração Criados

### `web.config`
- Configuração do IIS para Windows
- Headers de segurança
- Redirecionamento HTTPS
- Compressão

### `deploy.cmd`
- Script de deploy personalizado
- Instalação de dependências
- Build do Next.js

### `azure-config.md`
- Documentação completa
- Variáveis de ambiente
- Instruções detalhadas

## 🔍 Monitoramento e Logs

### Application Insights
1. **Habilitar:**
   - Vá para **Application Insights**
   - Clique "Enable Application Insights"

2. **Monitorar:**
   - Performance
   - Erros
   - Dependências

### Logs
1. **Streaming Logs:**
   - Vá para **Log stream**
   - Monitore em tempo real

2. **Download Logs:**
   - Vá para **Advanced Tools > Kudu**
   - Acesse **LogFiles**

## 🛠️ Comandos Úteis

### Build Local
```bash
pnpm build
```

### Teste Local
```bash
pnpm start
```

### Deploy Manual
```bash
# Build
pnpm build

# Start produção
pnpm start
```

## ⚠️ Troubleshooting

### Erro de Build
- Verifique variáveis de ambiente
- Confirme Node.js 18+
- Verifique logs do Azure

### Erro 500
- Verifique configuração do Supabase
- Confirme RESEND_API_KEY
- Verifique logs de aplicação

### Performance
- Habilite CDN
- Configure cache
- Otimize imagens

## 📞 Suporte

### Logs Importantes
- **Application Logs:** `/LogFiles/Application`
- **Error Logs:** `/LogFiles/DetailedErrors`
- **IIS Logs:** `/LogFiles/W3SVC`

### Comandos de Debug
```bash
# Verificar status
az webapp show --name huios-consultoria --resource-group myResourceGroup

# Restart app
az webapp restart --name huios-consultoria --resource-group myResourceGroup

# Ver logs
az webapp log tail --name huios-consultoria --resource-group myResourceGroup
```

## 🎉 Próximos Passos

1. **Configurar Supabase** - Criar projeto e configurar variáveis
2. **Configurar Resend** - Para envio de emails
3. **Testar funcionalidades** - Formulário de contato
4. **Configurar domínio** - Se necessário
5. **Monitorar performance** - Application Insights

---

**✅ Seu site está pronto para produção no Azure!** 🚀

