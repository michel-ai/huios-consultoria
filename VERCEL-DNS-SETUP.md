# 🚀 CONFIGURAÇÃO DNS NO VERCEL - HUIOS CONSULTORIA

## 🎯 **SITUAÇÃO ATUAL:**
- ✅ Domínio: `huiosconsultoria.net.br`
- ✅ DNS: Gerenciado pelo Vercel (`ns1.vercel-dns.com`)
- ❌ Registros MX/SPF: Não configurados

## 🔧 **CONFIGURAÇÃO NO VERCEL:**

### 1️⃣ **Acessar o Vercel:**
1. Vá para: https://vercel.com/dashboard
2. Clique em "Domains"
3. Encontre `huiosconsultoria.net.br`
4. Clique em "Manage"

### 2️⃣ **Adicionar Registros DNS:**

#### **MX Record (Email):**
```
Type: MX
Name: @
Value: feedback-smtp.sa-east-1.amazonses.com
Priority: 10
TTL: 3600
```

#### **SPF Record:**
```
Type: TXT
Name: @
Value: v=spf1 include:amazonses.com ~all
TTL: 3600
```

#### **DKIM Record:**
```
Type: TXT
Name: resend._domainkey
Value: p=MIGMAOGCSqGSIb3DQEB... (valor completo do Resend)
TTL: 3600
```

#### **DMARC Record:**
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:huiosconsutoria@gmail.com
TTL: 3600
```

### 3️⃣ **Verificar no Resend:**
1. Acesse: https://resend.com/domains
2. Clique em `huiosconsultoria.net.br`
3. Aguarde a verificação automática

## ⏱️ **TEMPO DE PROPAGAÇÃO:**
- **Vercel:** 5-15 minutos
- **Global:** 1-2 horas

## 🎯 **VANTAGENS DO VERCEL:**
- ✅ Configuração mais fácil
- ✅ Propagação mais rápida
- ✅ Interface intuitiva
- ✅ Integração com o site

## 📞 **SUPORTE:**
Se precisar de ajuda:
- Vercel Support: https://vercel.com/support
- Resend Support: https://resend.com/support
