import { useContext } from "react";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import { store } from "../store";


const Container = styled.div`

    padding: 0;
    box-sizing: border-box;
    width: fit-content;

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
        background-color: rgba(255, 255, 255, 0.2);
        padding: 5px 40px 5px 20px;
        border: 1px solid black;
        color: var(--black);
        box-sizing: border-box;
        border-radius: 999px;
    }

    form input:hover, form input:focus  {
      outline: none;
    }

    form input::placeholder {
        color: var(--grey);
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
        top: 2px;
        -webkit-appearance: none;
        border: none;
        background: none;
        width: fit-content;
        margin: 0;
        height: auto;
        padding: 0 20px;
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




const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
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

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  );
};

const Submit = ({ children, ...props}) => {
    const {isValid, touched } = useFormikContext();
    let isActive = false

    if(isValid === true) {
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

// Styled components ....
const StyledSelect = styled.select`
  color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

const MySelect = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

// And now we can use these
const SignupForm = ({ data }) => {
  //Context
  const context = useContext(store);
  const { state, dispatch } = context; 

  const addEmailToList = async (values) => {
    let dataObj = {
      email: values.email,
      audienceId: '16016b1a51',
    }

  try {
      const res = await fetch("/api/subscribe-mailchimp", {
        "method": "POST",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(dataObj)
      })
      .then((response) => response.json())
      .then(data => {
        if(data.status !== 400) {
          dispatch({type: "update notification message", value: "Thanks for subscribing!"})
          setTimeout(() => {
            document.querySelectorAll(".text-input").forEach(item => {
              item.value="";
            })
          }, 10)
        } else {
          document.querySelectorAll(".text-input").forEach(item => {
            // item.value="";
            // document.querySelector("#submit-button").innerText = data.error
            // item.placeholder = data.message;
          })
          dispatch({type: "update notification message", value: `Oops, there seems to have been an error!`})
          // dispatch({type: "update notification message", value: `Oops, there seems to have been an error: ${data.error}`})
        }
      })
    } catch (error) {
          alert(error);
    }
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
          addEmailToList(values);
        }}
      >
        <Form>                         
            <MyTextInput
            label={'Sign up'}
            name="email"
            type="email"
            placeholder={'e-mail'}
            />       
            <Submit>{'→'}</Submit>
        </Form>
      </Formik>
    </Container>
  );
};

export default SignupForm
