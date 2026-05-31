USE dbdev_clickservico;
INSERT IGNORE INTO categories (id, name, slug, created_at) VALUES
  (UUID(), 'Encanador', 'encanador', NOW()),
  (UUID(), 'Pintor', 'pintor', NOW()),
  (UUID(), 'Eletricista', 'eletricista', NOW()),
  (UUID(), 'Pedreiro', 'pedreiro', NOW()),
  (UUID(), 'Carpinteiro', 'carpinteiro', NOW()),
  (UUID(), 'Vidraceiro', 'vidraceiro', NOW()),
  (UUID(), 'Gesseiro', 'gesseiro', NOW()),
  (UUID(), 'Azulejista', 'azulejista', NOW()),
  (UUID(), 'Serralheiro', 'serralheiro', NOW());
