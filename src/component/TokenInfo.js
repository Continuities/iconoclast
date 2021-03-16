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
  useEffect(() => {
    if (!token) {
      return;
    }
    token.name().then(n => {
      setName(n);
    });
  }, [ token ]);
  
  return name && (
    <div>{name}</div>
  );
};

export default TokenInfo;