import React,{useContext,useState,useEffect, useRef} from 'react'
import axios from 'axios';
import {useParams} from 'react-router-dom'
import { Header } from './style/Header';
import { TextContainer } from './style/TextContainer';
import { Button } from './style/Button';
import DarkMode from "../context/Theme/ThemeContext";
import { globalStyles } from "./style/globalReset";
import { Footer } from './style/Footer';
import { Container } from './style/Context';
import { styled } from '@stitches/react';
import { InputTextBox } from './style/InputTextBox';


function Boilerplate() {
  const [linkValidate, setlinkValidate] = useState(false)
  const [fetchingLink, setfetchingLink] = useState(false)
  const [DarkModeValue, SetDarkModeValue] = useContext(DarkMode);
  const PassRef = useRef();
  globalStyles();
  const {id} = useParams();

  function OnValidateSubmit(){
    axios
    .post(`https://paperless-backend-mongo.up.railway.app/storage/${id}`,{
      password: PassRef.current.value
    } )
    .then(()=>{

    }).catch((err)=>{
      if (err.response.status===403){
        window.alert("Token Expired Please Refresh Page")
      }else if (err.response.status===403){
        window.alert("Password Didn't match")
      }
    })
    
  }

useEffect(()=>{
  
  axios.get(`https://paperless-backend-mongo.up.railway.app/storage/${id}`,{

  }).then(res=>{
    setfetchingLink(true)
    // console.log(res);1
    
    if(res.status===209){
      setlinkValidate(true)
      // console.log("You are not Autorised")
    }
  
  }).catch(err=>{if(err.response.status===404){console.log("URL IS NOT REGISTER TO DABASE"+err)};setfetchingLink(true)})
},[])

  function ThemeChanger() {
    SetDarkModeValue(!DarkModeValue);
  }

  
  const ModalWindow = styled("div", {
    backgroundColor: "Yellow",
    height: "32vh",
    width: "29vw",
    borderRadius: "2.5vh",
    position: "relative",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    variants: {
      darkMode: {
        false: {
          backgroundColor: "#151718",
          border: "0.2vh solid white",
          color: "White",
        },
        true: {
          backgroundColor: "#f5f5f5",
          color: "Black",
          border: "0.2vh solid black",
        },
      },
    },
  });


  return (
    <>
        <Header darkMode={DarkModeValue}>
        <TextContainer>
          PaperLess
          <Button
            css={{
              position: "absolute",
              right: "6vw",
              top: "1vh",
            }}
            onClick={ThemeChanger}
            darkMode={DarkModeValue}
          >
            Dark Mode
          </Button>
        </TextContainer>
      </Header>
      <Container darkmode={DarkModeValue}>
           <ModalWindow darkMode={DarkModeValue}>
            {fetchingLink? (linkValidate ? 
            <>
                      <TextContainer
            css={{
              textAlign: "center",
              marginTop: "1vh",
              fontSize: "3vh",
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
          >
            ENTER YOUR PASSWORD
            
          </TextContainer>
            <InputTextBox
              css={{
                width: "20vw",
                height: "2vh",
                overflowY: "hidden",
                marginBottom: "10vh",
              }}
              ref={PassRef}
              placeholder="ENTER PASSWORD TO DECRYPT IT"
              // ref={passInput}
              // disabled={disabled}
              darkMode={DarkModeValue}
            ></InputTextBox>
                      <Button
            darkMode={DarkModeValue}
            onClick={() => {
              // setopen((prev) => !prev);
              // setrequest_sent(false);
              // setreceived_data(false)
              // setnotifyTimeout(false)
              OnValidateSubmit();
            }}
            css={{
              position: "absolute",
              bottom: "2vh",
              right: "2vw",
            }}
          >
            Submit
          </Button>
              </>
             : 
             <TextContainer
             css={{
               textAlign: "center",
               marginTop: "1vh",
               fontSize: "3vh",
               fontWeight: "bold",
               fontFamily: "sans-serif",
             }}
           >
             Link is Not Valid
             
           </TextContainer>
           ) :  <TextContainer
             css={{
               textAlign: "center",
               marginTop: "1vh",
               fontSize: "3vh",
               fontWeight: "bold",
               fontFamily: "sans-serif",
             }}
           >
             Checking if the Link is Valid for Not
             
           </TextContainer>}
           </ModalWindow>
      </Container>
      <Footer darkMode={DarkModeValue}>
        Made By
        <TextContainer
          as="a"
          href="https://github.com/Dhananjay-JSR/paperless-frontend"
        >
         
          DS
        </TextContainer>
        With ❤
      </Footer>
    </>
  )
}

export default Boilerplate