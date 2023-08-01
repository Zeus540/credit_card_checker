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
`