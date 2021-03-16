/**
 * Interface for burning something
 * @author mtownsend
 * @since March 15, 2021
 * @flow
 **/

import React, { useEffect, useState } from 'react';
import { useWeb3Context } from 'web3-react';
import IconoclastABI from 'Iconoclast.json';
import { Contract } from 'ethers';

const address = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // TODO: Config

const getMessage = (context) => {
  if (!context.active && !context.error) {
    // loading
    return "Connecting MetaMask...";
  } else if (context.error) {
    //error
    return `ERROR ${context.error}`;
  } else {
    // success
    return context.account;
  }
}

const Burn = () => {
  const [ iconoclast, setIconoclast ] = useState(null);
  const context = useWeb3Context();
  useEffect(() => {
    context.setFirstValidConnector(['MetaMask'])
  }, []);
  useEffect(() => {
    if (!context.active) {
      return;
    }
    const signer = context.library.getSigner();
    const contract = new Contract(address, IconoclastABI, signer);
    setIconoclast(contract);
  }, [context.active])

  console.log(iconoclast);

  return (
    <div>{getMessage(context)}</div>
  )
};

export default Burn;