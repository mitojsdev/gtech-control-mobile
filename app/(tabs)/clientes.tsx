import { View, Text, FlatList, StyleSheet } from 'react-native';

const clientes = [
  { id: '1', nome: 'João da Silva', telefone: '(11) 91234-5678' },
  { id: '2', nome: 'Maria Oliveira', telefone: '(21) 99876-5432' },
  { id: '3', nome: 'Carlos Souza', telefone: '(31) 98765-4321' },
  { id: '4', nome: 'Ana Paula', telefone: '(85) 99812-3456' },
];

export default function ClientesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Clientes</Text>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.telefone}>{item.telefone}</Text>
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
  telefone: {
    fontSize: 14,
    color: '#444',
  },
});
