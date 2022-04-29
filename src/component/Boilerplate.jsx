import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Header } from "./style/Header";
import { TextContainer } from "./style/TextContainer";
import { Button } from "./style/Button";
import DarkMode from "../context/Theme/ThemeContext";
import { globalStyles } from "./style/globalReset";
import { Footer } from "./style/Footer";
import { Container } from "./style/Context";
import { styled } from "@stitches/react";
import { InputTextBox } from "./style/InputTextBox";
import { API_URL } from "../util/ip";
function Boilerplate() {
  const [linkValidate, setlinkValidate] = useState(false);
  const [fetchingLink, setfetchingLink] = useState(false);
  const [receivedObj, setreceivedObj] = useState(false)
  const [DarkModeValue, SetDarkModeValue] = useContext(DarkMode);
  const PassRef = useRef();
  globalStyles();
  const { id } = useParams();
  function OnValidateSubmit() {
      axios
      .post(`${API_URL}/Storage/${id}`,{     
        password: PassRef.current.value
      },{
        withCredentials: true
      } )
      .then((res)=>{
        console.log(res) 
        setreceivedObj(res.data)
      }).catch((err)=>{
        console.log(err)  
        if (err.response.status===469){
          window.alert("Token Expired Please Refresh Page")
        }else if (err.response.status===410){
          window.alert("Password Didn't match")
        }
      })
  }

  useEffect(() => {
    fetch(`${API_URL}/Storage/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        setfetchingLink(true);
        console.log(res);
        if (res.status === 209) {
          setlinkValidate(true);
          console.log("Link matches but you are not authorised");
        }
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 404) {

          console.log("URL IS NOT REGISTER TO DATABASE" + err);
        }
        setfetchingLink(true);
      });
  }, []);

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
        <ModalWindow css={{
          position: 'relative'
        }} darkMode={DarkModeValue}>
          {fetchingLink ? (
            linkValidate ? 
            receivedObj? (
              <>
              <TextContainer css={{
                position: 'absolute',
                top: '0',
                fontFamily: 'system-ui',
                fontWeight: 'bold',
                fontSize: '4vh',
                left: '25%'
              }}>
                Extracted Text
              </TextContainer>
              <TextContainer
              css={{
                textAlign: "center",
                marginTop: "1vh",
                fontSize: "3vh",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              }}
            >
             {receivedObj}
            </TextContainer>
            
            </>
            ) : (
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
            )  : (
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
            )
          ) : (
            <TextContainer
              css={{
                textAlign: "center",
                marginTop: "1vh",
                fontSize: "3vh",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              }}
            >
              Checking if the Link is Valid for Not
            </TextContainer>
          )}
        </ModalWindow>
      </Container>
      <Footer darkMode={DarkModeValue}>
        Made By
        <TextContainer
          as="a"
          href="https://github.com/Dhananjay-JSR/paperless-frontend"
        >
          Dhananjay Senday
        </TextContainer>
        With ❤
      </Footer>
    </>
  );
}
export default Boilerplate;
