import { View, Text, FlatList, StyleSheet, TextInput, Button, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { setupDatabase } from '@/database/setup';
import { listarVendas, inserirVenda, listarProdutos, listarClientes } from '@/database/db';

export default function VendasScreen() {
  const [vendas, setVendas] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);

  const [clienteSelecionado, setClienteSelecionado] = useState<number | null>(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState<number | null>(null);
  const [quantidade, setQuantidade] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [busca, setBusca] = useState('');
  const [criterioOrdenacao, setCriterioOrdenacao] = useState<'cliente' | 'produto'>('cliente');

  useEffect(() => {
    setupDatabase();
    carregarVendas();
    carregarClientes();
    carregarProdutos();
  }, []);

  const carregarVendas = async () => {
    const lista = await listarVendas();
    setVendas(lista);
  };

  const carregarClientes = async () => {
    const lista = await listarClientes();
    setClientes(lista);
  };

  const carregarProdutos = async () => {
    const lista = await listarProdutos();
    setProdutos(lista);
  };

  const adicionarVenda = async () => {
    if (!clienteSelecionado || !produtoSelecionado || !quantidade) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const qtd = parseInt(quantidade);
    if (isNaN(qtd) || qtd <= 0) {
      Alert.alert('Erro', 'Quantidade inválida.');
      return;
    }

    // Buscar o produto selecionado pra pegar o preço
    const produto = produtos.find(p => p.id === produtoSelecionado);
    if (!produto) {
      Alert.alert('Erro', 'Produto não encontrado.');
      return;
    }

  const total = produto.preco * qtd;

    await inserirVenda(clienteSelecionado, produtoSelecionado, qtd, total);
    setModalVisible(false);
    setClienteSelecionado(null);
    setProdutoSelecionado(null);
    setQuantidade('');
    carregarVendas();
  };

  const vendasFiltradas = vendas
  .filter(venda =>
    venda.nome_cliente?.toLowerCase().includes(busca.toLowerCase()) ||
    venda.nome_produto?.toLowerCase().includes(busca.toLowerCase())
  )
  .sort((a, b) => {
    if (criterioOrdenacao === 'cliente') return a.nome_cliente.localeCompare(b.nome_cliente);
    return a.nome_produto.localeCompare(b.nome_produto);
  })
  
    

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Lista de Vendas</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar venda..."
        value={busca}
        onChangeText={setBusca}
      />

      <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Ordenar por:</Text>
      <Picker
        selectedValue={criterioOrdenacao}
        onValueChange={(itemValue) => setCriterioOrdenacao(itemValue)}
      >
        <Picker.Item label="Cliente" value="cliente" />
        <Picker.Item label="Produto" value="produto" />
      </Picker>

      <FlatList
        data={vendasFiltradas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nome}>Cliente: {item.nome_cliente}</Text>
            <Text style={styles.nome}>Produto: {item.nome_produto}</Text>
            <Text style={styles.preco}>Qtd: {item.quantidade}</Text>            
            <Text style={styles.preco}>R$ {item.total.toFixed(2)}</Text>
          </View>
        )}
      />

      <Button title="Registrar Nova Venda" onPress={() => setModalVisible(true)} />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>Nova Venda</Text>

            <Text style={{ fontWeight: 'bold' }}>Cliente:</Text>
            <Picker
              selectedValue={clienteSelecionado}
              onValueChange={setClienteSelecionado}
            >
              <Picker.Item label="Selecione..." value={null} />
              {clientes.map(c => (
                <Picker.Item key={c.id} label={c.nome} value={c.id} />
              ))}
            </Picker>

            <Text style={{ fontWeight: 'bold' }}>Produto:</Text>
            <Picker
              selectedValue={produtoSelecionado}
              onValueChange={setProdutoSelecionado}
            >
              <Picker.Item label="Selecione..." value={null} />
              {produtos.map(p => (
                <Picker.Item key={p.id} label={p.nome} value={p.id} />
              ))}
            </Picker>

            <TextInput
              style={styles.input}
              placeholder="Quantidade"
              keyboardType="numeric"
              value={quantidade}
              onChangeText={setQuantidade}
            />

            <Button title="Salvar" onPress={adicionarVenda} />
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
