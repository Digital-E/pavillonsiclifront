import { useEffect, useState, useContext } from "react";

import styled from "styled-components";

import FormOne from "./forms/form"

import { store } from "../../../store";


const Container = styled.div``


// And now we can use these
const Form = ({ data }) => {
  //Context
  const context = useContext(store);
  const { state, dispatch } = context;  


  const addEmailToList = async (values, index) => {

    console.log(values)

    let dataObj = {
      subject: `New Token Request from: ${values.email}`,
      message: values.information
    }

  try {
      const res = await fetch("/api/email", {
        "method": "POST",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(dataObj)
      })
      .then((response) => response.json())
      .then(res => {
        console.log(res)
        if(res.status !== 404 && res.status !== 400) {
          setTimeout(() => {
            document.querySelectorAll(".text-input").forEach(item => {
                item.value="";
            })
          }, 2000)

          // Trigger Notification
          dispatch({type: "update notification message", value: "Thanks for requesting, we'll be in touch soon!"})
        } else {
          // Trigger Notification
          dispatch({type: "update notification message", value: `Oops, there seems to have been an error: ${JSON.parse(res.response.text).message}`})
        }
      })
    } catch (error) {
          alert(error);
    }
  }


  useEffect(() => {
    setTimeout(() => {
      let allInputs = document.querySelectorAll('.my-text-input');

      allInputs.forEach(item => {
        let labelWidth = item.children[0].getBoundingClientRect().width;
  
        if(window.innerWidth < 990) {
          item.children[1].style.paddingLeft = `${labelWidth + 15}px`
        } else {
          item.children[1].style.paddingLeft = `${labelWidth + 30}px`
        }
      })
    }, 250)
  });

  return (
    <Container>
        <FormOne data={data} addEmailToList={(values) => addEmailToList(values)} />
    </Container>
  );
};

export default Form
