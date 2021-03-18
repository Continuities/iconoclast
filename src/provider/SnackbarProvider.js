/**
 * Provides a page-level snackbar to report to
 * @author mtownsend
 * @since March 17, 2021
 * @flow
 **/

import React, { createContext, useContext, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const Context = createContext(() => {});

type Props = {|
  children: React$Node
|};

export type Snack = {|
  type: 'success' | 'info' | 'warning' | 'error',
  message: string
|};

const SnackbarProvider = ({ children }: Props) => {
  const [ snack, setSnack ] = useState<?Snack>(null);
  const [ isOpen, setOpen ] = useState<boolean>(false);
  const close = () => { setOpen(false); };
  const displaySnack = (s:Snack) => {
    if (s) {
      setSnack(s);
      setOpen(true);
    }
  };
  return (
    <Context.Provider value={displaySnack}>
      <Snackbar open={isOpen} onClose={close}>
        <Alert onClose={close} severity={snack ? snack.type : 'info'}>
          {snack ? snack.message: ''}
        </Alert>
      </Snackbar>
      {children}
    </Context.Provider>
  );
};

export const useSnackbar = ():(Snack=>void) => useContext(Context);

export default SnackbarProvider;