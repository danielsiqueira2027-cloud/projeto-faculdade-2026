import dotenv from 'dotenv';
import path from 'node:path';
import { Pool } from 'pg';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

interface DemoPro {
  name: string;
  email: string;
  phone: string;
  specialty: string;
  categorySlug: string;
  bio: string;
  rating: number;
  reviewCount: number;
  location: string;
  addressStreet: string;
  addressNumber: string;
  addressNeighborhood: string;
  addressCity: string;
  addressState: string;
  addressCep: string;
  cpf: string;
  avatarUrl: string;
  services?: {
    title: string;
    priceText: string;
    priceValue: number;
    duration: string;
    description: string;
  }[];
}

const DEMO_PROFESSIONALS: DemoPro[] = [
  {
    name: 'Carlos Mendes',
    email: 'carlos.mendes.demo@clickservico.com.br',
    phone: '(19) 98765-4321',
    specialty: 'Eletricista Residencial e Predial',
    categorySlug: 'eletricista',
    bio: 'Mais de 10 anos de experiência em instalações elétricas, quadros de distribuição, padrão CPFL e automação residencial com segurança e laudo técnico.',
    rating: 4.9,
    reviewCount: 18,
    location: 'Campinas - SP',
    addressStreet: 'Av. Francisco Glicério',
    addressNumber: '1240',
    addressNeighborhood: 'Centro',
    addressCity: 'Campinas',
    addressState: 'SP',
    addressCep: '13012-100',
    cpf: '111.222.333-44',
    avatarUrl: '/imgs/profissionais/trabalhadores.png',
    services: [
      {
        title: 'Troca e Manutenção de Quadro de Distribuição',
        priceText: 'A partir de R$ 350',
        priceValue: 350.00,
        duration: '3 horas',
        description: 'Revisão completa de disjuntores, barramentos, DPS e IDR contra choques elétricos.',
      },
      {
        title: 'Instalação de Luminárias, Spots e Fitas LED',
        priceText: 'A partir de R$ 90',
        priceValue: 90.00,
        duration: '1 hora',
        description: 'Instalação segura com acabamento impecável em gesso ou alvenaria.',
      }
    ]
  },
  {
    name: 'Rodrigo Silveira',
    email: 'rodrigo.silveira.demo@clickservico.com.br',
    phone: '(19) 98123-4567',
    specialty: 'Encanador e Caça-Vazamentos',
    categorySlug: 'encanador',
    bio: 'Técnico em sistemas hidráulicos, caça-vazamentos não destrutivo com geofone digital, reparos em canos de PVC, PPR, cobre e válvulas.',
    rating: 4.8,
    reviewCount: 14,
    location: "Santa Bárbara d'Oeste - SP",
    addressStreet: 'Rua Dona Margarida',
    addressNumber: '350',
    addressNeighborhood: 'Vila Linópolis',
    addressCity: "Santa Bárbara d'Oeste",
    addressState: 'SP',
    addressCep: '13450-025',
    cpf: '222.333.444-55',
    avatarUrl: '/imgs/profissionais/trabalhadores.png',
    services: [
      {
        title: 'Localização de Vazamentos Ocultos (Geofone)',
        priceText: 'A partir de R$ 250',
        priceValue: 250.00,
        duration: '2 horas',
        description: 'Detecção de infiltrações em pisos e paredes sem quebrar nada antes do diagnóstico exato.',
      },
      {
        title: 'Troca de Válvula Hydra e Registros Gerais',
        priceText: 'R$ 130 fixo',
        priceValue: 130.00,
        duration: '1 hora',
        description: 'Reparo ou substituição de reparos internos com peças originais e garantia.',
      }
    ]
  },
  {
    name: 'Marcos Antônio Lima',
    email: 'marcos.pintor.demo@clickservico.com.br',
    phone: '(19) 99234-5678',
    specialty: 'Pintor Profissional e Efeitos Decorativos',
    categorySlug: 'pintor',
    bio: 'Pintura residencial e comercial de alto padrão. Aplicação de cimento queimado, marmorato, grafiato e textura projetada. Cuidado total com pisos e móveis.',
    rating: 5.0,
    reviewCount: 22,
    location: 'Americana - SP',
    addressStreet: 'Rua Rui Barbosa',
    addressNumber: '580',
    addressNeighborhood: 'Santa Catarina',
    addressCity: 'Americana',
    addressState: 'SP',
    addressCep: '13466-300',
    cpf: '333.444.555-66',
    avatarUrl: '/imgs/profissionais/trabalhadores.png',
    services: [
      {
        title: 'Pintura Residencial Interna (por m²)',
        priceText: 'R$ 28/m²',
        priceValue: 28.00,
        duration: 'Sob consulta',
        description: 'Lixamento com aspirador, aplicação de fundo preparador e 2 demãos de tinta acrílica premium.',
      }
    ]
  },
  {
    name: 'Juliana Freitas',
    email: 'juliana.marcenaria.demo@clickservico.com.br',
    phone: '(19) 97345-6789',
    specialty: 'Carpinteira e Restauração de Madeira',
    categorySlug: 'carpinteiro',
    bio: 'Especialista em coberturas de madeira, decks de piscina, pergolados e restauração de portas e móveis maciços. Acabamentos em verniz marítimo e stain.',
    rating: 4.9,
    reviewCount: 11,
    location: 'Piracicaba - SP',
    addressStreet: 'Av. Independência',
    addressNumber: '890',
    addressNeighborhood: 'São Judas',
    addressCity: 'Piracicaba',
    addressState: 'SP',
    addressCep: '13416-240',
    cpf: '444.555.666-77',
    avatarUrl: '/imgs/profissionais/trabalhadores.png',
  },
  {
    name: 'Felipe Albuquerque',
    email: 'felipe.pedreiro.demo@clickservico.com.br',
    phone: '(19) 99456-7890',
    specialty: 'Mestre de Obras e Assentamento de Porcelanato',
    categorySlug: 'pedreiro',
    bio: 'Construção civil do alicerce à entrega das chaves. Especialista em reformas de banheiros, cozinhas, alvenaria estrutural e pisos em grandes formatos.',
    rating: 4.7,
    reviewCount: 29,
    location: 'Sumaré - SP',
    addressStreet: 'Rua Dom Barreto',
    addressNumber: '410',
    addressNeighborhood: 'Centro',
    addressCity: 'Sumaré',
    addressState: 'SP',
    addressCep: '13170-011',
    cpf: '555.666.777-88',
    avatarUrl: '/imgs/profissionais/trabalhadores.png',
  },
];

async function seedDemo() {
  console.log('🌱 Iniciando Seed Demo do ClickServiço...');
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 15000,
  });

  const client = await pool.connect();

  try {
    // 1. Obter mapa de categorias do banco
    const catRes = await client.query('SELECT id, slug FROM categories;');
    const catMap = new Map<string, string>();
    catRes.rows.forEach(r => catMap.set(r.slug, r.id));

    // 2. Obter clientes de teste existentes
    const clientRes = await client.query(`
      SELECT c.id as client_id, u.name 
      FROM clients c 
      JOIN users u ON u.id = c.user_id 
      ORDER BY c.created_at ASC;
    `);

    if (clientRes.rows.length === 0) {
      throw new Error('Nenhum cliente existente no banco para vincular as ordens.');
    }
    const client1 = clientRes.rows[0];
    const client2 = clientRes.rows[1] || clientRes.rows[0];
    console.log(`👤 Clientes de teste encontrados: ${client1.name} e ${client2.name}`);

    const createdProIds: { name: string; proId: string; catId: string; serviceId?: string }[] = [];

    // 3. Cadastrar os 5 profissionais (Idempotente)
    for (const pro of DEMO_PROFESSIONALS) {
      const catId = catMap.get(pro.categorySlug);
      if (!catId) {
        console.warn(`⚠️ Categoria "${pro.categorySlug}" não encontrada no banco. Pulando.`);
        continue;
      }

      // 3.1. Upsert em users (tabela pública, sem chamar Supabase Auth)
      let userId: string;
      const userExists = await client.query('SELECT id FROM users WHERE email = $1;', [pro.email]);
      if (userExists.rows.length > 0) {
        userId = userExists.rows[0].id;
        await client.query(`
          UPDATE users 
          SET name = $1, phone = $2, avatar_url = $3, updated_at = NOW() 
          WHERE id = $4;
        `, [pro.name, pro.phone, pro.avatarUrl, userId]);
      } else {
        const userInsert = await client.query(`
          INSERT INTO users (id, name, email, phone, avatar_url, is_active, created_at, updated_at)
          VALUES (gen_random_uuid(), $1, $2, $3, $4, true, NOW(), NOW())
          RETURNING id;
        `, [pro.name, pro.email, pro.phone, pro.avatarUrl]);
        userId = userInsert.rows[0].id;
      }

      // 3.2. Upsert em professionals
      let proId: string;
      const proExists = await client.query('SELECT id FROM professionals WHERE user_id = $1;', [userId]);
      if (proExists.rows.length > 0) {
        proId = proExists.rows[0].id;
        await client.query(`
          UPDATE professionals
          SET specialty = $1, bio = $2, phone = $3, location = $4,
              address_street = $5, address_number = $6, address_neighborhood = $7,
              address_city = $8, address_state = $9, address_cep = $10,
              cpf = $11, is_verified = true, is_available = true,
              rating = $12, review_count = $13, updated_at = NOW()
          WHERE id = $14;
        `, [
          pro.specialty, pro.bio, pro.phone, pro.location,
          pro.addressStreet, pro.addressNumber, pro.addressNeighborhood,
          pro.addressCity, pro.addressState, pro.addressCep,
          pro.cpf, pro.rating, pro.reviewCount, proId
        ]);
      } else {
        const proInsert = await client.query(`
          INSERT INTO professionals (
            id, user_id, specialty, bio, phone, location,
            address_street, address_number, address_neighborhood,
            address_city, address_state, address_cep,
            cpf, is_verified, is_available, rating, review_count, created_at, updated_at
          )
          VALUES (
            gen_random_uuid(), $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10, $11,
            $12, true, true, $13, $14, NOW(), NOW()
          )
          RETURNING id;
        `, [
          userId, pro.specialty, pro.bio, pro.phone, pro.location,
          pro.addressStreet, pro.addressNumber, pro.addressNeighborhood,
          pro.addressCity, pro.addressState, pro.addressCep,
          pro.cpf, pro.rating, pro.reviewCount
        ]);
        proId = proInsert.rows[0].id;
      }

      // 3.3. Vínculo em professional_categories (N:N)
      await client.query(`
        INSERT INTO professional_categories (professional_id, category_id)
        VALUES ($1, $2)
        ON CONFLICT (professional_id, category_id) DO NOTHING;
      `, [proId, catId]);

      // 3.4. Cadastrar serviços vinculados (se especificado)
      let primaryServiceId: string | undefined;
      if (pro.services && pro.services.length > 0) {
        for (const svc of pro.services) {
          const svcExists = await client.query(
            'SELECT id FROM services WHERE professional_id = $1 AND title = $2;',
            [proId, svc.title]
          );

          if (svcExists.rows.length > 0) {
            primaryServiceId = svcExists.rows[0].id;
            await client.query(`
              UPDATE services
              SET price_text = $1, price_value = $2, duration = $3, description = $4, status = 'ativo', updated_at = NOW()
              WHERE id = $5;
            `, [svc.priceText, svc.priceValue, svc.duration, svc.description, primaryServiceId]);
          } else {
            const svcInsert = await client.query(`
              INSERT INTO services (
                id, professional_id, category_id, title, price_text, price_value, duration, description, status, created_at, updated_at
              )
              VALUES (
                gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, 'ativo', NOW(), NOW()
              )
              RETURNING id;
            `, [proId, catId, svc.title, svc.priceText, svc.priceValue, svc.duration, svc.description]);
            primaryServiceId = svcInsert.rows[0].id;
          }
        }
      }

      createdProIds.push({ name: pro.name, proId, catId, serviceId: primaryServiceId });
      console.log(`✅ Profissional configurado: ${pro.name} (${pro.specialty})`);
    }

    // 4. Criar as 2 Ordens de Teste (Idempotente)
    console.log('\n📦 Verificando/Criando 2 ordens de serviço para testes...');
    
    // Ordem 1: Concluída (com Carlos Mendes)
    const pro1 = createdProIds[0];
    const existingOrder1 = await client.query(`
      SELECT id FROM orders 
      WHERE client_id = $1 AND professional_id = $2 AND status = 'CONCLUIDO';
    `, [client1.client_id, pro1.proId]);

    if (existingOrder1.rows.length === 0) {
      await client.query(`
        INSERT INTO orders (
          id, client_id, professional_id, service_id, category_id, status,
          service_type, description, location_cep, address, urgency,
          period, agreed_price, scheduled_at, created_at, updated_at
        )
        VALUES (
          gen_random_uuid(), $1, $2, $3, $4, 'CONCLUIDO',
          'Instalação de Tomadas e Manutenção Elétrica',
          'Revisão geral do quadro e instalação de 6 luminárias de embutir na sala e cozinha.',
          '13450-000', 'Rua das Flores, 120 - Centro, Santa Bárbara d''Oeste - SP', 'Sem pressa',
          'Manhã', 450.00, NOW() - INTERVAL '5 days', NOW() - INTERVAL '7 days', NOW() - INTERVAL '4 days'
        );
      `, [client1.client_id, pro1.proId, pro1.serviceId || null, pro1.catId]);
      console.log('✅ Ordem 1 (CONCLUIDO) criada com sucesso.');
    } else {
      console.log('ℹ️ Ordem 1 (CONCLUIDO) já existe.');
    }

    // Ordem 2: Em Andamento (com Rodrigo Silveira)
    const pro2 = createdProIds[1];
    const existingOrder2 = await client.query(`
      SELECT id FROM orders 
      WHERE client_id = $1 AND professional_id = $2 AND status = 'EM_ANDAMENTO';
    `, [client2.client_id, pro2.proId]);

    if (existingOrder2.rows.length === 0) {
      await client.query(`
        INSERT INTO orders (
          id, client_id, professional_id, service_id, category_id, status,
          service_type, description, location_cep, address, urgency,
          period, agreed_price, scheduled_at, created_at, updated_at
        )
        VALUES (
          gen_random_uuid(), $1, $2, $3, $4, 'EM_ANDAMENTO',
          'Localização de Vazamento Oculto',
          'Infiltração na parede do banheiro principal, piso apresentando umidade constante no rodapé.',
          '13466-000', 'Av. Brasil, 450, Apto 32 - Americana - SP', 'Urgente',
          'Tarde', 280.00, NOW() + INTERVAL '1 day', NOW() - INTERVAL '1 day', NOW()
        );
      `, [client2.client_id, pro2.proId, pro2.serviceId || null, pro2.catId]);
      console.log('✅ Ordem 2 (EM_ANDAMENTO) criada com sucesso.');
    } else {
      console.log('ℹ️ Ordem 2 (EM_ANDAMENTO) já existe.');
    }

    console.log('\n🎉 Seed de Demonstração concluído com sucesso!');
  } finally {
    client.release();
    await pool.end();
  }
}

seedDemo().catch((err) => {
  console.error('❌ Erro no seed demo:', err);
  process.exit(1);
});
