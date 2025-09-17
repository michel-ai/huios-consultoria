# Configuração para Deploy no Azure

## Variáveis de Ambiente Necessárias

Configure estas variáveis no Azure App Service:

### Supabase
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Resend (Email)
```
RESEND_API_KEY=your_resend_api_key
```

### Next.js
```
NEXT_PUBLIC_APP_URL=https://your-app.azurewebsites.net
NODE_ENV=production
PORT=8080
```

## Passos para Deploy

1. **Criar App Service no Azure**
   - Escolher Node.js 18+ como runtime
   - Habilitar HTTPS
   - Configurar domínio personalizado (opcional)

2. **Configurar Variáveis de Ambiente**
   - Ir em Configuration > Application settings
   - Adicionar todas as variáveis acima

3. **Deploy via Git**
   - Conectar repositório Git
   - O Azure fará build automático

4. **Deploy via ZIP**
   - Fazer build local: `npm run build`
   - Compactar pasta `.next` e `public`
   - Fazer upload via Azure Portal

## Arquivos de Configuração

- `web.config` - Configuração do IIS
- `deploy.cmd` - Script de deploy
- `next.config.js` - Configuração otimizada para Azure

## Monitoramento

- Usar Application Insights
- Configurar logs de erro
- Monitorar performance
