/**
 * Interface for burning something
 * @author mtownsend
 * @since March 15, 2021
 * @flow
 **/

import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router"
import { useNFT, useIconoclast } from 'hook/useContract.js';
import TokenInfo from 'component/TokenInfo.js';
import { useWeb3Context } from 'web3-react';
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import {
  Close as EditIcon
} from '@material-ui/icons';

const EMPTY_FORM = {
  address: '',
  id: ''
};

const Burn = () => {
  const context = useWeb3Context();
  const iconoclast = useIconoclast();
  const [ formData, setFormData ] = useState(EMPTY_FORM);
  const [ isConfirmOpen, setConfirmOpen ] = useState(false);
  const [ isValidAddress, setValidAddress ] = useState(false);
  const [ isBurning, setBurning ] = useState(false);
  const toBurn = useNFT(formData.address);

  useEffect(() => {
    if (!toBurn) {
      setValidAddress(false);
      return;
    }
    toBurn
      .symbol()
      .then(() => setValidAddress(true))
      .catch(() => setValidAddress(false))
  }, [ toBurn ])

  if (!context.active && !context.error) {
    return "Connecting...";
  }
  if (context.error) {
    return `ERROR ${context.error}`;
  }

  if (isBurning) {
    return 'BURNING';
  }

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography>
                Throw your token on the fire.
              </Typography>
            </Grid>
            <Grid item>
              { toBurn && isValidAddress ? (
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    <TokenInfo token={toBurn} />
                  </Grid>
                  <Grid item>
                    <IconButton 
                      size="small"
                      onClick={() => setFormData(EMPTY_FORM)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ) : (
                <TextField 
                  label="address"
                  variant="outlined"
                  error={toBurn && !isValidAddress}
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value })}
                />
              )}
            </Grid>
            <Grid item>
              <TextField 
                disabled={!toBurn}
                label="token id"
                variant="outlined"
                value={formData.id}
                onChange={e => setFormData({...formData, id: e.target.value })}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button 
            fullWidth
            disabled={!(iconoclast && toBurn && formData.id)}
            onClick={() => setConfirmOpen(true)}
          >
            BURN
          </Button>
        </CardActions>
      </Card>
      <Dialog 
        open={isConfirmOpen}
        onClose={() => { setConfirmOpen(false); }}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will permanently lose this NFT. This is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={async () => {
            setConfirmOpen(false);
            setBurning(true);
            await toBurn.approve(iconoclast.address, formData.id);
            const tx = await iconoclast.burn(formData.address, formData.id);
            const receipt = await tx.wait();
            const burntEvent = receipt.events.pop();
            console.log(`Received ashes`, burntEvent.args[0]);
            navigate(`/${burntEvent.args[0]}`);
          }}>Burn it</Button>
          <Button onClick={() => { setConfirmOpen(false); }}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Burn;