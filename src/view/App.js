/**
 * Burn your idols
 * @author mtownsend
 * @since March 15, 2021
 * @flow
 **/

import React from 'react';
import Web3Provider, { Connectors } from 'web3-react';
import Burn from 'view/Burn.js';

const App = () => {

  const MetaMask = new Connectors.InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

  return (
    <Web3Provider
      connectors={{ MetaMask }}
      libraryName='ethers.js'
    >
      <Burn />
    </Web3Provider>
  );
};

export default App;