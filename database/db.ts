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


export const inserirCliente = (nome: string, telefone: number, email: string) => {
  try {
    db.execSync(
      `INSERT INTO clientes (nome, telefone, email) VALUES ('${nome}', ${telefone}, '${email}');`
    );
    console.log('✅ Cliente inserido com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inserir cliente:', error);
  }
};

export const listarClientes = (): { id: number; nome: string; telefone: number ; email: string}[] => {
  try {
    const results = db.getAllSync(`SELECT * FROM clientes`);
    return results as { id: number; nome: string; telefone: number; email: string} [];
  } catch (error) {
    console.error('❌ Erro ao listar clientes:', error);
    return [];
  }
};

export const editarClientes = (id: number, nome: string, telefone: number, email: string) => {
  try {
    db.runSync(
      `UPDATE clientes SET nome = ?, telefone = ?, email = ? WHERE id = ?`,
      [nome, telefone, email, id]
    );
    console.log('✏️ Cliente editado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao editar cliente:', error);
  }
};

export const excluirCliente = (id: number) => {
  try {
    db.execSync(
      `DELETE from clientes WHERE id = ${id};`,
    );
    console.log('✏️ Cliente excluido com sucesso!');    
  } catch (error) {
    console.error('❌ Erro ao excluir cliente:', error);
  }
}


export default db;
