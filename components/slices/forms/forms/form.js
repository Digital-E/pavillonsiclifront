import { useEffect, useContext } from 'react'
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";

import {Container, Input, TextArea, ButtonWrapper, MyTextInput, MyTextArea, MyCheckbox, MyCountryDropdown, Submit, StyledSelect, StyledErrorMessage, StyledLabel, MySelect} from './form-components'


function Component({ data, addEmailToList }) {


    return (
        <Container>
            <Formik
            initialValues={{
            name: "",
            email: "",
            information: "",
            }}
            validationSchema={Yup.object({
            name: Yup.string()
            .required("Required"),
            email: Yup.string()
            .email("Invalid")
            .required("Required"),
            information: Yup.string(),
            // checkboxOne: Yup.boolean()
            // .required("Required")
            // .oneOf([true], "You must accept the terms and conditions."),
            // checkboxTwo: Yup.boolean()
            // .required("Required")
            // .oneOf([true], "You must accept the terms and conditions.")
            })}
            onSubmit={async (values, { setSubmitting }) => {
            // await new Promise(r => setTimeout(r, 500));
            // setSubmitting(false);
            addEmailToList(values);
            }}
            >
            <Form>                 
                <MyTextInput
                label={'Name surname*:'}
                name="name"
                type="text"
                placeholder={''}
                />                                               
                <MyTextInput
                label={'Email address*:'}
                name="email"
                type="email"
                placeholder={''}
                />
                <MyTextArea
                label={''}
                name="information"
                placeholder={'How did your hear about us?'}
                />
                {/* <MyCheckbox
                name="checkboxOne"
                >
                I consent for my data to be used for the purpose of the Declaration
                </MyCheckbox> 
                <MyCheckbox
                name="checkboxTwo"
                >
                I have permission to sign on behalf of my business, team or institution
                </MyCheckbox>                               */}
                <Submit>Submit</Submit>
            </Form>
            </Formik>
        </Container>
    )
}

export default Component