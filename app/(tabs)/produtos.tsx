import { View, Text, FlatList, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { setupDatabase } from '@/database/setup';
import { listarProdutos, inserirProduto } from '@/database/db';

export default function ProdutosScreen() {
  const [produtos, setProdutos] = useState<{ id: number; nome: string; preco: number }[]>([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');

  useEffect(() => {
    setupDatabase();
    carregarProdutos();
  }, []);

  const carregarProdutos = () => {
    const produtosDoBanco = listarProdutos();
    setProdutos(produtosDoBanco);
  };

  const adicionarProduto = () => {
    if (!nome || !preco) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const precoFormatado = parseFloat(preco.replace(',', '.'));
    if (isNaN(precoFormatado)) {
      Alert.alert('Erro', 'Preço inválido.');
      return;
    }

    inserirProduto(nome, precoFormatado);
    setNome('');
    setPreco('');
    carregarProdutos();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Produtos</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        keyboardType="numeric"
        value={preco}
        onChangeText={setPreco}
      />
      <Button title="Adicionar Produto" onPress={adicionarProduto} />

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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
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
