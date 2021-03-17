/**
 * Displays a users ashes
 * @author mtownsend
 * @since March 16, 2021
 * @flow
 **/

import React, { useState, useEffect } from 'react';
import { useIconoclast } from 'hook/useContract.js';
import { useWeb3Context } from 'web3-react';
import {
  Card,
  CardContent
} from '@material-ui/core';

type Props = {|
  path?:string,
  ashesId:number
|};

const Ashes = ({ ashesId }: Props) => {
  const context = useWeb3Context();
  const iconoclast = useIconoclast();
  const [ tokenURI, setTokenURI ] = useState(null);

  useEffect(() => {
    if (context.account && iconoclast) {
      iconoclast
        .tokenURI(ashesId)
        .then(setTokenURI)
        .catch(() => setTokenURI(null));
    }
  }, [ context.account, iconoclast ]);

  return (
    <Card>
      <CardContent>
        {tokenURI}
      </CardContent>
    </Card>
  );
};

export default Ashes;