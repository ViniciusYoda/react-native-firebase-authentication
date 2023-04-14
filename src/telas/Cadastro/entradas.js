export const entradas = [
   {
     id: '1',
     name: 'email',
     label: 'E-mail',
     pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
     mensagemError: 'Digite um email válido',
     secureTextEntry: false
   },
   {
     id: '2',
     name: 'senha',
     label: 'Senha',
     mensagemError: 'Digite uma senha válido',
     secureTextEntry: true,
     pattern: '.{6,}'
   },
   {
      id: '3',
      name: 'confirmaSenha',
      label: 'Confrirmar senha',
      mensagemError: 'As senhas não conferem',
      secureTextEntry: true
   }
]