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
      .get(`${API_URL}/Storage/${id}`,{     // FIX: NEED TO REMOVE THIS POST
        password: PassRef.current.value
      },{
        withCredentials: true
      } )
      .then((res)=>{
        console.log(res)  // FIX: NEED TO REMOVE THIS
        setreceivedObj(res.data)
      }).catch((err)=>{
        console.log(err)  // FIX: NEED TO REMOVE THIS
        if (err.response.status===469){
          window.alert("Token Expired Please Refresh Page")
        }else if (err.response.status===410){
          window.alert("Password Didn't match")
        }
      })

      // async function postData(url = '', data = {}) {
      //   // Default options are marked with *
      //   const response = await fetch(url, {
      //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
      //     mode: 'cors', // no-cors, *cors, same-origin
      //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //     credentials: 'include', // include, *same-origin, omit
      //     headers: {
      //       'Content-Type': 'application/json'
      //       // 'Content-Type': 'application/x-www-form-urlencoded',
      //     },
      //     redirect: 'follow', // manual, *follow, error
      //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      //     body: JSON.stringify(data) // body data type must match "Content-Type" header
      //   });
      //   return response.json(); // parses JSON response into native JavaScript objects
      // }
      
      // postData(`${API_URL}/Storage/${id}`,{
      //     password: 42
      //   })
      //   .then(data => {
      //     console.log(data); // JSON data parsed by `data.json()` call
      //   }).catch(err=>{
      //     console.log(err)
      //   });





    // let _data = {
    //   password: PassRef.current.value,
    // }

    // fetch(`https://paperless-backend-mongo.up.railway.app/storage/${id}`, {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   credentials:  "include",
    //   method: "POST",
    //   body: JSON.stringify(_data),
    // })
    //   .then((data) => console.log("Data Recieved" + JSON.stringify(data)))
    //   .catch((err) => {
    //     console.log(err)
    //     // if (err.response.status === 403) {
    //     //   window.alert("Token Expired Please Refresh Page");
    //     // } else if (err.response.status === 410) {
    //     //   window.alert("PassWord Didn't Match");
    //     // }
    //   });
  }

  useEffect(() => {

    
    // axios.get(`https://paperless-backend-mongo.up.railway.app/storage/${id}`,{
    //   withCredentials: true
    // }).then(res=>{
    //   setfetchingLink(true)
    //   // console.log(res);1

    //   if(res.status===209){
    //     setlinkValidate(true)
    //     // console.log("You are not Autorised")
    //   }

    // }).catch(err=>{if(err.response.status===404){console.log("URL IS NOT REGISTER TO DABASE"+err)};setfetchingLink(true)})





    fetch(`${API_URL}/Storage/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        setfetchingLink(true);
        // console.log(res);
        if (res.status === 209) {
          setlinkValidate(true);
          // console.log("Link matches but you are not authorised");
        }
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 404) {
          window.alert("URL IS NOT REGISTER TO DATABASE")
          // console.log("URL IS NOT REGISTER TO DABASE" + err);
        }
        setfetchingLink(true);
      });





    // axios.defaults.withCredentials = true;
    // axios.get(`${API_URL}/Storage/${id}`,{
    //   withCredentials: true
    // })
    //    .then((res) => {
    //     setfetchingLink(true);
    //     // console.log(res);
    //     if (res.status === 209) {
    //       setlinkValidate(true);
    //       // console.log("Link matches but you are not authorised");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     if (err.response.status === 404) {
    //       window.alert("URL IS NOT REGISTER TO DATABASE")
    //       // console.log("URL IS NOT REGISTER TO DABASE" + err);
    //     }
    //     setfetchingLink(true);
    //   });






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
          DS
        </TextContainer>
        With ❤
      </Footer>
    </>
  );
}

export default Boilerplate;
