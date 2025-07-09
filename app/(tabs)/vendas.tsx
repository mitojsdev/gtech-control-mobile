import { View, Text, FlatList, StyleSheet } from 'react-native';

const vendas = [
  { id: '1', cliente: 'João da Silva', produto: 'Garrafa Térmica', valor: 'R$ 120,00' },
  { id: '2', cliente: 'Maria Oliveira', produto: 'Copo Stanley', valor: 'R$ 90,00' },
  { id: '3', cliente: 'Carlos Souza', produto: 'Capinha iPhone 14', valor: 'R$ 60,00' },
  { id: '4', cliente: 'Ana Paula', produto: 'Fone Bluetooth', valor: 'R$ 150,00' },
];

export default function VendasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico de Vendas</Text>
      <FlatList
        data={vendas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.cliente}>{item.cliente}</Text>
            <Text style={styles.produto}>{item.produto}</Text>
            <Text style={styles.valor}>{item.valor}</Text>
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
    backgroundColor: '#e9e9e9',
  },
  cliente: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  produto: {
    fontSize: 14,
  },
  valor: {
    fontSize: 14,
    color: '#008000',
  },
});
