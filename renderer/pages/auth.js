import React from 'react';
import electron from 'electron';
import Head from 'next/head';
import styled from 'styled-components';
import Common from '../components/common';
import Button from '../components/button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

class Auth extends React.Component {
  render() {
    return (
      <>
        <Common />
        <Head>
          <title>FPM - Authorization</title>
        </Head>
        <Container>
          <h1>Factorio package manager</h1>
          <Button onClick={this.handleLogin}>Login</Button>
        </Container>
      </>
    );
  }

  handleLogin = () => {
    if (electron.ipcRenderer) electron.ipcRenderer.send('general', 'auth');
  };
}

export default Auth;
