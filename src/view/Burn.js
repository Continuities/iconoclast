/**
 * Interface for burning something
 * @author mtownsend
 * @since March 15, 2021
 * @flow
 **/

import React, { useState } from 'react';
import { useNFT, useIconoclast } from 'hook/useContract.js';
import TokenInfo from 'component/TokenInfo.js';
import { useWeb3Context } from 'web3-react';
import styled from 'styled-components';

const BurnForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const FormText = styled.div`
  margin-bottom: 20px;
`;
const FormField = styled.input`
  margin-bottom: 10px;
`;

const Burn = () => {
  const context = useWeb3Context();
  const iconoclast = useIconoclast();
  const [ formData, setFormData ] = useState({
    address: '',
    id: ''
  });
  const toBurn = useNFT(formData.address);

  if (!context.active && !context.error) {
    return "Connecting...";
  }
  if (context.error) {
    return `ERROR ${context.error}`;
  }

  return (
    <BurnForm>
      <FormText>
        Throw your token on the fire.
      </FormText>
      <FormField 
        type='text' 
        value={formData.address} 
        onChange={e => setFormData({...formData, address: e.target.value })}
        placeholder='address' 
      />
      <TokenInfo token={toBurn} />
      <FormField 
        type='text' 
        value={formData.id} 
        onChange={e => setFormData({...formData, id: e.target.value })}
        placeholder='token id' 
      />
      { iconoclast && toBurn && formData.id && (
        <button onClick={async (e) => {
          e.preventDefault();
          await toBurn.approve(iconoclast.address, formData.id);
          await iconoclast.burn(formData.address, formData.id);
        }}>
          BURN
        </button>
      )}
    </BurnForm>
  )
};

export default Burn;