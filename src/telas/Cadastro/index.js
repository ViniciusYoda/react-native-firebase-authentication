import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import estilos from './estilos';
import { cadastrar } from '../../servicos/requisicoesFirebase';
import { Alerta } from '../../componentes/Alerta';

export default function Cadastro({ navigation }) {  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [statusError, setStatusError] = useState('');
  const [messagemError, setMessagemError] = useState('');

  async function realizarCadastro() {
    if(email === '') {
      setMessagemError('Preencha o campo do email')
      setStatusError('email');
    } else if (senha === '') {
      setMessagemError('Preencha o campo de senha');
      setStatusError('senha');
    } else if (confirmaSenha === '') {
      setMessagemError('Preencha o campo confirma senha');
      setStatusError('confirmaSenha');
    } else if (confirmaSenha != senha) {
      setMessagemError('As senhas são diferentes');
      setStatusError('confirmaSenha')
    }
    else {
      const resultado = await cadastrar(email, senha);
      setStatusError('firebase')
      if(resultado === 'sucesso'){
        setMessagemError('Usuário criado com sucesso')
        setEmail('')
        setSenha('')
        setConfirmaSenha('')

      }
      else {
        setMessagemError(resultado)
      }
    }

  }



  return (
    <View style={estilos.container}>
      <EntradaTexto 
        label="E-mail"
        value={email}
        onChangeText={texto => setEmail(texto)}
        error={statusError == 'email'}
        messageError={messagemError}
      />
      <EntradaTexto
        label="Senha"
        value={senha}
        onChangeText={texto => setSenha(texto)}
        secureTextEntry
        error={statusError == 'senha'}
        messageError={messagemError}
      />

      <EntradaTexto
        label="Confirmar Senha"
        value={confirmaSenha}
        onChangeText={texto => setConfirmaSenha(texto)}
        secureTextEntry
        error={statusError == 'confirmaSenha'}
        messageError={messagemError}
      />

      <Alerta 
        mensagem={messsagemError}
        error={statusError == 'firebase'}
        setError={setStatusError}
      />
      
      <Botao onPress={() => realizarCadastro()}>CADASTRAR</Botao>
    </View>
  );
}
