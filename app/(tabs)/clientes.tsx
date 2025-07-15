import { View, Text, FlatList, StyleSheet, TextInput, Button, Alert, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { setupDatabase } from '@/database/setup';
import { listarClientes, inserirCliente, editarClientes, excluirCliente } from '@/database/db';
import { Picker } from '@react-native-picker/picker';

export default function ClientesScreen() {
  const [clientes, setClientes] = useState<{ id: number; nome: string; telefone: number; email: string }[]>([]);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<{ id: number; nome: string; telefone: number; email: string } | null>(null);
  const [nomeEditado, setNomeEditado] = useState('');
  const [telefoneEditado, setTelefoneEditado] = useState('');
  const [emailEditado, setEmailEditado] = useState('');
  const [busca, setBusca] = useState('');
  const [criterioOrdenacao, setCriterioOrdenacao] = useState<'nome' | 'email'>('nome');


  useEffect(() => {
    setupDatabase();
    carregarClientes();
  }, []);

  const carregarClientes = () => {
    const clientesDoBanco = listarClientes();
    setClientes(clientesDoBanco);
  };

  const adicionarCliente = () => {
    if (!nome || !telefone || !email) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const telefoneFormatado = parseFloat(telefone.replace(',', '.'));
    if (isNaN(telefoneFormatado)) {
      Alert.alert('Erro', 'Telefone inválido.');
      return;
    }

    inserirCliente(nome, telefoneFormatado, email);
    setNome('');
    setTelefone('');
    carregarClientes();
  };

  const abrirModalEdicao = (cliente: { id: number; nome: string; telefone: number; email: string }) => {
    setClienteSelecionado(cliente);
    setNomeEditado(cliente.nome);
    setTelefoneEditado(cliente.telefone.toString());
    setEmailEditado(cliente.email);
    setModalVisible(true);
  };

  const salvarEdicao = () => {
    if (clienteSelecionado) {
      editarClientes(clienteSelecionado.id, nomeEditado, parseFloat(telefoneEditado), emailEditado);
      setModalVisible(false);
      carregarClientes(); // Atualiza lista
    }
  };

  const deletarCliente = (id: number) => {
    Alert.alert('Confirmar exclusão', 'Deseja excluir este cliente?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          excluirCliente(id);
          carregarClientes();
        },
      },
    ]);
  };
  

  
  const clientesFiltrados = clientes
  .filter((cliente) => cliente.nome.toLowerCase().includes(busca.toLowerCase()))
  .sort((a, b) => {
    if (criterioOrdenacao === 'nome') return a.nome.localeCompare(b.nome);
    return a.telefone - b.telefone;
  });

  
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Lista de Clientes</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Cliente"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        keyboardType="numeric"
        value={telefone}
        onChangeText={setTelefone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email do Cliente"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Adicionar Cliente" onPress={adicionarCliente} />

      <TextInput
        style={styles.input}
        placeholder="Buscar cliente..."
        value={busca}
        onChangeText={setBusca}
      />
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Ordenar por:</Text>

      <Picker
        selectedValue={criterioOrdenacao}
        onValueChange={(itemValue) => setCriterioOrdenacao(itemValue)}>
        <Picker.Item label="Nome" value="nome" />
        <Picker.Item label="Telefone" value="telefone" />
        <Picker.Item label="Email" value="email" />
      </Picker>
      
      <FlatList
        data={clientesFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (          
          <TouchableOpacity onPress={() => abrirModalEdicao(item)}>
            <View style={styles.item}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.telefone}>{item.telefone}</Text>
              <Text style={styles.email}>{item.email}</Text>
              <Button title="Excluir" color="red" onPress={() => deletarCliente(item.id)} />
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.titulo}>Editar Cliente</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nome do cliente"
                    value={nomeEditado}
                    onChangeText={setNomeEditado}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Telefone"
                    value={telefoneEditado}
                    onChangeText={setTelefoneEditado}
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Email do cliente"
                    value={emailEditado}
                    onChangeText={setEmailEditado}
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
  telefone: {
    fontSize: 14,
    color: '#444',
  },
  email: {
    fontSize: 16,
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
