/**
 * Hook to provide a Contract inferface
 * @author mtownsend
 * @since March 16, 2021
 * @flow
 **/

import { useEffect, useState } from 'react';
import { useWeb3Context } from 'web3-react';
import { Contract, utils } from 'ethers';
import IconoclastABI from 'Iconoclast.json';
import TokenABI from 'ERC721.json';

const useContract = (address:string, abi:Object) => {
  const [ contract, setContract ] = useState(null);
  const context = useWeb3Context();
  useEffect(() => {
    if (context.error || !address || !abi || !utils.isAddress(address)) {
      setContract(null);
    }
    else if (context.active) {
      const signer = context.library.getSigner();
      const contract = new Contract(address, abi, signer);
      setContract(contract);
    }
    else {
      context.setFirstValidConnector(['MetaMask']);
    }
  }, [ address, abi, context.active, context.error ]);
  return contract;
};

export const useIconoclast = () => useContract(
  // TODO: Make the address configurable
  '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318',
  IconoclastABI
);

export const useNFT = address => useContract(
  address,
  TokenABI
);

export default useContract;