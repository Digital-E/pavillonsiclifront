import { useContext } from "react";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import { store } from "../../store";


const Container = styled.div`

    padding: 0;
    box-sizing: border-box;

    label {
      text-transform: lowercase;
      display: none;
    }

    form {
        position: relative;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
    }

    @media(max-width: 1330px) {
      form {
        flex-direction: column;
      }
    }

    form input {
        background: rgba(0, 0, 0, 0.1);
        padding: 0 20px;
        border: 1px solid transparent;
        height: 140px;
        font-size: 3rem;
        color: white;
        box-sizing: border-box;
        backdrop-filter: blur(10px);
    }

    form input:hover, form input:focus  {
    //   border: 1px solid white;
      outline: none;
    }

    form input::placeholder {
        color: white;
        font-size: 3rem;
    }

    .text-input {
        width: 100%;
    }

    .text-input.error {
        border: 1px solid red;
    }

    .error-label {
      position: absolute;
      right: 10px;
      color: gray;
    }


    .checkbox {
        display: flex;
        // align-items: center;
        margin-bottom: 15px;
        cursor: pointer;
    }

    .checkbox > input {
        height: 15px;
        width: 15px;
        min-height: 15px;
        min-width: 15px;
        border-radius: 999px;
        -webkit-appearance: none;
        border: 1px solid #AC9E95;
        margin-right: 25px;
    }

    .checkbox > input:checked {
        background: #b0b0b0;
    }

    button {
        position: absolute;
        right: 0;
        -webkit-appearance: none;
        border: none;
        background: none;
        width: fit-content;
        margin: 0 20px;
        height: 100%;
        font-size: 3rem;
        color: white;
        cursor: pointer;
    }

    .disabled {
        pointer-events: none;
        opacity: 0.3;
    }

    @media(max-width: 989px) {
      form input {
        font-size: 1rem;
        height: 80px;
      }

      form input::placeholder {
        font-size: 1rem;
      }

      button {
        font-size: 1rem;
      }
    }
`;

const Input = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 100%;
`

let hasInteracted = false


const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);

  if(meta.value !== '') {
    hasInteracted = true
  }

  return (
    <Input>
      <label htmlFor={props.id || props.name} className="medium-font-size">{label}*</label>
      <input className={meta.touched && meta.error && meta.value ? "text-input error medium-font-size" : "text-input medium-font-size"} {...field} {...props} />
      {/* {meta.touched && meta.error ? (
        <div className="error-label">{meta.error}</div>
      ) : null} */}
    </Input>
  );
};

const Submit = ({ children, ...props}) => {
    const {isValid, touched } = useFormikContext();
    let isActive = false

    if(isValid === true && hasInteracted) {
        isActive = true
    } else {
        isActive = false
    }


    return (
        <button type="submit" id="submit-button" className={isActive ? null : "disabled"}>
            {children}
        </button>
    )
}


// And now we can use these
const SignupForm = ({ data, hasSubmitted }) => {
  //Context
  const context = useContext(store);
  const { state, dispatch } = context; 

  const addEmailToList = async (values) => {
    let dataObj = {
      email: values.email,
    }

    // dispatch({type: "update notification message", value: "Thanks for subscribing!"})

    sessionStorage.setItem('art4BioUserEmail', values.email)

    return hasSubmitted()
  }

  return (
    <Container>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid")
            .required("Required")
        })}
        onSubmit={async (values, { setSubmitting }) => {
          // await new Promise(r => setTimeout(r, 500));
          // setSubmitting(false);
          addEmailToList(values);
        }}
      >
        <Form>                         
            <MyTextInput
            label={'Sign up'}
            name="email"
            type="email"
            placeholder={'Email address'}
            />       
            <Submit>Start</Submit>
        </Form>
      </Formik>
    </Container>
  );
};

export default SignupForm
