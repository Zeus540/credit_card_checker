import React, { useContext, useState } from 'react'
import { CountryContext } from '../context/CountryContext'
import Modal from '../components/modal/Modal'
import styled from 'styled-components'
import Card from '../components/card/Card'
import { CardDataContext } from '../context/CardDataContext';
import { Root,StyledButton,Heading } from '../styles/global_styles'
import {IoIosAdd} from 'react-icons/io'
import {HiOutlineDocumentAdd} from 'react-icons/hi'




const CardHolder = styled.div`
display:flex;
    flex-wrap: wrap;
    margin: 20px -10px;
    @media (max-width: 800px) {
        margin: 10px -10px;
        flex-direction: column;
    
    }
`

const ButtonHolder = styled.div`
display:flex;
margin: 0px -10px;
justify-content: end;
`

const Cards = () => {

    const [openModal, setOpenModal] = useState(false)
    const [type, setType] = useState("")
    const [blocked_countries, setBlocked_countries] = useState([])

    const { countries } = useContext(CountryContext)
    const { card_data } = useContext(CardDataContext)







    const handleModalPopUp = (modal_type) => {
        switch (modal_type) {
            case 'single_add':
                setOpenModal(prev => !prev)
                setType(modal_type)
                break;
            case 'bulk_add':
                setOpenModal(prev => !prev)
                setType(modal_type)
                break;
            default:
                break;
        }
    }

    return (
        <Root
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <ButtonHolder>
                <StyledButton color="primary" variant="contained" onClick={() => { handleModalPopUp("single_add") }}><IoIosAdd/>Add Card</StyledButton >
                <StyledButton color="primary" variant="contained" onClick={() => { handleModalPopUp("bulk_add") }}><HiOutlineDocumentAdd/> Import CSV</StyledButton >
            </ButtonHolder>

            {openModal ? <Modal type={type} setOpenModal={setOpenModal} /> : null}


<Heading>Cards</Heading>
            <CardHolder>

                {card_data.map((card, index) => {
                    return (
                        <Card delay={0.25} data={card} flip={true} key={index} />
                    )
                })}
            </CardHolder>

        </Root>
    )
}

export default Cards