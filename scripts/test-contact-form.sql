-- Script para testar o formulário de contato
-- Inserir um contato de teste

INSERT INTO contacts (
  name,
  email,
  phone,
  company,
  service_type,
  message,
  status
)
VALUES (
  'Usuário de Teste',
  'teste@exemplo.com',
  '(91) 99999-9999',
  'Empresa de Teste',
  'Consultoria',
  'Esta é uma mensagem de teste para verificar se o formulário de contato está funcionando corretamente.',
  'novo'
)
RETURNING id, name, email, created_at;

-- Verificar se o contato foi inserido
SELECT COUNT(*) as total_contacts FROM contacts;

-- Verificar os contatos mais recentes
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
