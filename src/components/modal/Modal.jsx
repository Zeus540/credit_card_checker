import React from 'react'
import AddCard from '../forms/AddCard'
import AddBulkCard from '../forms/AddBulkCard'
import styled from 'styled-components'
import {motion as m} from 'framer-motion'

const Root = styled(m.div)`
padding: 40px;
background: #292929c4;
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
z-index: 2;
display: flex;
justify-content: center;
align-items: center;
@media (max-width: 800px) {
    padding:40px 20px;
 
  }
`


const Modal = ({type,setOpenModal}) => {

  const handleClose = (type)=>{
    if(type == "outter"){
      setOpenModal(false)
    }
    if(type == "inner"){
      setOpenModal(false)
    }
  }

  
  return (
    <Root
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}

    >
    {type == "single_add" &&  <AddCard setOpenModal={setOpenModal}   onClick={()=>{handleClose("inner")}}/>}
    {type == "bulk_add" &&  <AddBulkCard setOpenModal={setOpenModal}   onClick={()=>{handleClose("inner")}}/>}
    </Root>
  )
}

export default Modal