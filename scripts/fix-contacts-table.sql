-- Script para verificar e corrigir a tabela de contatos

-- 1. Verificar se a tabela existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'contacts') THEN
        -- Criar tabela se não existir
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
        
        RAISE NOTICE 'Tabela contacts criada com sucesso!';
    ELSE
        RAISE NOTICE 'Tabela contacts já existe.';
    END IF;
END
$$;

-- 2. Verificar estrutura da tabela
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'contacts' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Remover políticas existentes
DROP POLICY IF EXISTS "Anyone can insert contacts" ON contacts;
DROP POLICY IF EXISTS "Admin full access to contacts" ON contacts;

-- 4. Habilitar RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 5. Criar políticas corretas
CREATE POLICY "Anyone can insert contacts" ON contacts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin full access to contacts" ON contacts
    FOR ALL USING (true);

-- 6. Testar inserção
INSERT INTO contacts (name, email, message) 
VALUES ('Teste Correção', 'teste@correção.com', 'Teste após correção')
RETURNING id, name, email, created_at;

-- 7. Verificar dados
SELECT COUNT(*) as total_contacts FROM contacts;

-- 8. Mostrar últimos registros
SELECT 
    id, 
    name, 
    email, 
    phone, 
    company, 
    service_type, 
    status,
    created_at 
FROM contacts 
ORDER BY created_at DESC 
LIMIT 5;

RAISE NOTICE 'Correção da tabela contacts concluída!';
