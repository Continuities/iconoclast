/**
 * Displays a users ashes
 * @author mtownsend
 * @since March 16, 2021
 * @flow
 **/

import React, { useState, useEffect } from 'react';
import { useIconoclast } from 'hook/useContract.js';
import { useWeb3Context } from 'web3-react';
import AshImage from 'ash.jpg';
import {
  CardContent,
  Typography,
  Link
} from '@material-ui/core';

type Props = {|
  path?:string,
  ashesId:number
|};

const Ashes = ({ ashesId }: Props) => {
  const context = useWeb3Context();
  const iconoclast = useIconoclast();
  const [ link, setLink ] = useState(null);

  useEffect(() => {
    if (context.account && iconoclast) {
      iconoclast
        .originalURI(ashesId)
        .then(setLink)
        .catch(() => setLink(null));
    }
  }, [ context.account, iconoclast ]);

  return (
    <CardContent style={{ maxHeight: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <img src={AshImage} style={{ height: 0, flex: 1 }}/>
      <Link href={link} color="textPrimary" style={{ height: '24px' }}>
        <Typography align="center">
          {link || ''}
        </Typography>
      </Link>
    </CardContent>
  );
};

export default Ashes;