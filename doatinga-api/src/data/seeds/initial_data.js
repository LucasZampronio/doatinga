/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deleta dados existentes em ordem reversa de dependência
  await knex('institution_opening_days').del();
  await knex('donations').del();
  await knex('donation_types').del();
  await knex('institutions').del();
  await knex('users').del();

  // Insere Usuário
  const [user] = await knex('users').insert({
    name: 'Admin Doatinga',
    email: 'admin@doatinga.com',
    password: 'password123',
    is_active: true
  }).returning('id');

  // Insere Instituições com coordenadas reais em POA/Restinga
  const institutionsData = [
    {
      name: 'TESTE abrigo da sopa',
      cnpj: '12345678000199',
      street: 'Av. Senador Salgado Filho',
      number: '123',
      neighborhood: 'Restinga',
      city: 'Porto Alegre',
      state: 'RS',
      zip_code: '91790000',
      latitude: -30.1579,
      longitude: -51.1418,
      user: user.id
    },
    {
      name: 'Hospital São José',
      cnpj: '98765432000188',
      street: 'Rua das Flores',
      number: '456',
      neighborhood: 'Centro',
      city: 'Porto Alegre',
      state: 'RS',
      zip_code: '90000000',
      latitude: -30.1550,
      longitude: -51.1500,
      user: user.id
    },
    {
      name: 'CRAS Restinga',
      cnpj: '11223344000177',
      street: 'Av. Economista Nilo Wulff',
      number: 's/n',
      neighborhood: 'Restinga',
      city: 'Porto Alegre',
      state: 'RS',
      zip_code: '91790000',
      latitude: -30.1520,
      longitude: -51.1350,
      user: user.id
    },
    {
       name: 'Unidade de Saúde Restinga',
       cnpj: '55667788000166',
       street: 'Av. João Antônio da Silveira',
       number: '2000',
       neighborhood: 'Restinga',
       city: 'Porto Alegre',
       state: 'RS',
       zip_code: '91790000',
       latitude: -30.1650,
       longitude: -51.1450,
       user: user.id
    }
  ];

  const institutionIds = [];
  for (const inst of institutionsData) {
      const [inserted] = await knex('institutions').insert(inst).returning('id');
      institutionIds.push(inserted.id);
  }

  // Insere Tipos de Doação
  const types = ['Brinquedos', 'Caminha', 'Roupas', 'Móveis', 'Itens Higiene', 'Ração', 'Utensílios Dom.', 'Água', 'Alimentos'];
  const typeIds = {};
  for (const t of types) {
    const [inserted] = await knex('donation_types').insert({ type: t }).returning('id');
    typeIds[t] = inserted.id;
  }

  // Itens com imagens reais (vinculados a diferentes instituições)
  const items = [
    { 
        name: 'Carrinho de brinquedo', 
        type: 'Brinquedos', 
        image: '/donations/truck.png', 
        needed: true, 
        available: false, 
        instIdx: 0,
        req: 'Apresentar certidão de nascimento da criança.'
    },
    { 
        name: 'Avião do Mickey', 
        type: 'Brinquedos', 
        image: '/donations/mickey_plane.png', 
        needed: false, 
        available: true, 
        instIdx: 1,
        req: 'Documento com foto (RG/CPF).'
    },
    { 
        name: 'Bonecos Ben 10', 
        type: 'Brinquedos', 
        image: '/donations/ben10_toys.png', 
        needed: true, 
        available: true, 
        instIdx: 2,
        req: 'Estar cadastrado no CadÚnico.'
    },
    { 
        name: 'Cobertor floral', 
        type: 'Roupas', 
        image: '/donations/floral_blanket.png', 
        needed: true, 
        available: false, 
        instIdx: 3,
        req: 'Comprovante de residência na Restinga.'
    },
    { 
        name: 'Camiseta The Used', 
        type: 'Roupas', 
        image: '/donations/skull_tshirt.png', 
        needed: false, 
        available: true, 
        instIdx: 0,
        req: 'Nenhum requisito especial.'
    },
    { 
        name: 'Escova de dentes', 
        type: 'Itens Higiene', 
        image: '/donations/toothbrush.png', 
        needed: true, 
        available: true, 
        instIdx: 1,
        req: 'Uso imediato para abrigados.'
    },
    { 
        name: 'Água mineral', 
        type: 'Água', 
        image: '/donations/water_bottle.png', 
        needed: true, 
        available: false, 
        instIdx: 2,
        req: 'Limite de 5 litros por família.'
    },
    { 
        name: 'Sofá azul', 
        type: 'Móveis', 
        image: '/donations/sofa.png', 
        needed: false, 
        available: true, 
        instIdx: 3,
        req: 'Possuir meio de transporte para retirada.'
    }
  ];

  for (const item of items) {
    await knex('donations').insert({
      name: item.name,
      institution: institutionIds[item.instIdx],
      type: typeIds[item.type],
      is_needed: item.needed,
      is_available: item.available,
      image_url: item.image,
      requirements: item.req,
      description: 'Item com imagem real e requisitos detalhados para o catálogo.'
    });
  }

  // Insere Horários de Funcionamento para todas as instituições
  const days = ['SEG', 'TER', 'QUA', 'QUI', 'SEX'];
  for (const instId of institutionIds) {
      for (const day of days) {
        await knex('institution_opening_days').insert({
          institution: instId,
          opening_day: day,
          opening_hours: '08:00:00',
          closing_hours: '18:00:00'
        });
      }
  }
};
