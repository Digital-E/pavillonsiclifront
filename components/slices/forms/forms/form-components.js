import { useEffect, useState } from 'react'
import { useField, useFormikContext } from "formik";

import styled from "styled-components";

import Button from "../../../button";

import { gsap } from "gsap";

import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);


const Container = styled.div`
    padding: 0;

    label {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 20px;
        color: white;
        pointer-events: none;
        font-size: 1.125rem;
    }

    @media(max-width: 989px) {
      label {
        left: 10px;
      }
    }

    form {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    form input {
        background-color: rgba(255, 255, 255, 0.2);
        padding: 5px 20px;
        border: 1px solid transparent;
        width: 100%;
        height: 50px;
        color: var(--secondary-color);
        border-radius: 0;
        font-size: 1.125rem;
    }

    @media(max-width: 989px) {
      form input {
        // padding: 10px;
      }
    }

    form textarea {
        background-color: rgba(255, 255, 255, 0.2);
        padding: 20px;
        border: 1px solid transparent;
        width: 100%;
        height: 160px;
        color: white;
        resize: vertical;
        font-size: 1.125rem;
        border-radius: 0;
    }

    @media(max-width: 989px) {
      form textarea {
        padding: 15px 10px;
      }
    }

    form input::placeholder,
    form textarea::placeholder
        {
        color: white;
    }

    form input:focus,
    form input:hover,
    form textarea:focus,
    form textarea:hover,
    form select:focus,
    form select:hover {
        outline: none;
    }

    input.text-input {
      height: 60px;
      box-sizing: border-box;
    }

    .error {
        border: 1px solid red;
    }

    .error-label {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        color: gray;
        font-size: 18px;
    }


    .checkbox {
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
    }

    .checkbox > input {
        position: relative;
        height: 15px;
        width: 15px;
        min-height: 15px;
        min-width: 15px;
        -webkit-appearance: none;
        border: 1px solid var(--ternary-color);
        margin-right: 10px;
        padding: 0;
        cursor: pointer;
    }

    .checkbox > input:checked::after {
        content: '';
        width: 15px;
        height: 15px;
        background: url('icons/tick.svg') no-repeat center;
        position: absolute;
        left: -1px;
        top: -1px;
    }

    .checkbox label {
        position: relative;
        left: 0;
        transform: none;
        margin-top: 3px;
    }

    .checkbox-error input {
        border: 1px solid red;
    }

    .checkbox-error label {
        color: red;
    }

    button {

    }

    .disabled {
        // pointer-events: none;
        // opacity: 0.3;
    }
`;

const Input = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    margin-bottom: 1px;
`

const TextArea = styled.div`
    position: relative;
    display: flex;
    width: 100%;
`

const SubmitMessageDesktop = styled.div`
    @media(max-width: 989px) {
      display: none;
    }
`

const SubmitMessageMobile = styled.div`
    @media(min-width: 990px) {
      display: none;
    }
`


const ButtonWrapper = styled.button`
  > div {
    padding-left: 75px;
    padding-right: 75px;
  }
`

let initButton = false;

let removeError = false;


const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);

  useEffect(() => {
    initButton = false
  }, []);
  

  return (
    <Input className='my-text-input'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className={meta.touched && meta.error && ( meta.value || initButton ) ? "text-input error" : "text-input"} {...field} {...props} />
      {meta.touched && meta.error && ( meta.value || initButton ) ? (
        <div className="error-label">{meta.error}</div>
      ) : null}
    </Input>
  );
};

const MyTextArea = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <TextArea>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className={meta.touched && meta.error ? "text-input error" : "text-input"} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error-label">{meta.error}</div>
      ) : null}
    </TextArea>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  
  return (
    <>
      <div className={meta.touched && meta.error ? "checkbox checkbox-error" : "checkbox"}>
        <input {...field} {...props} type="checkbox" />
        <label className="small-text" htmlFor={props.id || props.name}>{children}</label>
      </div>
      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  );
};

const Submit = ({ children, ...props}) => {
    const {isValid, touched } = useFormikContext();
    let isActive = false
    let [refresh, setRefresh] = useState(false)

    // if(isValid === true && Object.entries(touched).length !== 0) {
    //     isActive = true
    // } else {
    //     isActive = false
    // }

    let refreshTimeout = () => {
      setTimeout(() => {
        setRefresh(!refresh)
      }, 3000)
    }

    let checkIfDisabled = (e) => {
      initButton = true
      removeError = true

      if(initButton && !props.isSubscribeForm) {

        let body = document.body.getBoundingClientRect().top
        let target = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getBoundingClientRect().top

        let targetPosition = target - body - 160

        gsap.to(window, {duration: 1, ease: 'power3.inOut', scrollTo: targetPosition, onComplete: () => { removeError = false; refreshTimeout()} });
      }
    }

    return (
      <ButtonWrapper type="submit" id="submit-button" 
      // className={isActive ? null : "disabled"}
      onClick={(e) => checkIfDisabled(e)}
      >
        <Button>
            <SubmitMessageDesktop>{isValid ? children : (initButton && removeError && !props.isSubscribeForm ? 'PLEASE FILL IN MANDATORY FIELDS' : children)}</SubmitMessageDesktop>
            <SubmitMessageMobile>{children}</SubmitMessageMobile>
        </Button>
      </ButtonWrapper>
    )
}

const MyCountryDropdown = ({ label, ...props}) => {
  const [field, meta] = useField(props);


  return (
    <Select className='my-text-input'>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <select
        className={meta.touched && meta.error && (initButton)? "error" : ""} 
        {...field} {...props} value={field.value.country}>
        <option></option>
        {countries.map((item) => <option value={item.name.common}>{item.name.common}</option>)}
      </select>
      {meta.touched && meta.error && ( meta.value || initButton ) ? (
        <div className="error-label">{meta.error}</div>
      ) : null}
      <Arrows>
        <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.00094 4.15019H8.05902C9.04843 4.15019 9.43633 2.86697 8.6131 2.31814L5.63973 0.335899C4.96793 -0.111967 4.09273 -0.111966 3.42093 0.3359L0.447563 2.31814C-0.375674 2.86697 0.0115276 4.15019 1.00094 4.15019ZM1.00094 8.25151H8.05902C9.04843 8.25151 9.43633 9.53473 8.6131 10.0836L5.63973 12.0658C4.96793 12.5137 4.09273 12.5137 3.42093 12.0658L0.447563 10.0836C-0.375674 9.53473 0.0115276 8.25151 1.00094 8.25151Z" fill="#999999"/>
        </svg>        
      </Arrows>      
    </Select>
  )
}

const Select = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    height: 60px;

    select {
      width: 100%;
      -webkit-appearance: none;
      background-color: transparent;
      border: none;
      border-radius: 0;
      color: var(--secondary-color);
      border: 1px solid var(--ternary-color);
    }

    label {
      margin: 0;
    }

    .error-label {
      right: 40px;
    }
`;

const StyledSelect = styled.select``

const Arrows = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  margin-top: 2px;
`


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


export {Container, Input, TextArea, ButtonWrapper, MyTextInput, MyTextArea, MyCheckbox, MyCountryDropdown, Submit, StyledSelect, StyledErrorMessage, StyledLabel, MySelect}