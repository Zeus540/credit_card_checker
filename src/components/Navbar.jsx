import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Root = styled.div`
padding:20px 40px;
background: white;
@media (max-width: 800px) {
  padding:20px 20px;

}
`
const LinkHolder = styled.div`
display: flex;
justify-content: end;
`
const StyledLink = styled(Link)`
margin-left: 20px;
`
const Navbar = () => {
  return (
    <Root>
      
      <LinkHolder>

      <div>
        <StyledLink
        to="/"
        >
          Manage Cards
        </StyledLink>
      </div>

      <div>
        <StyledLink
        to="/countries"
        >
          Countries
        </StyledLink>
      </div>

      </LinkHolder>
    </Root>
  )
}

export default Navbar