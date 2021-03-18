/**
 * Page wrapper with cool background
 * @author mtownsend
 * @since March 17, 2021
 * @flow
 **/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  '@keyframes flicker': {
    '0%': { opacity: 0.8 },
    '12%': { opacity: 0.5 },
    '20%': { opacity: 1 },
    '27%': { opacity: 0.3 },
    '50%': { opacity: 0.8 },
    '80%': { opacity: 0.4 },
    '85%': { opacity: 0.9 },
    '97%': { opacity: 0.7 },
    '100%': { opacity: 0.4 },
  },
  '@keyframes wiggle': {
    '0%': { transform: 'translate3d(0, 0, 0)' },
    '12%': { transform: 'translate3d(10%, 8%, 0)' },
    '20%': { transform: 'translate3d(-10%, 10%, 0)' },
    '27%': { transform: 'translate3d(5%, -3%, 0)' },
    '50%': { transform: 'translate3d(-6%, 5%, 0)' },
    '80%': { transform: 'translate3d(10%, 2%, 0)' },
    '85%': { transform: 'translate3d(4%, 12%, 0)' },
    '97%': { transform: 'translate3d(8%, 0%, 0)' },
    '100%': { transform: 'translate3d(-3%, -3%, 0)' },
  },
  page: {
    background: 'black',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  blob: {
    background: '#330000',
    animation: '$flicker 10s linear infinite, $wiggle 16s linear infinite',
    borderRadius: '50%',
    position: 'absolute',
    width: '80vw',
    height: '80vw',
    minWidth: '80vh',
    minHeight: '80vh',
  },
  bg: {
    filter: 'blur(100px)',
    overflow: 'hidden',
    position: 'absolute',
    width: '100vw',
    height: '100vh'
  }
});

type Props = {|
  children: React$Node
|};

const Page = ({ children }: Props) => {
  const styles = useStyles();
  return (
    <div className={styles.page}>
      <div className={styles.bg}>
        <div className={styles.blob} style={{ animationDelay: '-2s',  top: '10%', left: '45%' }}></div>
        <div className={styles.blob} style={{ top: '50%', left: '20%' }}></div>
        <div className={styles.blob} style={{ animationDelay: '-3s',  top: '0%', left: '0%' }}></div>
      </div>
      {children}
    </div>
  )
};

export default Page;