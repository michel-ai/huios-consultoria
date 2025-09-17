-- Criação das tabelas principais para Huios Consultoria

-- Tabela de contatos/leads
CREATE TABLE contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    service_type VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'novo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de serviços
CREATE TABLE services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(20),
    features JSONB,
    pricing JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de categorias de projetos
CREATE TABLE project_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    icon VARCHAR(50),
    color VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de projetos/portfolio
CREATE TABLE projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category_id UUID REFERENCES project_categories(id),
    client_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    challenge TEXT,
    solution TEXT,
    technologies JSONB,
    results JSONB,
    metrics JSONB,
    image_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de depoimentos
CREATE TABLE testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    client_role VARCHAR(255),
    client_company VARCHAR(255),
    client_avatar VARCHAR(10),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    testimonial_text TEXT NOT NULL,
    project_name VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de membros da equipe
CREATE TABLE team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    specialty VARCHAR(255),
    bio TEXT,
    avatar_url VARCHAR(500),
    skills JSONB,
    experience_years INTEGER,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de artigos/blog
CREATE TABLE articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image VARCHAR(500),
    author_id UUID REFERENCES team_members(id),
    tags JSONB,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de configurações do site
CREATE TABLE site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value JSONB,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created_at ON contacts(created_at);
CREATE INDEX idx_projects_category ON projects(category_id);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_projects_active ON projects(is_active);
CREATE INDEX idx_testimonials_active ON testimonials(is_active);
CREATE INDEX idx_team_members_active ON team_members(is_active);
CREATE INDEX idx_articles_published ON articles(is_published);
CREATE INDEX idx_articles_slug ON articles(slug);
