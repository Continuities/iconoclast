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

const address = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'; // TODO: Config

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

  if (!context.active && !context.error) {
    return "Connecting MetaMask...";
  }
  if (context.error) {
    return `ERROR ${context.error}`;
  }

  return (
    <div>
      { iconoclast && (
        <button onClick={() => {
          iconoclast.burn(context.account, "Ceci n'est pas un token");
        }}>
          BURN
        </button>
      )}
    </div>
  )
};

export default Burn;