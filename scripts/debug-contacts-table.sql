-- Verificar se a tabela contacts existe e sua estrutura
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'contacts' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- Verificar se há dados na tabela
SELECT COUNT(*) as total_contacts FROM contacts;

-- Verificar os últimos registros
SELECT * FROM contacts ORDER BY created_at DESC LIMIT 3;

-- Verificar políticas RLS
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'contacts';

-- Testar inserção manual simples
INSERT INTO contacts (name, email, message) 
VALUES ('Teste Manual', 'teste@teste.com', 'Mensagem de teste')
RETURNING id, name, email, created_at;
