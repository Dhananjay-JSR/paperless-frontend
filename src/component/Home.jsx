import React, { useContext, useRef, useState } from "react";
import { globalStyles } from "./style/globalReset";
import { Button } from "./style/Button";
import { Header } from "./style/Header";
import { TextContainer } from "./style/TextContainer";
import DarkMode from "../context/Theme/ThemeContext";
import { Footer } from "./style/Footer";
import { Container } from "./style/Context";
import { Content1 } from "./style/Content1";
import { Content2 } from "./style/Content2";
import { Content_1_HeadLine as HeadLine } from "./style/Content_1_HeadLine";
import { InputTextBox } from "./style/InputTextBox";
import { keyframes, styled } from "@stitches/react";
import { Loader } from "./style/loader";
import axios from "axios";
function Home() {
  const [DarkModeValue, SetDarkModeValue] = useContext(DarkMode);
  const [open, setopen] = useState(false);
  const [msgBox, setmsgBox] = useState("");

  const passInput = useRef();
  const [received_data, setreceived_data] = useState(false);
  const [request_sent, setrequest_sent] = useState(false);
  const [disabled, setdisabled] = useState(false);
  const [notifyTimeout, setnotifyTimeout] = useState(false)
  // let request_sent = false;
  globalStyles();
  function ThemeChanger() {
    SetDarkModeValue(!DarkModeValue);
  }

  const [hashedLink, sethashedLink] = useState("");
  function submitData() {
    setrequest_sent(!request_sent);
    // console.log(passInput.current.value);
    // console.log(msgBox);
    
    let content = {
      message: msgBox,
      password: +passInput.current.value,
    };
    axios
      .post("https://paperless-backend-mongo.up.railway.app/storage", content)
      .then(function (response) {
        setreceived_data(response.data.HashedLink);
        navigator.clipboard.writeText(response.data.HashedLink);
        // console.log(response.data.HashedLink);
        setTimeout(() => {
          setnotifyTimeout(true)
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //NOTICATION
const revealNotification= keyframes({
  "0%":{
    transform: 'translate(0,-50px)',
    opacity: 0
  },
  "100%":{transform: 'translate(0,0)',
opacity: "100%"
}
})


const Notification = styled('div',{
  position: 'fixed',
  right: '100px',
  zIndex: 10,
  width: '500px',
  height: '50px',
  borderRadius: '15px',
  fontSize: '30px',
  fontFamily: 'system-ui',
  fontWeight: 'bold',
  textAlign: 'center',
  top: '150px',
 
  variants:{
    "darkmode":{
      true:{

        border: '2px solid black',
        background: '#f5f5f5',
        color: 'Black'
      },
      false:{
        border: '2px solid white',
        background: '#151718',
        color: 'white'
      }
    },
    "ending":{
      true:{
        animation: `${revealNotification} 2s reverse`,
        animationFillMode: 'forwards'
      },
      false:{
        animation: `${revealNotification} 2s `,
      }
    }
  }

})



  //NOTIFICATION END HERE
  //MODAL
  const revealModal = keyframes({
    "0%": { opacity: "0%" },
    100: { opacity: "100%" },
  });
  const Modal = styled("div", {
    position: "fixed",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 7,
    backdropFilter: "blur(15px)",
    animation: `${revealModal} 0.2s 1 `,
    variants: {
      display: {
        false: {
          display: "none",
        },
        true: {
          display: "flex",
        },
      },
    },
  });

  const ModalWindow = styled("div", {
    backgroundColor: "Yellow",
    height: "20rem",
    width: "35rem",
    borderRadius: "25px",
    position: "relative",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    variants: {
      darkMode: {
        false: {
          backgroundColor: "#151718",
          border: "2px solid white",
          color: "White",
        },
        true: {
          backgroundColor: "#f5f5f5",
          color: "Black",
          border: "2px solid black",
        },
      },
    },
  });

  //MODAL
  return (
    <>
    {received_data?  <Notification ending={notifyTimeout} darkmode={DarkModeValue}>
      Link Added to Clipboard
    </Notification> : ""}
      <Modal display={open}>
        <ModalWindow darkMode={DarkModeValue}>
          <TextContainer
            css={{
              textAlign: "center",
              marginTop: "10px",
              fontSize: "xx-large",
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
          >
            {received_data?"Copy Your Link" : "ENTER YOUR PASSWORD"}
            
          </TextContainer>
          {request_sent ? (
            <TextContainer
              css={{
                width: "500px",
                height: "60px",
                overflowY: "hidden",
                marginBottom: "100px",
                fontSize: "21px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {received_data
                ? received_data
                : "Waiting for Server to Respond Back"}
            </TextContainer>
          ) : (
            <InputTextBox
              css={{
                width: "400px",
                height: "20px",
                overflowY: "hidden",
                marginBottom: "100px",
              }}
              placeholder="ENTER PASSWORD TO ENCRYPT IT"
              ref={passInput}
              disabled={disabled}
              darkMode={DarkModeValue}
            ></InputTextBox>
          )}
          {received_data? "" :
          <Button
          
            darkMode={DarkModeValue}
            onClick={() => {
              if (passInput.current.value === "") {
                window.alert("Enter Valid password");
              } else {
                submitData();
              }
            }}
            css={{
              position: "absolute",
              bottom: "20px",
              right: "180px",
            }}
          >
            {request_sent ? <Loader darkMode={DarkModeValue} /> : ``}
            <div>{request_sent ? `` : `Submit`}</div>
          </Button>
          }
          <Button
            darkMode={DarkModeValue}
            onClick={() => {
              setopen((prev) => !prev);
              setrequest_sent(false);
              setreceived_data(false)
            }}
            css={{
              position: "absolute",
              bottom: "20px",
              right: "40px",
            }}
          >
            Cancel
          </Button>
        </ModalWindow>
      </Modal>
      <Header darkMode={DarkModeValue}>
        <TextContainer>
          PaperLess
          <Button
            css={{
              position: "fixed",
              right: "60px",
              top: "1.25rem",
            }}
            onClick={ThemeChanger}
            darkMode={DarkModeValue}
          >
            Dark Mode
          </Button>
        </TextContainer>
      </Header>
      <Container>
        <Content1 darkMode={DarkModeValue}>
          <HeadLine darkMode={DarkModeValue}>INTRODUCING</HeadLine>
          <HeadLine
            css={{
              fontSize: "100px",
              background:
                "linear-gradient(90deg, #FEAC5E 0%, #C779D0 50%, #4BC0C8 100%)",
              "-webkit-background-clip": "text",
              "-webkit-text-fill-color": "transparent",
              animationDelay: "2s",
              animationTimingFunction: "ease-in-out",
            }}
          >
            PaperLess
          </HeadLine>
          <HeadLine darkMode={DarkModeValue}>A MODERN PASTEBIN</HeadLine>
          <HeadLine darkMode={DarkModeValue}>PRIMARILY FOCUS ON</HeadLine>
          <HeadLine darkMode={DarkModeValue}>SECURITY</HeadLine>
        </Content1>
        <Content2 darkMode={DarkModeValue}>
          <HeadLine
            darkMode={DarkModeValue}
            css={{
              fontSize: "60px",
              fontWeight: "bold",
              marginTop: "70px",
              width: "max-content",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "70px",
              animation: "none",
            }}
          >
            Ready to Experience the Future ?
          </HeadLine>
          <InputTextBox
            placeholder="INSERT YOUR NOTE HERE"
            darkMode={DarkModeValue}
            value={msgBox}
            onChange={(e) => {
              setmsgBox(e.target.value);
            }}
          ></InputTextBox>
          <Button
            onClick={() => {
              if (msgBox === "") {
                window.alert("Enter Valid Message");
              } else {
                setopen((prev) => !prev);
              }
            }}
            css={{
              width: "fit-content",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "30px",
            }}
            darkMode={DarkModeValue}
          >
            Let's Go !
          </Button>
        </Content2>
      </Container>
      <Footer darkMode={DarkModeValue}>
        Made By{" "}
        <TextContainer
          as="a"
          href="https://github.com/Dhananjay-JSR/paperless-frontend"
        >
          {" "}
          Dipesh{" "}
        </TextContainer>{" "}
        With ❤
      </Footer>
      <div></div>
    </>
  );
}

export default Home;
