-- Verificar e criar tabelas necessárias antes de atualizar informações

-- Verificar se a tabela site_settings existe e criar se não existir
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'site_settings') THEN
        CREATE TABLE site_settings (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            key VARCHAR(255) UNIQUE NOT NULL,
            value JSONB,
            description TEXT,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        RAISE NOTICE 'Tabela site_settings criada com sucesso!';
    ELSE
        RAISE NOTICE 'Tabela site_settings já existe.';
    END IF;
END
$$;

-- Verificar se a tabela contacts existe e criar se não existir
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'contacts') THEN
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
SELECT 'Configuração inicial concluída com sucesso!' as resultado;
