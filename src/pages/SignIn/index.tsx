import React from 'react';
import { Image, View, ScrollView ,KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgoutPasswordButton,
  ForgoutPasswordText
  CreateAccountButton,
  CreateAccountText
} from './styles';

const SignIn: React.FC = () => {
  return(
    <>
      <KeyboardAvoidingView
        style={{ flex: 1}}
        behavior={ Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
      <ScrollView
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{ flex: 1}}
      >
        <Container >
          <Image source={logoImg} />

          <View>
            <Title> Faça o seu logon</Title>
          </View>
          <Input name='email' icon='mail' placeholder='E-mail' />
          <Input name='password' icon='lock' placeholder='Senha'/>

          <Button onPress={() => {
            console.log('foi!')
          }} > Entrar </Button>

          <ForgoutPasswordButton onPress={() => {}}>
            <ForgoutPasswordText> Esqueci minha Senha </ForgoutPasswordText>
          </ForgoutPasswordButton>
        </Container>
      </ScrollView>
        </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => {}}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountText>Criar uma conta</CreateAccountText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
