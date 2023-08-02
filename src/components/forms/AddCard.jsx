import React, { useContext, useState } from 'react'
import Card from '../card/Card'
import styled from 'styled-components'
import { Formik, Form } from 'formik';
import { TextField, MenuItem } from '@mui/material';
import * as yup from 'yup';
import { cleanCardNumber } from '../../helpers/clean_acc';
import credit_card_validation from '../../validation/card_validation'
import { CardDataContext } from '../../context/CardDataContext';
import { CountryContext } from '../../context/CountryContext';
import { useSnackbar } from 'notistack'
import { BarLoader } from 'react-spinners';
import { StyledButton } from '../../styles/global_styles';

const StyledTextField = styled(TextField)`
 margin-bottom:15px!important;
`


const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    background: white;
    padding: 10px;
    border-radius: 5px;
    align-items: center;
    max-width: 440px;
    padding-top: 80px;
`
const FormInner = styled.div`
display: flex;
    flex-direction: column;
    background: white;
    padding: px;
    padding-top: 0px;
`

const StyledTextFieldGrouped = styled.div`
display: flex;
flex-direction: row;
margin: 0px -10px!important;
margin-bottom:15px!important;
`

const StyledTextFieldGroupedInput = styled(TextField)`
width: calc(100% / 3 - 20px);
margin: 0px 10px!important;
`
const StyledFormOutter = styled.div`


`
const BtnHolder = styled.div`
display: flex;
margin:0px -10px!important;
`

const StyledFormCardHolder = styled.div`
margin-bottom: -75px;
width: 100%;
display: flex;
justify-content: center;
`
const AddCard = ({ setOpenModal }) => {
  const { countries, blocked_countries } = useContext(CountryContext)
  const { handleAddCard, card_data } = useContext(CardDataContext)
  const { enqueueSnackbar } = useSnackbar()
  const [flip, setFlip] = useState(true)

  let obj = {
    card_number: '',
    cvv: '',
    expiry_month: '',
    expiry_year: '',
    acc_holder: '',
    country: '',
  }

  let year = new Date()

  const validationSchema = yup.object({
    card_number: yup
      .string()
      .matches(/^[\d]+$/, 'Card Number must contain numbers only')
      .max(16, 'Card Number cant be more then 16 digits')
      .min(16, 'Card Number cant be less then 16 digits')
      .required('Card Number is required'),
    cvv: yup
      .string('Enter cvv number')
      .min(3, "Cvv must be 3 digits")
      .max(3, "Cvv must be 3 digits")
      .length(3)
      .required('required'),
    expiry_month: yup
      .number()
      .min(1, 'Expiry month must be between 1 to 12')
      .max(12, 'Expiry month must be between 1 to 12')
      .positive('Expiry month must be between 1 to 12')
      .integer('Expiry month must be an integer')
      .test('valid-month', 'Expiry month must be between 1 to 12', (value) => {
        return value >= 1 && value <= 12;
      })
      .required('required'),
    expiry_year: yup
      .number()
      .min(year.getFullYear() % 100, 'Expiry year must be between 23 to 30')
      .max((year.getFullYear() % 100) + 7, 'Expiry year must be between 23 to 30')
      .positive('Expiry year must be between 23 to 30')
      .integer('Expiry year must be an integer')
      .required('required'),
    acc_holder: yup
      .string('Enter account holder name')
      .min(4, "Account holder name cant be less then 4 characters")
      .max(16, "Account holder name cant be less more then 16 characters")
      .required('required'),
    country: yup
      .string('Select Country')
      .required('required')
      .test("is_banned", "This Country has been banned", (value) => !blocked_countries.map((c) => { return c.toLowerCase() }).includes((value).toLowerCase())),

  });




  const handleSumbit = (values, setSubmitting) => {
    setSubmitting(true)

    if (card_data.map((c) => c.card_number).includes(cleanCardNumber(values.card_number))) {
      enqueueSnackbar("Card Already Exist", { variant: 'error' })
      setSubmitting(false)
    } else {


      credit_card_validation(cleanCardNumber(values.card_number))
        .then((result) => {

          console.log("result", result)

          if (result?.card?.checkluhn == 1) {

            let cleaned_card = {
              bank: result.bank.name,
              card_number: cleanCardNumber(values.card_number),
              acc_holder: values.acc_holder,
              category: result.card.category,
              cvv: values.cvv,
              expiry_month: values.expiry_month,
              expiry_year: values.expiry_year,
              country: values.country,
              scheme: result.card.scheme,
              type: result.card.type,
            }
            setSubmitting(false)
            setOpenModal(false)
            enqueueSnackbar("Card Added", { variant: 'success' })
            handleAddCard(cleaned_card)
            setFlip(true)
          }
          else {
            setSubmitting(false)
            enqueueSnackbar(result.error, { variant: 'error' })
          }
        })
        .catch((error) => {
          enqueueSnackbar(error, { variant: 'error' })
          console.error(error);
          setSubmitting(false)
        })

    }

  }


  const handleChangeCustom = (setFieldValue,field,e,limitChar) => {
    if (e.target.value.toString().length <= limitChar) {
      setFieldValue(field,e.target.value);
    }
  };

  return (
    <div>
      <Formik
        initialValues={obj}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values)
            handleSumbit(values, setSubmitting)
          }, 400);
        }}
      >
        {({ isSubmitting, handleBlur, handleChange, values, touched, errors,setFieldValue }) => (
          <StyledFormOutter>
            <StyledFormCardHolder>  <Card data={values} flip={flip} /></StyledFormCardHolder>

            <StyledForm>

              <FormInner>
                <StyledTextField
                  onClick={() => { setFlip(false) }}
                  id="card_number"
                  name="card_number"
                  type='number'
                  placeholder="4148XXXXXXXX4886"
                  value={values.card_number}
                  onChange={(e) => handleChangeCustom(setFieldValue,"card_number",e,16)}
                  onBlur={handleBlur}
                  error={touched.card_number && Boolean(errors.card_number)}
                  helperText={touched.card_number && errors.card_number}
                />

                <StyledTextFieldGrouped>
                  <StyledTextFieldGroupedInput
                    onClick={() => { setFlip(false) }}
                    id="cvv"
                    name="cvv"
                    type='number'
                    placeholder="CVV"
                    maxLength="3"
                    value={values.cvv}
                    onChange={(e) => handleChangeCustom(setFieldValue,"cvv",e,3)}
                    onBlur={handleBlur}
                    error={touched.cvv && Boolean(errors.cvv)}
                    helperText={touched.cvv && errors.cvv}
                  />
                  <StyledTextFieldGroupedInput
                    onClick={() => { setFlip(false) }}
                    id="expiry_month"
                    name="expiry_month"
                    type='number'
                    placeholder="1"
                    value={values.expiry_month}
                    onChange={(e) => handleChangeCustom(setFieldValue,"expiry_month",e,2)}
                    onBlur={handleBlur}
                    error={touched.expiry_month && Boolean(errors.expiry_month)}
                    helperText={touched.expiry_month && errors.expiry_month}
                  />
                  <StyledTextFieldGroupedInput
                    onClick={() => { setFlip(false) }}
                    id="expiry_year"
                    name="expiry_year"
                    type='number'
                    value={values.expiry_year}
                    placeholder={`${year.getFullYear() % 100}`}
                    onChange={(e) => handleChangeCustom(setFieldValue,"expiry_year",e,2)}
                    onBlur={handleBlur}
                    error={touched.expiry_year && Boolean(errors.expiry_year)}
                    helperText={touched.expiry_year && errors.expiry_year}
                  />
                </StyledTextFieldGrouped>

                <StyledTextField
                  onClick={() => { setFlip(true) }}
                  id="country"
                  name="country"
                  placeholder="Select country"
                  select
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.country && errors.country}
                  helperText={touched.country && errors.country}
                  value={values.country}
                >

                  {countries?.map((c, index) => {
                    return (
                      <MenuItem value={c.name} key={index}>
                        {c.name}
                      </MenuItem>
                    )
                  })}
                </StyledTextField>


                <StyledTextField
                  onClick={() => { setFlip(true) }}
                  id="acc_holder"
                  name="acc_holder"
                  placeholder="MR Z ROBERTS"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.acc_holder && Boolean(errors.acc_holder)}
                  helperText={touched.acc_holder && errors.acc_holder}
                />


                {!isSubmitting ?

                  <BtnHolder>
                    <StyledButton color="primary" variant="contained" fullWidth type="submit" disabled={isSubmitting}>Submit</StyledButton>
                    <StyledButton color="warning" variant="contained" fullWidth onClick={() => { setOpenModal(false) }}>Cancel</StyledButton>
                  </BtnHolder>
                  :

                  <BarLoader color="#36d7b7" width="100%" />
                }

              </FormInner>
            </StyledForm>
          </StyledFormOutter>
        )}
      </Formik>

    </div>
  )
}

export default AddCard