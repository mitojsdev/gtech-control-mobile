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

// INSERIR VENDA
export const inserirVenda = (
  clienteId: number,
  produtoId: number,
  quantidade: number,
  total: number
) => {
  const data = new Date().toISOString(); // Formato ISO, tipo: 2025-07-14T18:30:00.000Z
  try {
    db.execSync(`
      INSERT INTO vendas (cliente_id, produto_id, quantidade, total, data)
      VALUES (${clienteId}, ${produtoId}, ${quantidade}, ${total}, '${data}');
    `);
    console.log('✅ Venda inserida com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inserir venda:', error);
  }
};

// LISTAR VENDAS (opcionalmente com JOIN pra mostrar nomes)
export const listarVendas = () => {
  try {
    const result = db.getAllSync(`
      SELECT
        v.id,
        v.cliente_id,
        c.nome AS nome_cliente,
        v.produto_id,
        p.nome AS nome_produto,
        v.quantidade,
        v.total,
        v.data
      FROM vendas v
      JOIN clientes c ON c.id = v.cliente_id
      JOIN produtos p ON p.id = v.produto_id
      ORDER BY v.data DESC;
    `);

    return result;
  } catch (error) {
    console.error('❌ Erro ao listar vendas:', error);
    return [];
  }
};



export default db;
