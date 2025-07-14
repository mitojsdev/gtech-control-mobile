import db from './db';

export function setupDatabase() {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL NOT NULL
    );
  `).then(() => {
    console.log('Tabela "produtos" criada com sucesso!');
  }).catch((error) => {
    console.error('Erro ao criar a tabela:', error);
  });

  db.execAsync(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT,
      email TEXT
    );
  `)
    .then(() => {
      console.log('Tabela "clientes" criada com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao criar a tabela "clientes":', error);
    });

    db.execAsync(`
      CREATE TABLE IF NOT EXISTS vendas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER NOT NULL,
        produto_id INTEGER NOT NULL,
        quantidade INTEGER NOT NULL,
        total REAL NOT NULL,
        data TEXT NOT NULL,
        FOREIGN KEY (cliente_id) REFERENCES clientes(id),
        FOREIGN KEY (produto_id) REFERENCES produtos(id)
      );
    `).then(() => {
      console.log('Tabela "vendas" criada com sucesso!');
    }).catch((error) => {
      console.error('Erro ao criar a tabela de vendas:', error);
    });
      
}
