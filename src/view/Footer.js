/**
 * Marketing stuff
 * @author mtownsend
 * @since March 17, 2021
 * @flow
 **/

import React from 'react';
import styled from 'styled-components';
import { GitHub, Instagram, Twitter } from '@material-ui/icons';
import { Link, Box } from '@material-ui/core';

const Footer = styled.footer`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export default () => (
  <Footer>
    <Box color='secondary.main'>iconoclast.</Box>
    <Link 
      target="_blank" 
      style={{ fontSize: '0.6em' }}
      color='secondary'
      href="http://www.itsmichael.info">
      by Michael Townsend
    </Link>
    <Box mt={1}>
      <Link 
        style={{ marginRight: '10px' }}
        target="_blank" 
        color='secondary'
        href="https://github.com/Continuities/iconoclast">
        <GitHub style={{ fontSize: '1em' }}/>
      </Link>
      <Link 
        style={{ marginRight: '10px' }}
        target="_blank" 
        color='secondary'
        href="https://www.instagram.com/continuous_michael/">
        <Instagram style={{ fontSize: '1em' }} />
      </Link>
      <Link 
        target="_blank" 
        color='secondary'
        href="https://twitter.com/continuities">
        <Twitter style={{ fontSize: '1em' }} />
      </Link>
    </Box>
  </Footer>
);