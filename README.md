# 🚀 Huios Consultoria - Site Institucional

Site institucional da Huios Consultoria, empresa especializada em soluções tecnológicas, consultoria de redes, automação e monitoramento.

## 🎯 Sobre o Projeto

A Huios Consultoria é uma empresa especializada em:
- **Mikrotik** - Configuração e otimização de equipamentos
- **Huawei** - Soluções empresariais avançadas
- **Datacom** - Conectividade de alta performance
- **Monitoramentos** - Supervisão 24/7 da infraestrutura
- **Automações** - Processos inteligentes e eficientes

## 🛠️ Tecnologias Utilizadas

- **Next.js 15.2.4** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **Supabase** - Banco de dados
- **Resend** - Envio de emails
- **Radix UI** - Componentes

## 📁 Estrutura do Projeto

```
huios-consultoria/
├── app/                    # Páginas da aplicação
│   ├── contato/           # Formulário de contato
│   ├── portfolio/         # Portfólio de projetos
│   ├── servicos/          # Página de serviços
│   ├── sobre/             # Sobre a empresa
│   └── page.tsx           # Página principal
├── components/            # Componentes reutilizáveis
│   ├── Header.tsx         # Cabeçalho
│   ├── Footer.tsx         # Rodapé
│   └── ui/                # Biblioteca de componentes
├── lib/                   # Utilitários e configurações
│   ├── supabase.ts        # Configuração do Supabase
│   └── email.ts           # Configuração de email
├── public/                # Arquivos estáticos
│   └── images/            # Imagens do site
└── scripts/               # Scripts SQL do banco
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- pnpm (ou npm/yarn)

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/huios-consultoria.git

# Entre na pasta
cd huios-consultoria

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite o arquivo .env.local com suas configurações
```

### Desenvolvimento
```bash
pnpm dev
```
Acesse: http://localhost:3000

### Produção
```bash
pnpm build
pnpm start
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` com:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Resend (Email)
RESEND_API_KEY=your_resend_api_key

# Next.js
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

### Banco de Dados

Execute os scripts SQL na pasta `scripts/` na ordem:
1. `00-setup-database.sql`
2. `01-create-tables.sql`
3. `02-insert-initial-data.sql`
4. `03-create-policies.sql`
5. `04-create-functions.sql`
6. `05-create-views.sql`

## 🌐 Deploy

### Azure App Service
1. Siga o guia em `DEPLOY-AZURE.md`
2. Configure as variáveis de ambiente no Azure
3. Faça deploy via Git ou ZIP

### Outras Plataformas
- **Vercel**: Deploy automático via Git
- **Netlify**: Deploy automático via Git
- **Railway**: Deploy via Git

## 📱 Funcionalidades

- ✅ **Design Responsivo** - Funciona em todos os dispositivos
- ✅ **Formulário de Contato** - Integrado com Supabase e Resend
- ✅ **Portfólio Interativo** - Casos de sucesso com filtros
- ✅ **Página de Serviços** - Detalhes e preços
- ✅ **SEO Otimizado** - Meta tags e estrutura semântica
- ✅ **Animações Suaves** - Experiência visual premium
- ✅ **Performance Otimizada** - Carregamento rápido

## 🎨 Design

- **Tema**: Escuro com acentos verdes
- **Tipografia**: Geist Sans
- **Cores**: 
  - Primária: #15ff00 (Verde neon)
  - Fundo: #000000 (Preto)
  - Texto: #ffffff (Branco)

## 📞 Contato

- **Email**: huiosconsutoria@gmail.com
- **Telefone**: (91) 9860-66544
- **Localização**: Belém, Pará, Brasil

## 📄 Licença

Este projeto é propriedade da Huios Consultoria. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para a Huios Consultoria**
