/**
 * Temporary button for minting ashes without burning anything
 * @author mtownsend
 * @since March 16, 2021
 * @flow
 **/

import React from 'react';
import { useIconoclast } from 'hook/useContract.js';

const MintButton = () => {
  const iconoclast = useIconoclast();
  return iconoclast && (
    <button onClick={() => iconoclast.mint()}>
      MINT
    </button>
  );
};

export default MintButton;