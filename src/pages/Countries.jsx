import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { CountryContext } from '../context/CountryContext'

import { Root, StyledButton } from '../styles/global_styles';

const ButtonHolder = styled.div`
display:flex;
margin: 0px -10px;
justify-content: end;
`

const CountryHolder = styled.div`
padding: 20px 10px;
background: white;
margin: 10px 0px;
border-radius: 5px;
cursor: pointer;
`
const CountryHolderOutter = styled.div`

margin: 20px 0px;

`

const SearchInput = styled.input`
border-radius: 50px;
border: 1px solid #dddddd;
padding: 10px 20px;
margin-top: 20px;
`

const CountryHolderBlocked = styled.div`
padding: 20px 10px;
background: #dddddd;
margin: 10px 0px;
border-radius: 5px;
cursor: pointer;
display: flex;
justify-content: space-between;
align-items: center;
p{
    text-decoration: line-through;
}

`

const CountryHolderBlockedSpan = styled.span`
padding: 5px 20px;
background: red;
text-decoration: unset;
color: white;
border-radius: 50px;
font-size: 14px;
`
const Countries = () => {

    const { countries, blocked_countries, handleAddBannerCountry } = useContext(CountryContext)
    const [pageNumber, setPageNumber] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const pageSize = 10;

    function paginateArray(array, pageSize, pageNumber) {

        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        return array.slice(startIndex, endIndex);
    }


    const handleNext = () => {

        if (pageNumber < countries.length / pageSize) {
            setPageNumber(pageNumber + 1)
        }

    }
    const handleBack = () => {

        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1)
        }

    }

    const handleSearch = (e) => {
        setPageNumber(1)
        setSearchTerm(e.target.value)

    }
    
    return (
        <Root
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <ButtonHolder>
                
                {pageNumber > 1  ?  <StyledButton color="primary" variant="contained" onClick={() => { handleBack() }}>Back</StyledButton> :  <StyledButton disabled={true} color="primary" variant="contained" onClick={() => { handleBack() }}>Back</StyledButton>}

                {pageNumber < countries.filter((c) => (c.name).toLowerCase().includes((searchTerm).toLowerCase())).length / pageSize ? <StyledButton color="primary" variant="contained" onClick={() => { handleNext() }}>Next</StyledButton> : <StyledButton disabled={true} color="primary" variant="contained" onClick={() => { handleNext() }}>Next</StyledButton>}

            </ButtonHolder>
            <SearchInput type="text" onChange={(e)=>{handleSearch(e)}} placeholder='Search Country'></SearchInput>
            <CountryHolderOutter>
                {paginateArray(countries.filter((c) => (c.name).toLowerCase().includes((searchTerm).toLowerCase())), pageSize, pageNumber).map((c) => {

                    if (blocked_countries?.map((blocked) => blocked.toLowerCase()).includes(c.name.toLowerCase())) {
                        return (
                            <>

                                <CountryHolderBlocked onClick={() => { handleAddBannerCountry(c.name) }}>
                                    <p>{c.name}</p>
                                    <CountryHolderBlockedSpan>Blocked</CountryHolderBlockedSpan>
                                </CountryHolderBlocked>
                            </>
                        )
                    } else {
                        return (
                            <>
                                <CountryHolder onClick={() => { handleAddBannerCountry(c.name) }}>
                                    {c.name}
                                </CountryHolder>
                            </>
                        )
                    }

                })}
            </CountryHolderOutter>

        </Root>
    )
}

export default Countries