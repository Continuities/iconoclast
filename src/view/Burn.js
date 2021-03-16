/**
 * Interface for burning something
 * @author mtownsend
 * @since March 15, 2021
 * @flow
 **/

import React, { useEffect } from 'react'
import { useWeb3Context } from 'web3-react'

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
  const context = useWeb3Context();
 
  useEffect(() => {
    context.setFirstValidConnector(['MetaMask'])
  }, []);

  return (
    <div>{getMessage(context)}</div>
  )
};

export default Burn;