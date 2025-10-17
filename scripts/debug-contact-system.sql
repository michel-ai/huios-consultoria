-- Script para diagnosticar problemas no sistema de contato

-- 1. Verificar se a tabela contacts existe e sua estrutura
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'contacts' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Verificar políticas RLS da tabela contacts
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'contacts';

-- 3. Testar inserção manual
INSERT INTO contacts (name, email, message) 
VALUES ('Teste Sistema', 'teste@huios.com', 'Teste de funcionamento do sistema')
RETURNING id, name, email, created_at;

-- 4. Verificar se o registro foi inserido
SELECT COUNT(*) as total_contacts FROM contacts;

-- 5. Ver últimos contatos
SELECT 
    id, 
    name, 
    email, 
    phone, 
    company, 
    service_type, 
    message,
    status,
    created_at 
FROM contacts 
ORDER BY created_at DESC 
LIMIT 5;
