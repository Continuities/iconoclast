/**
 * Displays a users ashes
 * @author mtownsend
 * @since March 16, 2021
 * @flow
 **/

import React, { useState, useEffect } from 'react';
import { useIconoclast } from 'hook/useContract.js';
import { useWeb3Context } from 'web3-react';

const getAshes = async (contract, account) => {
  const balance = (await contract.balanceOf(account)).toNumber();
  let ashes = [];
  for (let i = 0; i < balance; i++) {
    ashes.push(await contract.tokenOfOwnerByIndex(account, i));
  }
  return ashes;
}

const Ashes = () => {
  const context = useWeb3Context();
  const iconoclast = useIconoclast();
  const [ ashes, setAshes ] = useState([]);

  useEffect(() => {
    if (context.account && iconoclast) {
      getAshes(iconoclast, context.account).then(setAshes);
    }
  }, [ context.account, iconoclast ]);

  return (
    <ul>
      { ashes.map(id => <li key={id}>{String(id)}</li>) }
    </ul>
  );
};

export default Ashes;