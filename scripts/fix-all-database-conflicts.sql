-- Script unificado para corrigir todos os conflitos de banco de dados
-- Este script verifica e corrige de forma segura todos os objetos existentes

-- =============================================
-- PARTE 1: REMOVER POLÍTICAS EXISTENTES
-- =============================================
DO $$
BEGIN
    -- Remover políticas existentes para evitar conflitos
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
    
    RAISE NOTICE 'Políticas existentes removidas com sucesso';
END
$$;

-- =============================================
-- PARTE 2: REMOVER TRIGGERS EXISTENTES
-- =============================================
DO $$
BEGIN
    -- Remover triggers existentes para evitar conflitos
    DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
    DROP TRIGGER IF EXISTS update_services_updated_at ON services;
    DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
    DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
    DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
    
    RAISE NOTICE 'Triggers existentes removidos com sucesso';
END
$$;

-- =============================================
-- PARTE 3: REMOVER VIEWS EXISTENTES
-- =============================================
DO $$
BEGIN
    -- Remover views existentes para evitar conflitos
    DROP VIEW IF EXISTS projects_with_category;
    DROP VIEW IF EXISTS contacts_by_month;
    DROP VIEW IF EXISTS popular_services;
    DROP VIEW IF EXISTS projects_by_category;
    
    RAISE NOTICE 'Views existentes removidas com sucesso';
END
$$;

-- =============================================
-- PARTE 4: REMOVER FUNÇÕES EXISTENTES
-- =============================================
DO $$
BEGIN
    -- Remover funções existentes para evitar conflitos
    DROP FUNCTION IF EXISTS update_updated_at_column();
    DROP FUNCTION IF EXISTS get_projects_by_category(TEXT);
    DROP FUNCTION IF EXISTS get_site_stats();
    DROP FUNCTION IF EXISTS get_featured_projects();
    
    RAISE NOTICE 'Funções existentes removidas com sucesso';
END
$$;

-- =============================================
-- PARTE 5: RECRIAR FUNÇÕES
-- =============================================

-- Função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

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
-- PARTE 6: RECRIAR TRIGGERS
-- =============================================

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

-- =============================================
-- PARTE 7: RECRIAR VIEWS
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

-- =============================================
-- PARTE 8: RECRIAR POLÍTICAS DE SEGURANÇA
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
-- PARTE 9: ATUALIZAR INFORMAÇÕES DE CONTATO
-- =============================================

-- Atualizar informações de contato da empresa
INSERT INTO site_settings (key, value, description) VALUES
(
    'contact_info',
    '{
        "phone": "(91) 9860-66544",
        "email": "huiosconsutoria@gmail.com",
        "address": "Belém, Pará, Brasil",
        "business_hours": "Segunda a Sexta: 8h às 18h"
    }',
    'Informações de contato'
)
ON CONFLICT (key) DO UPDATE SET
    value = EXCLUDED.value,
    updated_at = NOW();

-- Adicionar configurações de notificação
INSERT INTO site_settings (key, value, description) VALUES
(
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
)
ON CONFLICT (key) DO UPDATE SET
    value = EXCLUDED.value,
    updated_at = NOW();

-- Confirmar conclusão
SELECT 'Correção completa do banco de dados concluída com sucesso!' as resultado;
