import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Formik, Form } from 'formik';
import { TextField } from '@mui/material';
import * as yup from 'yup';
import Papa from 'papaparse';
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
 
`
const FormInner = styled.div`
display: flex;
    flex-direction: column;
    background: white;
  
    padding-top: 0px;
`

const BtnHolder = styled.div`
display: flex;
margin:0px -10px!important;
`
const AddBulkCard = ({ setOpenModal }) => {

  const { blocked_countries } = useContext(CountryContext)
  const { handleAddCard, card_data } = useContext(CardDataContext)
  const { enqueueSnackbar } = useSnackbar()

  const validFileExtensions = { csv: ['csv'] };

  function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
  }

  let obj = {
    file: '',
  }

  const validationSchema = yup.object({
    file: yup
      .mixed()
      .required("Required")
      .test("is-valid-type", "Not a valid csv type",
        value => isValidFileType(value && value.name.toLowerCase(), "csv"))
  });


  const handleParse = (values, setSubmitting) => {

    Papa.parse(values.file, {
      skipEmptyLines: true,
      complete: function (results, file) {
        console.log("Parsing complete:", results.data);
        handleSumbit(results.data, setSubmitting)
      }
    })

  }

  const handleSumbit = (values, setSubmitting) => {
    setSubmitting(true)



    for (let index = 0; index < values.length; index++) {
      const element = values[index];
      let card_number = element[1]

      if (card_data.map((c) => c.card_number).includes(cleanCardNumber(card_number))) {
        enqueueSnackbar(`Card Number ${cleanCardNumber(card_number)} Already Exist`, { variant: 'error' })
        setSubmitting(false)
      } else {

        if (!blocked_countries.map((c) => { return c.toLowerCase() }).includes((element[5]).toLowerCase())) {

          credit_card_validation(cleanCardNumber(card_number))
            .then((result) => {
              if (result?.card?.checkluhn == 1) {

                let cleaned_card = {
                  bank: result.bank.name,
                  card_number: cleanCardNumber(card_number),
                  acc_holder: element[0],
                  category: result.card.category,
                  cvv: element[2],
                  expiry_month: element[3],
                  expiry_year: element[4],
                  country: element[5],
                  scheme: result.card.scheme,
                  type: result.card.type,
                }

                handleAddCard(cleaned_card)

                setOpenModal(false)
                enqueueSnackbar("Card Added", { variant: 'success' })
                setSubmitting(false)
              }  else {
                setSubmitting(false)
                enqueueSnackbar(result.error, { variant: 'error' })
              }
            })
            .catch((error) => {
              console.log("error", error)
              enqueueSnackbar(error, { variant: 'error' })
              setSubmitting(false)
            })

        } else {
          enqueueSnackbar(`Country ${element[5]} Banned`, { variant: 'error' })
          setSubmitting(false)
        }
      }
    }

  }


  return (
    <div>
      <Formik
        initialValues={obj}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {

            handleParse(values, setSubmitting)
          }, 400);
        }}
      >
        {({ isSubmitting, handleBlur, handleChange, values, touched, errors, setFieldValue }) => (

          <StyledForm>

            <FormInner>

              <StyledTextField
                id="file"
                name="file"
                type='file'
  

                onChange={(e) => { setFieldValue("file", e.target.files[0]) }}
                onBlur={handleBlur}
                error={touched.file && Boolean(errors.file)}
                helperText={touched.file && errors.file}
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
        )}
      </Formik>

    </div>
  )
}

export default AddBulkCard