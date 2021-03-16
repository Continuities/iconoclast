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
import MintButton from 'component/MintButton.js';
import styled from 'styled-components';

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const App = () => {

  const MetaMask = new Connectors.InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

  return (
    <Page>
      <Web3Provider
        connectors={{ MetaMask }}
        libraryName='ethers.js'
      >
        <Ashes />
        {/* <MintButton /> */}
        <Burn />
      </Web3Provider>
    </Page>
  );
};

export default App;