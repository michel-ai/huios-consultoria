-- Funções úteis para o banco de dados

-- Função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

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
