/**
 * Burn your idols
 * @author mtownsend
 * @since March 15, 2021
 * @flow
 **/

import React from 'react';
import Web3Provider, { Connectors } from 'web3-react';
import Burn from 'view/Burn.js';
import Ashes from 'view/Ashes.js';
import styled from 'styled-components';
import { Router } from '@reach/router';
import SnackbarProvider from 'provider/SnackbarProvider.js';
import { Card } from '@material-ui/core';

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentRouter = styled(Router)`
  width: 300px;
  height: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const App = () => {

  const MetaMask = new Connectors.InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

  return (
    <Page>
      <SnackbarProvider>
        <Web3Provider
          connectors={{ MetaMask }}
          libraryName='ethers.js'
        >
          <Card>
            <ContentRouter>
              {/* $FlowIgnore[prop-missing] Flow doesn't like Reach Router */}
              <Burn path="/"/> 
              {/* $FlowIgnore[prop-missing] Flow doesn't like Reach Router */}
              <Ashes path="/:ashesId" />
            </ContentRouter>
          </Card>
        </Web3Provider>
      </SnackbarProvider>
    </Page>
  );
};

export default App;