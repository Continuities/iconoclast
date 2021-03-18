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
import FlameGif from 'flame.gif';
import Why from 'view/Why.js';
import { useSnackbar } from 'provider/SnackbarProvider.js';
import {
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Link
} from '@material-ui/core';
import {
  Close as CloseIcon,
  Help as HelpIcon
} from '@material-ui/icons';
import styled from 'styled-components';

const EMPTY_FORM = {
  address: '',
  id: ''
};

const Message = styled(Typography)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Burn = () => {
  const context = useWeb3Context();
  const iconoclast = useIconoclast();
  const [ formData, setFormData ] = useState(EMPTY_FORM);
  const [ isConfirmOpen, setConfirmOpen ] = useState(false);
  const [ isValidAddress, setValidAddress ] = useState(false);
  const [ isBurning, setBurning ] = useState(false);
  const [ whyOpen, setWhyOpen ] = useState(false);
  const toBurn = useNFT(formData.address);
  const sendSnack = useSnackbar();

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
    return (
      <Message>
        Connecting...
      </Message>
    );
  }
  if (context.error) {
    return (
      <Message align='center'>
        {String(context.error)}<br/>
        <Link style={{ cursor: 'pointer' }} onClick={() => {
          context.unsetConnector();
          context.setFirstValidConnector(['MetaMask']);
        }}>
          Reconnect your MetaMask wallet.
        </Link>
      </Message>
    );
  }

  if (isBurning) {
    return <img src={FlameGif} style={{ width: '100%' }}/>;
  }

  return (
    <>
      <CardHeader 
        subheader="Throw your token on the fire."
        action={
          <IconButton onClick={()=>setWhyOpen(true)} size="small">
            <HelpIcon style={{ opacity: 0.3 }}/>
          </IconButton>
        }
      />
      <CardContent style={{ flexGrow: 1, display: 'flex' }}>
        <Grid container spacing={2} direction="column" style={{ flexGrow: 1 }}>
          <Grid item>
            { toBurn && isValidAddress ? (
              <Grid style={{ height: '56px' }} container justify="space-between" alignItems="center">
                <Grid item>
                  <TokenInfo token={toBurn} />
                </Grid>
                <Grid item>
                  <IconButton 
                    size="small"
                    onClick={() => setFormData(EMPTY_FORM)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ) : (
              <TextField 
                fullWidth
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
              fullWidth
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
          color="primary" 
          disabled={!(iconoclast && toBurn && formData.id)}
          onClick={() => setConfirmOpen(true)}
        >
          BURN
        </Button>
      </CardActions>
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
          <Button onClick={() => { setConfirmOpen(false); }}>Cancel</Button>
          <Button color="primary" onClick={async () => {
            setConfirmOpen(false);
            setBurning(true);
            try {
              await toBurn.approve(iconoclast.address, formData.id);
              const tx = await iconoclast.burn(formData.address, formData.id);
              const receipt = await tx.wait();
              const burntEvent = receipt.events.pop();
              console.log(`Received ashes`, burntEvent.args[0]);
              navigate(`/${burntEvent.args[0]}`);
            }
            catch (err) {
              setBurning(false);
              const msg = err?.data?.message || 'Transaction failed';
              sendSnack({ type: 'error', message: msg });
            }
          }}>Burn it</Button>
        </DialogActions>
      </Dialog>
      <Why open={whyOpen} onClose={() => setWhyOpen(false)} />
    </>
  );
};

export default Burn;