/**
 * Displays info about a token contract
 * @author mtownsend
 * @since March 16, 2021
 * @flow
 **/

import React, { useState, useEffect } from 'react';

type Props = {|
  token: ?Object
|};

const TokenInfo = ({ token }: Props) => {
  const [ name, setName ] = useState('');
  const [ symbol, setSymbol ] = useState('');
  useEffect(() => {
    if (!token) {
      setName('');
      setSymbol('');
    }
    else {
      token.name().then(setName);
      token.symbol().then(setSymbol);
    }
  }, [ token ]);
  
  return name && (
    <div>{name} ({symbol})</div>
  );
};

export default TokenInfo;