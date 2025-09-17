-- Views úteis para consultas frequentes

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
