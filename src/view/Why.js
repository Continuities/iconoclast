/**
 * Everyone loves an artist's statement
 * @author mtownsend
 * @since March 18, 2021
 * @flow
 **/

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button
} from '@material-ui/core';

type Props = {|
  open:boolean,
  onClose:() => void
|};

const Why = ({ open, onClose }: Props) => (
  <Dialog open={open}>
    <DialogTitle>What is this?</DialogTitle>
    <DialogContent dividers={scroll === 'paper'}>
      <DialogContentText>
        Iconoclast is a smart contract, deployed to the Ethereum network. Its code is public, and immutable. It adheres to the ERC-721 standard for Non-Fungible Tokens, offering unique and irreplaceable ASH tokens.
        It will only award you an ASH token in exchange for destroying any other ERC-721 Non-Fungible Token. The sacrificed token will be transferred to an uncontrolled Ethereum address, effectively removing it from circulation.
        Your new ASH token will be permanently linked to your old token. Your old token will be gone, but you will be the last to have ever owned it.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Back</Button>
    </DialogActions>
  </Dialog>
)

export default Why;