-- Script para testar se o banco de dados está configurado corretamente

-- Verificar tabelas existentes
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Verificar políticas existentes
SELECT tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Verificar triggers existentes
SELECT 
    tgname AS trigger_name,
    relname AS table_name
FROM pg_trigger t
JOIN pg_class c ON t.tgrelid = c.oid
WHERE c.relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
  AND NOT t.tgisinternal
ORDER BY relname, tgname;

-- Verificar views existentes
SELECT table_name
FROM information_schema.views
WHERE table_schema = 'public'
ORDER BY table_name;

-- Verificar funções existentes
SELECT 
    p.proname AS function_name
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
  AND p.prokind = 'f'
ORDER BY p.proname;

-- Verificar dados nas tabelas principais
SELECT 'contacts' AS table_name, COUNT(*) AS record_count FROM contacts
UNION ALL
SELECT 'services' AS table_name, COUNT(*) AS record_count FROM services
UNION ALL
SELECT 'project_categories' AS table_name, COUNT(*) AS record_count FROM project_categories
UNION ALL
SELECT 'projects' AS table_name, COUNT(*) AS record_count FROM projects
UNION ALL
SELECT 'testimonials' AS table_name, COUNT(*) AS record_count FROM testimonials
UNION ALL
SELECT 'team_members' AS table_name, COUNT(*) AS record_count FROM team_members
UNION ALL
SELECT 'site_settings' AS table_name, COUNT(*) AS record_count FROM site_settings
ORDER BY table_name;

-- Verificar configurações de contato
SELECT key, value 
FROM site_settings 
WHERE key = 'contact_info' OR key = 'notification_settings';

-- Confirmar conclusão
SELECT 'Teste de configuração do banco de dados concluído com sucesso!' as resultado;
