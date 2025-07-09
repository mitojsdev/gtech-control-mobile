import { View, Text, FlatList, StyleSheet } from 'react-native';

const produtos = [
  { id: '1', nome: 'Fone de Ouvido Bluetooth', preco: 99.90 },
  { id: '2', nome: 'Capa para Celular', preco: 19.90 },
  { id: '3', nome: 'Carregador Turbo', preco: 49.90 },
  { id: '4', nome: 'Smartphone Android', preco: 1299.90 },
  { id: '5', nome: 'Suporte Veicular para Versa', preco: 26.00 },
];

export default function ProdutosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Produtos</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
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
