import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import MasterCardLogo from '../../assets/master_card_logo.png'
import VisaCardLogo from '../../assets/visa_card_logo.png'

import Chip from '../../assets/chip2.png'
import { motion as m } from 'framer-motion'
import { formatCardNumberVisible, formatCardNumberHidden, formatCvvNumberHidden, formatCvvNumberVisible } from '../../helpers/clean_acc'




const CardOutterMain = styled(m.div)`
max-width: 400px;
min-width: 400px;
width:calc(100% / 5 - 20px);


margin: 0px 10px;
margin-bottom: 15px;
@media (min-width: 0px) and (max-width: 800px) {
    max-width: unset;
    min-width: unset;
    margin: 10px 10px;
    width:calc(100% / 1 - 20px);

  
}
@media (min-width: 801px) and (max-width: 1024px) {
    max-width: unset;
    min-width: unset;
    margin: 10px 10px;
    width:calc(100% / 2 - 20px);
   
}
@media (min-width: 1025px) and (max-width: 1440px) {
    max-width: unset;
    margin: 10px 10px;
    width:calc(100% / 3 - 20px);
}
@media (min-width: 1441px) and (max-width: 1920px) {
    max-width: unset;
    margin: 10px 10px;
    width:calc(100% / 4 - 20px);
}

`
const CardOutter = styled(m.div)`
height: 240px;
`
const CardShowInfo = styled(m.p)`
text-align: center;
padding: 10px;
font-weight: bold;
cursor: pointer;
`
const CardInner = styled.div`
cursor: pointer;
width: 100%;
height: 100%;
position: relative;
transform: ${props => props.flipped ? "rotateX(180deg) " : "rotateX(0deg)"};
transition: 1s ease transform;
transform-style: preserve-3d;
perspective: 100px;
`

const CardFront = styled.div`
width: 100%;
height: 100%;
background: linear-gradient(45deg, #3F51B5, #00BCD4);
color:#ebebeb;
padding: 20px;
border-radius: 0.5rem;
position: relative;
transform: rotateX(180deg);
top: 0;
left: 0;
overflow-x: clip;
display: flex;
flex-direction: column;
justify-content: end;
`

const CardFrontSection = styled.div`
min-height: calc(100% / 3);
display: flex;

position: relative;
:nth-child(1){
    padding-bottom: 0px;
    font-style: italic;
}
:nth-child(2){
    padding-bottom: 0px;
    align-items: center;
    z-index: 1;
    justify-content: end;
}
:nth-child(3){
    padding-bottom: 0px;
    align-items: end;
    justify-content: space-between;
    text-transform: uppercase;
    z-index: 1;
}
`


const CardBackSection = styled.div`


position: relative;
:nth-child(1){
    min-height: calc(100% / 3);
}
:nth-child(2){
    padding: 10px 20px;
    min-height: calc(100% / 3);
}
:nth-child(3){
    padding: 10px 20px;
    background: #0074a9;
    min-height: calc(100% / 3);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

`
const CardFrontCircle = styled.div`

background: linear-gradient(316deg, rgb(255, 193, 7), #03A9F4);
width: 300px;
height: 300px;
position: absolute;
right: -200px;
bottom: -95px;
top: -25px;
border-radius: 50%;
backface-visibility: hidden;
margin: 20px;
}
`

const CardBack = styled.div`
width: 100%;
height: 100%;
background: linear-gradient(180deg, rgb(63, 81, 180), rgb(0, 188, 212));
color:white;
// padding: 20px;
border-radius: 0.5rem;
position: absolute;
backface-visibility: hidden;
top: 0;
left: 0;
overflow-x: clip;
`
const CardBackLegal = styled.p`
font-size: 8px;
color:#f1e5a6;
padding: 5px 10px;

`
const MagStrip = styled.div`
height: 40px;
background: black;


`
const Embossed = styled.p`
background-color: #0074a9;
text-shadow: 1px 4px 4px #0074a9;

-webkit-background-clip: text;
  -moz-background-clip: text;
  font-size: 18px;
//   font-family: CREDC!important;
`

const MasterCardLogoImg = styled.img`

max-width: 70px;
object-fit: contain;
aspect-ratio: 16/16;
margin-bottom: -15px;

`
const MasterCardChipImg = styled.img`
max-width:48px;
`
const Sub = styled.p`
font-size: 8px;
color:#f1e5a6;
`

const CvvHolder = styled.div`
background: rgb(241, 229, 166);
color: #a9a175;
width: fit-content;
padding: 0px 10px;
border-radius: 2px;
`
const CvvSub = styled.p`
font-size: 7px;
color:#f1e5a6;
text-transform: uppercase;
`




const Card = ({ delay, data, flip }) => {

    const [flipped, setFlipped] = useState(true)
    const [showFull, setShowFull] = useState(false)

    useEffect(() => {
        setFlipped(flip)

    }, [flip])

    return (
        <CardOutterMain>
            <CardOutter
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay }}
                exit={{ opacity: 0 }}>
                <CardInner flipped={flipped} onClick={() => { setFlipped(prev => !prev) }}>
                    <CardFront>

                        <CardFrontSection>
                            {data?.scheme ? data?.scheme : null}
                        </CardFrontSection>

                        <CardFrontSection>
                            <MasterCardChipImg src={Chip} width="100%" />
                        </CardFrontSection>

                        <CardFrontSection>
                            <p>{data?.acc_holder ? data?.acc_holder : null}</p>
                            {data.scheme == "Mastercard" ? <MasterCardLogoImg src={MasterCardLogo} width="100%" /> : null}
                            {data.scheme == "Visa" ? <MasterCardLogoImg src={VisaCardLogo} width="100%" /> : null}
                        </CardFrontSection>

                        <CardFrontCircle />
                    </CardFront>

                    <CardBack>

                        <CardBackSection>
                            <CardBackLegal>ICA 6832</CardBackLegal>
                            <MagStrip />
                        </CardBackSection>

                        <CardBackSection>
                            <CvvHolder>
                                {showFull ?
                                    <>
                                        {data?.cvv ? formatCvvNumberVisible(data?.cvv) : null}
                                    </>
                                    :
                                    <>
                                        {data?.cvv ? formatCvvNumberHidden(data?.cvv) : null}
                                    </>
                                }

                            </CvvHolder>
                            <CvvSub>Security Code</CvvSub>

                        </CardBackSection>

                        <CardBackSection>
                            <div>
                                <Embossed>
                                    {showFull ?
                                        <>
                                            {data?.card_number ? formatCardNumberVisible(data?.card_number) : null}

                                        </>
                                        :
                                        <>
                                            {data?.card_number ? formatCardNumberHidden(data?.card_number) : null}

                                        </>
                                    }

                                </Embossed>
                                <p> {data?.expiry_month ? data?.expiry_month : null}/{data?.expiry_year ? data?.expiry_year : null}</p>
                                <Sub>VALID THRU</Sub>
                            </div>

                            <p>{data?.type ? data?.type : null}</p>
                        </CardBackSection>



                    </CardBack>

                </CardInner>

            </CardOutter>
            {!flipped ? <CardShowInfo onClick={() => { setShowFull((prev) => !prev) }}>{showFull ? "Hide" : 'Show'} Info</CardShowInfo> : null}
        </CardOutterMain>

    )
}

export default Card