-- Inserção de dados iniciais para Huios Consultoria

-- Inserir categorias de projetos
INSERT INTO project_categories (name, slug, icon, color) VALUES
('Saúde', 'saude', '🏥', '#ff4757'),
('Logística', 'logistica', '🚚', '#3742fa'),
('Indústria', 'industria', '🏭', '#ff6b35'),
('Varejo', 'varejo', '🛍️', '#2ed573'),
('Financeiro', 'financeiro', '🏦', '#ffa502'),
('Tecnologia', 'tecnologia', '💾', '#a55eea');

-- Inserir serviços
INSERT INTO services (name, slug, description, icon, color, features, pricing) VALUES
(
    'Mikrotik',
    'mikrotik',
    'Configuração e otimização de equipamentos Mikrotik para máxima performance de rede.',
    '🔧',
    '#15ff00',
    '["Configuração de roteadores", "Balanceamento de carga", "VPN e túneis seguros", "Monitoramento de tráfego", "Otimização de performance"]',
    '{"basico": "R$ 2.500", "intermediario": "R$ 4.500", "avancado": "R$ 8.000"}'
),
(
    'Huawei',
    'huawei',
    'Implementação e manutenção de soluções Huawei para infraestrutura corporativa.',
    '📡',
    '#00c8ff',
    '["Switches empresariais", "Soluções wireless", "Equipamentos de datacenter", "Sistemas de segurança", "Suporte técnico especializado"]',
    '{"basico": "R$ 3.500", "intermediario": "R$ 6.500", "avancado": "R$ 12.000"}'
),
(
    'Datacom',
    'datacom',
    'Soluções completas Datacom para conectividade e comunicação empresarial.',
    '💻',
    '#ff5500',
    '["Roteadores de alta performance", "Switches gerenciáveis", "Soluções de conectividade", "Equipamentos carrier grade", "Consultoria técnica"]',
    '{"basico": "R$ 3.000", "intermediario": "R$ 5.500", "avancado": "R$ 10.000"}'
),
(
    'Monitoramentos',
    'monitoramentos',
    'Sistemas avançados de monitoramento para garantir a disponibilidade da sua infraestrutura.',
    '📊',
    '#ff00c8',
    '["Monitoramento 24/7", "Alertas em tempo real", "Dashboards personalizados", "Relatórios detalhados", "Análise de performance"]',
    '{"basico": "R$ 2.000", "intermediario": "R$ 4.000", "avancado": "R$ 7.500"}'
),
(
    'Automações',
    'automacoes',
    'Automação de processos e sistemas para aumentar a eficiência operacional.',
    '⚙️',
    '#ffaa00',
    '["Scripts personalizados", "Automação de backups", "Provisionamento automático", "Integração de sistemas", "Workflows inteligentes"]',
    '{"basico": "R$ 1.800", "intermediario": "R$ 3.500", "avancado": "R$ 6.500"}'
),
(
    'Consultoria',
    'consultoria',
    'Consultoria especializada para otimização e modernização da sua infraestrutura.',
    '🎯',
    '#aa00ff',
    '["Análise de infraestrutura", "Planejamento estratégico", "Migração de sistemas", "Treinamento de equipes", "Documentação técnica"]',
    '{"basico": "R$ 2.200", "intermediario": "R$ 4.200", "avancado": "R$ 8.500"}'
);

-- Inserir membros da equipe
INSERT INTO team_members (name, role, specialty, bio, skills, experience_years, display_order) VALUES
(
    'João Silva',
    'CEO & Fundador',
    'Gestão Estratégica',
    'Especialista em gestão estratégica com mais de 15 anos de experiência em tecnologia.',
    '["Liderança", "Estratégia", "Gestão de Projetos", "Vendas Técnicas"]',
    15,
    1
),
(
    'Maria Santos',
    'CTO',
    'Arquitetura de Sistemas',
    'Arquiteta de sistemas com expertise em cloud computing e infraestrutura corporativa.',
    '["Cloud Computing", "Arquitetura", "DevOps", "Segurança"]',
    12,
    2
),
(
    'Pedro Costa',
    'Diretor Técnico',
    'Redes e Infraestrutura',
    'Especialista em redes e infraestrutura com certificações Mikrotik, Huawei e Datacom.',
    '["Mikrotik", "Huawei", "Datacom", "Redes", "Infraestrutura"]',
    10,
    3
),
(
    'Ana Oliveira',
    'Gerente de Projetos',
    'Metodologias Ágeis',
    'Especialista em metodologias ágeis e gestão de projetos de tecnologia.',
    '["Scrum", "Kanban", "Gestão de Projetos", "Qualidade"]',
    8,
    4
);

-- Inserir projetos em destaque
INSERT INTO projects (title, slug, category_id, client_name, description, challenge, solution, technologies, results, metrics, is_featured) VALUES
(
    'Modernização Hospitalar',
    'modernizacao-hospitalar',
    (SELECT id FROM project_categories WHERE slug = 'saude'),
    'Hospital Regional de Belém',
    'Implementação completa de sistema de monitoramento 24/7 para infraestrutura crítica hospitalar, garantindo alta disponibilidade dos serviços médicos.',
    'Necessidade de monitoramento em tempo real de equipamentos críticos sem interrupção dos serviços.',
    'Sistema de monitoramento integrado com alertas automáticos e dashboards personalizados.',
    '["Zabbix", "SNMP", "Grafana", "Python", "MySQL"]',
    '["99.9% de uptime dos sistemas críticos", "Redução de 95% no tempo de resposta a incidentes", "Monitoramento de 500+ dispositivos em tempo real", "Economia de 40% nos custos de manutenção"]',
    '{"duration": "6 meses", "team": "8 especialistas", "investment": "R$ 250.000", "roi": "300%"}',
    true
),
(
    'Rede Corporativa Inteligente',
    'rede-corporativa-inteligente',
    (SELECT id FROM project_categories WHERE slug = 'logistica'),
    'Grupo Logístico Amazônia',
    'Implementação de rede corporativa robusta com equipamentos Mikrotik para empresa de logística com 15 filiais distribuídas pela região Norte.',
    'Conectividade instável entre filiais e baixa performance da rede corporativa.',
    'Rede SD-WAN com balanceamento de carga e redundância em todas as conexões.',
    '["Mikrotik", "SD-WAN", "MPLS", "VPN", "QoS"]',
    '["Aumento de 400% na velocidade da rede", "Redução de 90% nos problemas de conectividade", "Conectividade redundante em 100% das filiais", "ROI de 250% em 18 meses"]',
    '{"duration": "4 meses", "team": "6 especialistas", "investment": "R$ 180.000", "roi": "250%"}',
    true
),
(
    'Automação Industrial 4.0',
    'automacao-industrial-40',
    (SELECT id FROM project_categories WHERE slug = 'industria'),
    'Indústria Alimentícia do Pará',
    'Implementação de solução IoT industrial completa com automação de processos e monitoramento em tempo real da linha de produção.',
    'Baixa eficiência produtiva e alto índice de paradas não programadas.',
    'Sistema IoT integrado com sensores inteligentes e automação de processos críticos.',
    '["IoT", "Python", "MQTT", "Node-RED", "InfluxDB"]',
    '["Aumento de 35% na eficiência produtiva", "Redução de 60% em paradas não programadas", "Economia de 30% nos custos operacionais", "Predição de falhas com 90% de precisão"]',
    '{"duration": "8 meses", "team": "10 especialistas", "investment": "R$ 320.000", "roi": "280%"}',
    true
);

-- Inserir depoimentos
INSERT INTO testimonials (client_name, client_role, client_company, client_avatar, rating, testimonial_text, project_name) VALUES
(
    'Dr. Carlos Mendes',
    'Diretor de TI',
    'Hospital Regional',
    'CM',
    5,
    'A Huios transformou completamente nossa infraestrutura hospitalar. O sistema de monitoramento implementado por eles já evitou várias situações críticas. Profissionalismo excepcional!',
    'Modernização Hospitalar'
),
(
    'Ana Paula Silva',
    'CTO',
    'Grupo Logístico Amazônia',
    'AS',
    5,
    'A nova rede corporativa aumentou nossa produtividade em 400%. A equipe da Huios é altamente qualificada e entregou o projeto no prazo estabelecido.',
    'Rede Corporativa Inteligente'
),
(
    'Roberto Santos',
    'Gerente de Produção',
    'Indústria Alimentícia',
    'RS',
    5,
    'A automação implementada revolucionou nossa produção. Conseguimos prever falhas antes que aconteçam e nossa eficiência aumentou significativamente.',
    'Automação Industrial 4.0'
);

-- Inserir configurações do site
INSERT INTO site_settings (key, value, description) VALUES
(
    'company_info',
    '{
        "name": "Huios Consultoria",
        "tagline": "Transformando empresas através da tecnologia",
        "description": "Especialistas em soluções tecnológicas para empresas que buscam inovação e excelência",
        "founded_year": 2019,
        "location": "Belém, Pará, Brasil"
    }',
    'Informações básicas da empresa'
),
(
    'contact_info',
    '{
        "phone": "(91) 99999-9999",
        "email": "contato@huios.com.br",
        "address": "Belém, Pará, Brasil",
        "business_hours": "Segunda a Sexta: 8h às 18h"
    }',
    'Informações de contato'
),
(
    'social_media',
    '{
        "facebook": "#",
        "instagram": "#",
        "linkedin": "#",
        "twitter": "#"
    }',
    'Links das redes sociais'
),
(
    'stats',
    '{
        "projects_completed": 150,
        "active_clients": 50,
        "years_experience": 5,
        "success_rate": 98,
        "total_value_delivered": "R$ 5M+"
    }',
    'Estatísticas da empresa'
);
