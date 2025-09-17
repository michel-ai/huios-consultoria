-- Atualizar informações de contato da empresa

UPDATE site_settings 
SET value = '{
    "phone": "(91) 9860-66544",
    "email": "huiosconsutoria@gmail.com",
    "address": "Belém, Pará, Brasil",
    "business_hours": "Segunda a Sexta: 8h às 18h"
}'
WHERE key = 'contact_info';

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
