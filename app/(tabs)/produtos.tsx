import { View, Text, FlatList, StyleSheet, TextInput, Button, Alert, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { setupDatabase } from '@/database/setup';
import { listarProdutos, inserirProduto, editarProduto, excluirProduto } from '@/database/db';
import { Picker } from '@react-native-picker/picker';

export default function ProdutosScreen() {
  const [produtos, setProdutos] = useState<{ id: number; nome: string; preco: number }[]>([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<{ id: number; nome: string; preco: number } | null>(null);
  const [nomeEditado, setNomeEditado] = useState('');
  const [precoEditado, setPrecoEditado] = useState('');
  const [busca, setBusca] = useState('');
  const [criterioOrdenacao, setCriterioOrdenacao] = useState<'nome' | 'preco'>('nome');


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

  const abrirModalEdicao = (produto: { id: number; nome: string; preco: number }) => {
    setProdutoSelecionado(produto);
    setNomeEditado(produto.nome);
    setPrecoEditado(produto.preco.toString());
    setModalVisible(true);
  };

  const salvarEdicao = () => {
    if (produtoSelecionado) {
      editarProduto(produtoSelecionado.id, nomeEditado, parseFloat(precoEditado));
      setModalVisible(false);
      carregarProdutos(); // Atualiza lista
    }
  };

  const deletarProduto = (id: number) => {
    Alert.alert('Confirmar exclusão', 'Deseja excluir este produto?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          excluirProduto(id);
          carregarProdutos();
        },
      },
    ]);
  };
  

  
  const produtosFiltrados = produtos
  .filter((produto) => 
    produto.nome?.toLowerCase().includes(busca.toLowerCase())
  )
  .sort((a, b) => {
    if (criterioOrdenacao === 'nome') return a.nome.localeCompare(b.nome);
    return a.preco - b.preco;
  });

  
  

  return (
    <SafeAreaView style={styles.container}>
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

      <TextInput
        style={styles.input}
        placeholder="Buscar produto..."
        value={busca}
        onChangeText={setBusca}
      />
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Ordenar por:</Text>

      <Picker
        selectedValue={criterioOrdenacao}
        onValueChange={(itemValue) => setCriterioOrdenacao(itemValue)}>
        <Picker.Item label="Nome" value="nome" />
        <Picker.Item label="Preço" value="preco" />
      </Picker>

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (          
          <TouchableOpacity onPress={() => abrirModalEdicao(item)}>
            <View style={styles.item}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
              <Button title="Excluir" color="red" onPress={() => deletarProduto(item.id)} />
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.titulo}>Editar Produto</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nome do produto"
                    value={nomeEditado}
                    onChangeText={setNomeEditado}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Preço"
                    value={precoEditado}
                    onChangeText={setPrecoEditado}
                    keyboardType="numeric"
                  />
                  <Button title="Salvar" onPress={salvarEdicao} />
                  <Button title="Cancelar" color="red" onPress={() => setModalVisible(false)} />
                </View>
              </View>
            </Modal>
    </SafeAreaView>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
});
