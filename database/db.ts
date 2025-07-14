import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('gtechcontrol.db');

export const inserirProduto = (nome: string, preco: number) => {
  try {
    db.execSync(
      `INSERT INTO produtos (nome, preco) VALUES ('${nome}', ${preco});`
    );
    console.log('✅ Produto inserido com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inserir produto:', error);
  }
};

export const listarProdutos = (): { id: number; nome: string; preco: number }[] => {
  try {
    const results = db.getAllSync(`SELECT * FROM produtos`);
    return results as { id: number; nome: string; preco: number }[];
  } catch (error) {
    console.error('❌ Erro ao listar produtos:', error);
    return [];
  }
};

export const editarProduto = (id: number, nome: string, preco: number) => {
  try {
    db.runSync(
      `UPDATE produtos SET nome = ?, preco = ? WHERE id = ?`,
      [nome, preco, id]
    );
    console.log('✏️ Produto editado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao editar produto:', error);
  }
};

export const excluirProduto = (id: number) => {
  try {
    db.execSync(
      `DELETE from produtos WHERE id = ${id};`,
    );
    console.log('✏️ Produto excluido com sucesso!');    
  } catch (error) {
    console.error('❌ Erro ao excluir produto:', error);
  }
}

export default db;
