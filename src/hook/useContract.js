/**
 * Hook to provide a Contract inferface
 * @author mtownsend
 * @since March 16, 2021
 * @flow
 **/

import { useEffect, useState } from 'react';
import { useWeb3Context } from 'web3-react';
import { Contract } from 'ethers';
import IconoclastABI from 'Iconoclast.json';
import TokenABI from 'ERC721.json';

const useContract = (address:string, abi:Object) => {
  const [ contract, setContract ] = useState(null);
  const context = useWeb3Context();
  useEffect(() => {
    if (!address || !abi) {
      return;
    }
    if (context.active) {
      const signer = context.library.getSigner();
      const contract = new Contract(address, abi, signer);
      setContract(contract);
    }
    else if (context.error) {
      setContract(null);
    }
    else {
      context.setFirstValidConnector(['MetaMask']);
    }
  }, [ address, abi, context.active, context.error ]);
  return contract;
};

export const useIconoclast = () => useContract(
  // TODO: Make the address configurable
  '0xc6e7DF5E7b4f2A278906862b61205850344D4e7d',
  IconoclastABI
);

export const useNFT = address => useContract(
  address,
  TokenABI
);

export default useContract;