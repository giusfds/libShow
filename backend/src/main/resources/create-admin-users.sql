-- Script para criar usuários administrativos
-- Senha padrão: "admin123" (criptografada com BCrypt)
-- Hash BCrypt para "admin123": $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

-- Inserir usuário ADMIN
INSERT INTO users (name, email, password, role) 
VALUES ('Administrador', 'admin@libshow.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ADMIN')
ON DUPLICATE KEY UPDATE name=name;

-- Inserir usuário LIBRARIAN
INSERT INTO users (name, email, password, role) 
VALUES ('Bibliotecário', 'bibliotecario@libshow.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'LIBRARIAN')
ON DUPLICATE KEY UPDATE name=name;
