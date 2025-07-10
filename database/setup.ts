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
}
