import React,{useEffect} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router'


const RootInner = styled.div`

display: flex;
background: ghostwhite;
-webkit-box-pack: center;
justify-content: center;
-webkit-box-align: center;
align-items: center;
height: calc(100vh);
position: fixed;
width: 100%;
top: 0;

`
const RootInnerErr = styled.div`
display: flex;
p{
    font-size: 30px;
    margin: 0px 10px;
}
span{
    width: 2px;
    background: black;
}
`

const NotFound = () => {

    const navigate = useNavigate()

    useEffect(() => {
      setTimeout(() => {
            navigate('/')
    }, 2500);
    }, [])
    
  return (

        <RootInner>
            <RootInnerErr>
        <p>404</p> <span></span> <p>NotFound</p>
            </RootInnerErr>
        </RootInner>
        
 
  )
}

export default NotFound