import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { setupDatabase } from '@/database/setup';
import { listarProdutos } from '@/database/db';

export default function ProdutosScreen() {
  const [produtos, setProdutos] = useState<{ id: number; nome: string; preco: number }[]>([]);

  useEffect(() => {
    setupDatabase();
    const produtosDoBanco = listarProdutos();
    setProdutos(produtosDoBanco);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Produtos</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

// 👇 define os estilos fora do componente, DEPOIS do export
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  nome: {
    fontSize: 16,
  },
  preco: {
    fontSize: 14,
    color: '#444',
  },
});
