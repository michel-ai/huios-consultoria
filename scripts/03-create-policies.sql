-- Políticas de segurança RLS (Row Level Security) para Supabase

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
