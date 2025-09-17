# 🐙 Guia para Subir o Site no GitHub

## ✅ Status Atual
- **✅ Repositório Git inicializado**
- **✅ Commit inicial realizado**
- **✅ 101 arquivos commitados**
- **✅ README.md criado**
- **✅ .gitignore configurado**

## 🚀 Próximos Passos

### 1. Criar Repositório no GitHub

1. **Acesse:** https://github.com
2. **Clique em:** "New repository" (botão verde)
3. **Configure:**
   - **Repository name:** `huios-consultoria`
   - **Description:** `Site institucional da Huios Consultoria - Soluções tecnológicas`
   - **Visibility:** Public (ou Private se preferir)
   - **NÃO marque:** "Add a README file" (já temos)
   - **NÃO marque:** "Add .gitignore" (já temos)
   - **NÃO marque:** "Choose a license" (opcional)

4. **Clique em:** "Create repository"

### 2. Conectar Repositório Local ao GitHub

Execute estes comandos no terminal (na pasta do projeto):

```bash
# Adicionar o repositório remoto (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/huios-consultoria.git

# Renomear branch para main (se necessário)
git branch -M main

# Fazer push para o GitHub
git push -u origin main
```

### 3. Verificar Upload

Após o push, você verá:
- ✅ Todos os arquivos no GitHub
- ✅ README.md exibido na página principal
- ✅ Histórico de commits
- ✅ Estrutura de pastas organizada

## 📁 Estrutura no GitHub

```
huios-consultoria/
├── 📄 README.md              # Documentação principal
├── 📁 app/                   # Páginas Next.js
├── 📁 components/            # Componentes React
├── 📁 lib/                   # Utilitários
├── 📁 public/                # Arquivos estáticos
├── 📁 scripts/               # Scripts SQL
├── 📄 package.json           # Dependências
├── 📄 next.config.js         # Configuração Next.js
├── 📄 .gitignore             # Arquivos ignorados
└── 📄 web.config             # Configuração Azure
```

## 🔧 Comandos Úteis

### Atualizar o Repositório
```bash
# Adicionar mudanças
git add .

# Fazer commit
git commit -m "Descrição das mudanças"

# Enviar para GitHub
git push
```

### Clonar o Repositório
```bash
git clone https://github.com/SEU_USUARIO/huios-consultoria.git
```

### Verificar Status
```bash
git status
git log --oneline
```

## 🌐 Deploy Automático

### GitHub Pages (Gratuito)
1. Vá em **Settings** > **Pages**
2. **Source:** Deploy from a branch
3. **Branch:** main
4. **Folder:** / (root)
5. **Save**

### Vercel (Recomendado)
1. Acesse: https://vercel.com
2. **Import Git Repository**
3. Selecione: `huios-consultoria`
4. **Deploy** automático

### Netlify
1. Acesse: https://netlify.com
2. **New site from Git**
3. Conecte com GitHub
4. Selecione: `huios-consultoria`
5. **Deploy** automático

## 📋 Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Código enviado com sucesso
- [ ] README.md exibido corretamente
- [ ] Estrutura de pastas organizada
- [ ] Deploy configurado (opcional)

## 🎉 Pronto!

Seu site da Huios Consultoria está agora no GitHub e pronto para:
- ✅ Colaboração em equipe
- ✅ Deploy automático
- ✅ Controle de versão
- ✅ Backup seguro

**URL do repositório:** `https://github.com/SEU_USUARIO/huios-consultoria`
