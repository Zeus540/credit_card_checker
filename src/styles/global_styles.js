import styled from 'styled-components'
import {motion as m} from 'framer-motion'
import { Button} from '@mui/material';

export const Root = styled(m.div)`
padding:40px;
background: ghostwhite;
min-height: calc(100vh - 63px);
@media (max-width: 800px) {
    padding:40px 20px;
  }
`

export const StyledButton= styled(Button)`
 margin:0px 10px!important;
 font-family:baloonR!important;
 svg{
  font-size:25px;
  margin-right:10px
 }
`
export const Heading= styled.h1`
font-size: 30px;
font-weight: bold;
margin: 10px 0px;
`
