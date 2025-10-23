-- Script unificado para configuração completa do banco de dados
-- Este script executa todas as operações na ordem correta para evitar erros de dependência

-- =============================================
-- PARTE 1: CRIAÇÃO DE TABELAS
-- =============================================

-- Tabela de contatos/leads
CREATE TABLE IF NOT EXISTS contacts (
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
CREATE TABLE IF NOT EXISTS services (
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
CREATE TABLE IF NOT EXISTS project_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    icon VARCHAR(50),
    color VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de projetos/portfolio
CREATE TABLE IF NOT EXISTS projects (
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
CREATE TABLE IF NOT EXISTS testimonials (
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
CREATE TABLE IF NOT EXISTS team_members (
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
CREATE TABLE IF NOT EXISTS articles (
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
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value JSONB,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category_id);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_active ON projects(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_team_members_active ON team_members(is_active);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

-- =============================================
-- PARTE 2: INSERÇÃO DE DADOS INICIAIS
-- =============================================

-- Inserir categorias de projetos
INSERT INTO project_categories (name, slug, icon, color)
SELECT 'Saúde', 'saude', '🏥', '#ff4757'
WHERE NOT EXISTS (SELECT 1 FROM project_categories WHERE slug = 'saude');

INSERT INTO project_categories (name, slug, icon, color)
SELECT 'Logística', 'logistica', '🚚', '#3742fa'
WHERE NOT EXISTS (SELECT 1 FROM project_categories WHERE slug = 'logistica');

INSERT INTO project_categories (name, slug, icon, color)
SELECT 'Indústria', 'industria', '🏭', '#ff6b35'
WHERE NOT EXISTS (SELECT 1 FROM project_categories WHERE slug = 'industria');

INSERT INTO project_categories (name, slug, icon, color)
SELECT 'Varejo', 'varejo', '🛍️', '#2ed573'
WHERE NOT EXISTS (SELECT 1 FROM project_categories WHERE slug = 'varejo');

INSERT INTO project_categories (name, slug, icon, color)
SELECT 'Financeiro', 'financeiro', '🏦', '#ffa502'
WHERE NOT EXISTS (SELECT 1 FROM project_categories WHERE slug = 'financeiro');

INSERT INTO project_categories (name, slug, icon, color)
SELECT 'Tecnologia', 'tecnologia', '💾', '#a55eea'
WHERE NOT EXISTS (SELECT 1 FROM project_categories WHERE slug = 'tecnologia');

-- Inserir serviços
INSERT INTO services (name, slug, description, icon, color, features, pricing)
SELECT 
    'Mikrotik',
    'mikrotik',
    'Configuração e otimização de equipamentos Mikrotik para máxima performance de rede.',
    '🔧',
    '#15ff00',
    '["Configuração de roteadores", "Balanceamento de carga", "VPN e túneis seguros", "Monitoramento de tráfego", "Otimização de performance"]',
    '{"basico": "R$ 2.500", "intermediario": "R$ 4.500", "avancado": "R$ 8.000"}'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'mikrotik');

INSERT INTO services (name, slug, description, icon, color, features, pricing)
SELECT 
    'Huawei',
    'huawei',
    'Implementação e manutenção de soluções Huawei para infraestrutura corporativa.',
    '📡',
    '#00c8ff',
    '["Switches empresariais", "Soluções wireless", "Equipamentos de datacenter", "Sistemas de segurança", "Suporte técnico especializado"]',
    '{"basico": "R$ 3.500", "intermediario": "R$ 6.500", "avancado": "R$ 12.000"}'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'huawei');

INSERT INTO services (name, slug, description, icon, color, features, pricing)
SELECT 
    'Datacom',
    'datacom',
    'Soluções completas Datacom para conectividade e comunicação empresarial.',
    '💻',
    '#ff5500',
    '["Roteadores de alta performance", "Switches gerenciáveis", "Soluções de conectividade", "Equipamentos carrier grade", "Consultoria técnica"]',
    '{"basico": "R$ 3.000", "intermediario": "R$ 5.500", "avancado": "R$ 10.000"}'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'datacom');

INSERT INTO services (name, slug, description, icon, color, features, pricing)
SELECT 
    'Monitoramentos',
    'monitoramentos',
    'Sistemas avançados de monitoramento para garantir a disponibilidade da sua infraestrutura.',
    '📊',
    '#ff00c8',
    '["Monitoramento 24/7", "Alertas em tempo real", "Dashboards personalizados", "Relatórios detalhados", "Análise de performance"]',
    '{"basico": "R$ 2.000", "intermediario": "R$ 4.000", "avancado": "R$ 7.500"}'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'monitoramentos');

INSERT INTO services (name, slug, description, icon, color, features, pricing)
SELECT 
    'Automações',
    'automacoes',
    'Automação de processos e sistemas para aumentar a eficiência operacional.',
    '⚙️',
    '#ffaa00',
    '["Scripts personalizados", "Automação de backups", "Provisionamento automático", "Integração de sistemas", "Workflows inteligentes"]',
    '{"basico": "R$ 1.800", "intermediario": "R$ 3.500", "avancado": "R$ 6.500"}'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'automacoes');

INSERT INTO services (name, slug, description, icon, color, features, pricing)
SELECT 
    'Consultoria',
    'consultoria',
    'Consultoria especializada para otimização e modernização da sua infraestrutura.',
    '🎯',
    '#aa00ff',
    '["Análise de infraestrutura", "Planejamento estratégico", "Migração de sistemas", "Treinamento de equipes", "Documentação técnica"]',
    '{"basico": "R$ 2.200", "intermediario": "R$ 4.200", "avancado": "R$ 8.500"}'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'consultoria');

-- Inserir membros da equipe
INSERT INTO team_members (name, role, specialty, bio, skills, experience_years, display_order)
SELECT 
    'João Silva',
    'CEO & Fundador',
    'Gestão Estratégica',
    'Especialista em gestão estratégica com mais de 15 anos de experiência em tecnologia.',
    '["Liderança", "Estratégia", "Gestão de Projetos", "Vendas Técnicas"]',
    15,
    1
WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'João Silva' AND role = 'CEO & Fundador');

INSERT INTO team_members (name, role, specialty, bio, skills, experience_years, display_order)
SELECT 
    'Maria Santos',
    'CTO',
    'Arquitetura de Sistemas',
    'Arquiteta de sistemas com expertise em cloud computing e infraestrutura corporativa.',
    '["Cloud Computing", "Arquitetura", "DevOps", "Segurança"]',
    12,
    2
WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Maria Santos' AND role = 'CTO');

INSERT INTO team_members (name, role, specialty, bio, skills, experience_years, display_order)
SELECT 
    'Pedro Costa',
    'Diretor Técnico',
    'Redes e Infraestrutura',
    'Especialista em redes e infraestrutura com certificações Mikrotik, Huawei e Datacom.',
    '["Mikrotik", "Huawei", "Datacom", "Redes", "Infraestrutura"]',
    10,
    3
WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Pedro Costa' AND role = 'Diretor Técnico');

INSERT INTO team_members (name, role, specialty, bio, skills, experience_years, display_order)
SELECT 
    'Ana Oliveira',
    'Gerente de Projetos',
    'Metodologias Ágeis',
    'Especialista em metodologias ágeis e gestão de projetos de tecnologia.',
    '["Scrum", "Kanban", "Gestão de Projetos", "Qualidade"]',
    8,
    4
WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Ana Oliveira' AND role = 'Gerente de Projetos');

-- Inserir projetos em destaque
DO $$
DECLARE
    saude_id UUID;
    logistica_id UUID;
    industria_id UUID;
BEGIN
    -- Obter IDs das categorias
    SELECT id INTO saude_id FROM project_categories WHERE slug = 'saude';
    SELECT id INTO logistica_id FROM project_categories WHERE slug = 'logistica';
    SELECT id INTO industria_id FROM project_categories WHERE slug = 'industria';
    
    -- Inserir projeto 1
    INSERT INTO projects (title, slug, category_id, client_name, description, challenge, solution, technologies, results, metrics, is_featured)
    SELECT 
        'Modernização Hospitalar',
        'modernizacao-hospitalar',
        saude_id,
        'Hospital Regional de Belém',
        'Implementação completa de sistema de monitoramento 24/7 para infraestrutura crítica hospitalar, garantindo alta disponibilidade dos serviços médicos.',
        'Necessidade de monitoramento em tempo real de equipamentos críticos sem interrupção dos serviços.',
        'Sistema de monitoramento integrado com alertas automáticos e dashboards personalizados.',
        '["Zabbix", "SNMP", "Grafana", "Python", "MySQL"]',
        '["99.9% de uptime dos sistemas críticos", "Redução de 95% no tempo de resposta a incidentes", "Monitoramento de 500+ dispositivos em tempo real", "Economia de 40% nos custos de manutenção"]',
        '{"duration": "6 meses", "team": "8 especialistas", "investment": "R$ 250.000", "roi": "300%"}',
        true
    WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug = 'modernizacao-hospitalar');
    
    -- Inserir projeto 2
    INSERT INTO projects (title, slug, category_id, client_name, description, challenge, solution, technologies, results, metrics, is_featured)
    SELECT 
        'Rede Corporativa Inteligente',
        'rede-corporativa-inteligente',
        logistica_id,
        'Grupo Logístico Amazônia',
        'Implementação de rede corporativa robusta com equipamentos Mikrotik para empresa de logística com 15 filiais distribuídas pela região Norte.',
        'Conectividade instável entre filiais e baixa performance da rede corporativa.',
        'Rede SD-WAN com balanceamento de carga e redundância em todas as conexões.',
        '["Mikrotik", "SD-WAN", "MPLS", "VPN", "QoS"]',
        '["Aumento de 400% na velocidade da rede", "Redução de 90% nos problemas de conectividade", "Conectividade redundante em 100% das filiais", "ROI de 250% em 18 meses"]',
        '{"duration": "4 meses", "team": "6 especialistas", "investment": "R$ 180.000", "roi": "250%"}',
        true
    WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug = 'rede-corporativa-inteligente');
    
    -- Inserir projeto 3
    INSERT INTO projects (title, slug, category_id, client_name, description, challenge, solution, technologies, results, metrics, is_featured)
    SELECT 
        'Automação Industrial 4.0',
        'automacao-industrial-40',
        industria_id,
        'Indústria Alimentícia do Pará',
        'Implementação de solução IoT industrial completa com automação de processos e monitoramento em tempo real da linha de produção.',
        'Baixa eficiência produtiva e alto índice de paradas não programadas.',
        'Sistema IoT integrado com sensores inteligentes e automação de processos críticos.',
        '["IoT", "Python", "MQTT", "Node-RED", "InfluxDB"]',
        '["Aumento de 35% na eficiência produtiva", "Redução de 60% em paradas não programadas", "Economia de 30% nos custos operacionais", "Predição de falhas com 90% de precisão"]',
        '{"duration": "8 meses", "team": "10 especialistas", "investment": "R$ 320.000", "roi": "280%"}',
        true
    WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug = 'automacao-industrial-40');
END
$$;

-- Inserir depoimentos
INSERT INTO testimonials (client_name, client_role, client_company, client_avatar, rating, testimonial_text, project_name)
SELECT 
    'Dr. Carlos Mendes',
    'Diretor de TI',
    'Hospital Regional',
    'CM',
    5,
    'A Huios transformou completamente nossa infraestrutura hospitalar. O sistema de monitoramento implementado por eles já evitou várias situações críticas. Profissionalismo excepcional!',
    'Modernização Hospitalar'
WHERE NOT EXISTS (SELECT 1 FROM testimonials WHERE client_name = 'Dr. Carlos Mendes' AND client_company = 'Hospital Regional');

INSERT INTO testimonials (client_name, client_role, client_company, client_avatar, rating, testimonial_text, project_name)
SELECT 
    'Ana Paula Silva',
    'CTO',
    'Grupo Logístico Amazônia',
    'AS',
    5,
    'A nova rede corporativa aumentou nossa produtividade em 400%. A equipe da Huios é altamente qualificada e entregou o projeto no prazo estabelecido.',
    'Rede Corporativa Inteligente'
WHERE NOT EXISTS (SELECT 1 FROM testimonials WHERE client_name = 'Ana Paula Silva' AND client_company = 'Grupo Logístico Amazônia');

INSERT INTO testimonials (client_name, client_role, client_company, client_avatar, rating, testimonial_text, project_name)
SELECT 
    'Roberto Santos',
    'Gerente de Produção',
    'Indústria Alimentícia',
    'RS',
    5,
    'A automação implementada revolucionou nossa produção. Conseguimos prever falhas antes que aconteçam e nossa eficiência aumentou significativamente.',
    'Automação Industrial 4.0'
WHERE NOT EXISTS (SELECT 1 FROM testimonials WHERE client_name = 'Roberto Santos' AND client_company = 'Indústria Alimentícia');

-- Inserir configurações do site
INSERT INTO site_settings (key, value, description)
SELECT 
    'company_info',
    '{
        "name": "Huios Consultoria",
        "tagline": "Transformando empresas através da tecnologia",
        "description": "Especialistas em soluções tecnológicas para empresas que buscam inovação e excelência",
        "founded_year": 2019,
        "location": "Belém, Pará, Brasil"
    }',
    'Informações básicas da empresa'
WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE key = 'company_info');

INSERT INTO site_settings (key, value, description)
SELECT 
    'contact_info',
    '{
        "phone": "(91) 98606-6544",
        "email": "huiosconsutoria@gmail.com",
        "address": "Belém, Pará, Brasil",
        "business_hours": "Segunda a Sexta: 8h às 18h"
    }',
    'Informações de contato'
WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE key = 'contact_info');

INSERT INTO site_settings (key, value, description)
SELECT 
    'social_media',
    '{
        "facebook": "#",
        "instagram": "#",
        "linkedin": "#",
        "twitter": "#"
    }',
    'Links das redes sociais'
WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE key = 'social_media');

INSERT INTO site_settings (key, value, description)
SELECT 
    'stats',
    '{
        "projects_completed": 150,
        "active_clients": 50,
        "years_experience": 5,
        "success_rate": 98,
        "total_value_delivered": "R$ 5M+"
    }',
    'Estatísticas da empresa'
WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE key = 'stats');

INSERT INTO site_settings (key, value, description)
SELECT 
    'notification_settings',
    '{
        "admin_email": "huiosconsutoria@gmail.com",
        "notify_new_contacts": true,
        "notify_new_projects": true,
        "email_templates": {
            "new_contact": {
                "subject": "Novo contato - Huios Consultoria",
                "template": "Novo contato recebido através do site"
            }
        }
    }',
    'Configurações de notificações por email'
WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE key = 'notification_settings');

-- =============================================
-- PARTE 3: POLÍTICAS DE SEGURANÇA (RLS)
-- =============================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes (se houver)
DROP POLICY IF EXISTS "Public read access for services" ON services;
DROP POLICY IF EXISTS "Public read access for project_categories" ON project_categories;
DROP POLICY IF EXISTS "Public read access for projects" ON projects;
DROP POLICY IF EXISTS "Public read access for testimonials" ON testimonials;
DROP POLICY IF EXISTS "Public read access for team_members" ON team_members;
DROP POLICY IF EXISTS "Public read access for published articles" ON articles;
DROP POLICY IF EXISTS "Public read access for site_settings" ON site_settings;
DROP POLICY IF EXISTS "Anyone can insert contacts" ON contacts;
DROP POLICY IF EXISTS "Admin full access to contacts" ON contacts;
DROP POLICY IF EXISTS "Admin full access to services" ON services;
DROP POLICY IF EXISTS "Admin full access to projects" ON projects;
DROP POLICY IF EXISTS "Admin full access to testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admin full access to team_members" ON team_members;
DROP POLICY IF EXISTS "Admin full access to articles" ON articles;
DROP POLICY IF EXISTS "Admin full access to site_settings" ON site_settings;

-- Políticas para leitura pública (dados que podem ser visualizados por todos)
CREATE POLICY "Public read access for services" ON services
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for project_categories" ON project_categories
    FOR SELECT USING (true);

CREATE POLICY "Public read access for projects" ON projects
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for testimonials" ON testimonials
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for team_members" ON team_members
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for published articles" ON articles
    FOR SELECT USING (is_published = true);

CREATE POLICY "Public read access for site_settings" ON site_settings
    FOR SELECT USING (true);

-- Política para inserção de contatos (formulário público)
CREATE POLICY "Anyone can insert contacts" ON contacts
    FOR INSERT WITH CHECK (true);

-- Políticas para administradores (requer autenticação)
-- Nota: Estas políticas assumem que você terá um sistema de autenticação
-- Para desenvolvimento, você pode temporariamente permitir acesso total

-- Política temporária para desenvolvimento (REMOVER EM PRODUÇÃO)
CREATE POLICY "Admin full access to contacts" ON contacts
    FOR ALL USING (true);

CREATE POLICY "Admin full access to services" ON services
    FOR ALL USING (true);

CREATE POLICY "Admin full access to projects" ON projects
    FOR ALL USING (true);

CREATE POLICY "Admin full access to testimonials" ON testimonials
    FOR ALL USING (true);

CREATE POLICY "Admin full access to team_members" ON team_members
    FOR ALL USING (true);

CREATE POLICY "Admin full access to articles" ON articles
    FOR ALL USING (true);

CREATE POLICY "Admin full access to site_settings" ON site_settings
    FOR ALL USING (true);

-- =============================================
-- PARTE 4: FUNÇÕES E TRIGGERS
-- =============================================

-- Função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Remover triggers existentes (se houver)
DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
DROP TRIGGER IF EXISTS update_services_updated_at ON services;
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;

-- Triggers para atualizar updated_at automaticamente
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para buscar projetos por categoria
CREATE OR REPLACE FUNCTION get_projects_by_category(category_slug TEXT)
RETURNS TABLE (
    id UUID,
    title VARCHAR,
    slug VARCHAR,
    client_name VARCHAR,
    description TEXT,
    image_url VARCHAR,
    is_featured BOOLEAN,
    category_name VARCHAR,
    category_icon VARCHAR,
    category_color VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.title,
        p.slug,
        p.client_name,
        p.description,
        p.image_url,
        p.is_featured,
        pc.name as category_name,
        pc.icon as category_icon,
        pc.color as category_color
    FROM projects p
    JOIN project_categories pc ON p.category_id = pc.id
    WHERE pc.slug = category_slug AND p.is_active = true
    ORDER BY p.is_featured DESC, p.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Função para buscar estatísticas do site
CREATE OR REPLACE FUNCTION get_site_stats()
RETURNS JSON AS $$
DECLARE
    stats JSON;
BEGIN
    SELECT json_build_object(
        'total_projects', (SELECT COUNT(*) FROM projects WHERE is_active = true),
        'featured_projects', (SELECT COUNT(*) FROM projects WHERE is_featured = true AND is_active = true),
        'total_clients', (SELECT COUNT(DISTINCT client_name) FROM projects WHERE is_active = true),
        'total_testimonials', (SELECT COUNT(*) FROM testimonials WHERE is_active = true),
        'total_team_members', (SELECT COUNT(*) FROM team_members WHERE is_active = true),
        'total_services', (SELECT COUNT(*) FROM services WHERE is_active = true),
        'total_contacts', (SELECT COUNT(*) FROM contacts),
        'recent_contacts', (SELECT COUNT(*) FROM contacts WHERE created_at >= NOW() - INTERVAL '30 days')
    ) INTO stats;
    
    RETURN stats;
END;
$$ LANGUAGE plpgsql;

-- Função para buscar projetos em destaque
CREATE OR REPLACE FUNCTION get_featured_projects()
RETURNS TABLE (
    id UUID,
    title VARCHAR,
    slug VARCHAR,
    client_name VARCHAR,
    description TEXT,
    challenge TEXT,
    solution TEXT,
    technologies JSONB,
    results JSONB,
    metrics JSONB,
    image_url VARCHAR,
    category_name VARCHAR,
    category_icon VARCHAR,
    category_color VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.title,
        p.slug,
        p.client_name,
        p.description,
        p.challenge,
        p.solution,
        p.technologies,
        p.results,
        p.metrics,
        p.image_url,
        pc.name as category_name,
        pc.icon as category_icon,
        pc.color as category_color
    FROM projects p
    JOIN project_categories pc ON p.category_id = pc.id
    WHERE p.is_featured = true AND p.is_active = true
    ORDER BY p.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- PARTE 5: VIEWS
-- =============================================

-- View para projetos com informações da categoria
CREATE OR REPLACE VIEW projects_with_category AS
SELECT 
    p.id,
    p.title,
    p.slug,
    p.client_name,
    p.description,
    p.challenge,
    p.solution,
    p.technologies,
    p.results,
    p.metrics,
    p.image_url,
    p.is_featured,
    p.is_active,
    p.created_at,
    p.updated_at,
    pc.name as category_name,
    pc.slug as category_slug,
    pc.icon as category_icon,
    pc.color as category_color
FROM projects p
JOIN project_categories pc ON p.category_id = pc.id;

-- View para estatísticas de contatos por mês
CREATE OR REPLACE VIEW contacts_by_month AS
SELECT 
    DATE_TRUNC('month', created_at) as month,
    COUNT(*) as total_contacts,
    COUNT(CASE WHEN status = 'novo' THEN 1 END) as new_contacts,
    COUNT(CASE WHEN status = 'em_andamento' THEN 1 END) as in_progress_contacts,
    COUNT(CASE WHEN status = 'concluido' THEN 1 END) as completed_contacts
FROM contacts
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;

-- View para serviços mais solicitados
CREATE OR REPLACE VIEW popular_services AS
SELECT 
    service_type,
    COUNT(*) as request_count,
    COUNT(CASE WHEN created_at >= NOW() - INTERVAL '30 days' THEN 1 END) as recent_requests
FROM contacts
WHERE service_type IS NOT NULL
GROUP BY service_type
ORDER BY request_count DESC;

-- View para projetos por categoria
CREATE OR REPLACE VIEW projects_by_category AS
SELECT 
    pc.name as category_name,
    pc.slug as category_slug,
    pc.icon as category_icon,
    pc.color as category_color,
    COUNT(p.id) as total_projects,
    COUNT(CASE WHEN p.is_featured THEN 1 END) as featured_projects
FROM project_categories pc
LEFT JOIN projects p ON pc.id = p.category_id AND p.is_active = true
GROUP BY pc.id, pc.name, pc.slug, pc.icon, pc.color
ORDER BY total_projects DESC;

-- Confirmar conclusão
SELECT 'Configuração completa do banco de dados concluída com sucesso!' as resultado;
