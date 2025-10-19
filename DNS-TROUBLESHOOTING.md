# 🔧 GUIA DE CORREÇÃO DNS - HUIOS CONSULTORIA

## ❌ PROBLEMAS IDENTIFICADOS:

- **MX Record:** DNS desconhecido
- **SPF Record:** DNS desconhecido

## 🔍 VERIFICAÇÕES NECESSÁRIAS:

### 1️⃣ **Verificar no Painel do Resend:**
1. Acesse: https://resend.com/domains
2. Clique em `huiosconsultoria.net.br`
3. Verifique se os registros estão corretos
4. Aguarde a verificação automática

### 2️⃣ **Configurações Alternativas:**

#### **MX Record - Tente estas variações:**
```
Opção 1:
Nome: @
Valor: feedback-smtp.sa-east-1.amazonses.com

Opção 2:
Nome: (vazio)
Valor: feedback-smtp.sa-east-1.amazonses.com

Opção 3:
Nome: send.huiosconsultoria.net.br
Valor: feedback-smtp.sa-east-1.amazonses.com
```

#### **SPF Record - Tente estas variações:**
```
Opção 1:
Nome: @
Valor: v=spf1 include:amazonses.com ~all

Opção 2:
Nome: (vazio)
Valor: v=spf1 include:amazonses.com ~all

Opção 3:
Nome: send
Valor: v=spf1 include:amazonses.com ~all
```

### 3️⃣ **Verificar Propagação DNS:**

#### **Comandos para testar:**
```bash
# Verificar MX
nslookup -type=MX huiosconsultoria.net.br

# Verificar TXT
nslookup -type=TXT huiosconsultoria.net.br

# Verificar DKIM
nslookup -type=TXT resend._domainkey.huiosconsultoria.net.br
```

### 4️⃣ **Solução Temporária:**

Enquanto os DNS não propagam, o sistema continuará funcionando com:
- **Domínio atual:** `onboarding@resend.dev`
- **Limitação:** Só para `huiosconsutoria@gmail.com`
- **Funcionamento:** Sistema estável

## ⏱️ **TEMPO DE PROPAGAÇÃO:**

- **DNS Local:** 1-2 horas
- **DNS Global:** 24-48 horas
- **Verificação:** Use ferramentas online de DNS

## 🎯 **PRÓXIMOS PASSOS:**

1. **Tente as configurações alternativas**
2. **Aguarde 2-4 horas**
3. **Verifique no Resend**
4. **Teste com comandos DNS**

## 📞 **SUPORTE:**

Se os problemas persistirem:
- Contate o suporte do seu provedor de domínio
- Verifique se o domínio está ativo
- Confirme as configurações com o Resend
