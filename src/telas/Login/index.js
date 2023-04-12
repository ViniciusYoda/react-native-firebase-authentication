import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import estilos from './estilos';
import { logar } from '../../servicos/requisicoesFirebase';
import { Alerta } from '../../componentes/Alerta';
import { auth } from '../../config/firebase';

import loading from '../../../assets/loading.json'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [statusError, setStatusError] = useState('');
  const [mensagemError, setMensagemError] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged(
      usuario => {
        if(usuario){
          navigation.replace('Principal')
        }
        setCarregando(false);
      }
    )

    return () => estadoUsuario();
  }, [])

  async function realizarLogin(){ 
    if(email === '') {
      setMensagemError('O email é obirgatório')
      setStatusError('email');
    } else if (senha === '') {
      setMensagemError('A senha é obrigatório');
      setStatusError('senha');
    } else {
      const resultado = await logar(email, senha);
      if (resultado == 'erro') {
        setStatusError('firebase');
        setMensagemError('Email ou Senha não conferem');
      }
      else {
        navigation.replace('Principal')
      }
    }
    
  }

  if(carregando){
    return (
      <View style={estilos.containerAnimacao}>
        <Image 
          source={loading}
          styule={estilos.imagem}
        />
      </View>
    )
  }

  return (
    <View style={estilos.container}>
      <EntradaTexto 
        label="E-mail"
        value={email}
        onChangeText={texto => setEmail(texto)}
        error={statusError == 'email'}
        messageError={mensagemError}
      />
      <EntradaTexto
        label="Senha"
        value={senha}
        onChangeText={texto => setSenha(texto)}
        secureTextEntry
        error={statusError == 'senha'}
        messageError={mensagemError}
      />

      <Alerta 
        mensagem={mensagemError}
        error={statusError == 'firebase'}
        setError={setStatusError}
      />
      
      <Botao onPress={() => realizarLogin}>LOGAR</Botao>
      <Botao 
        onPress={() => { navigation.navigate('Cadastro') }}
      >
        CADASTRAR USUÁRIO
      </Botao>
    </View>
  );
}
