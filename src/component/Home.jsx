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
import { API_URL } from "../util/ip";

function Home() {
  axios.defaults.withCredentials = true;
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

  function submitData() {
    setrequest_sent(!request_sent);
    let content = {
      message: msgBox,
      password: passInput.current.value,
    };
    axios
      .post(`${API_URL}/Storage`, content)
      .then(function (response) {
        setreceived_data(response.data.HashedLink);
        setTimeout(() => {
          setnotifyTimeout(true)
        }, 3000);
        navigator.clipboard.writeText(response.data.HashedLink);
      })
      .catch(function (error) {
        window.alert("Error Occured "+error)
      });
  }
const revealNotification= keyframes({
  "0%":{
    transform: 'translate(0,-5vh)',
    opacity: 0
  },
  "100%":{transform: 'translate(0,0)',
opacity: "100%"
}
})
const Notification = styled('div',{
  position: 'fixed',
  right: '10vw',
  zIndex: 10,
  width: '30vw',
  height: '5vh',
  borderRadius: '1.5vh',
  fontSize: '3vh',
  fontFamily: 'system-ui',
  fontWeight: 'bold',
  textAlign: 'center',
  top: '15vh',
  variants:{
    "darkmode":{
      true:{
        border: '0.2vh solid black',
        background: '#f5f5f5',
        color: 'Black'
      },
      false:{
        border: '0.2vh solid white',
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
    backdropFilter: "blur(1.5vh)",
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
              marginTop: "1vh",
              fontSize: "3vh",
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
          >
            {received_data?"Copy Your Link" : "ENTER YOUR PASSWORD"}
            
          </TextContainer>
          {request_sent ? (
            <TextContainer
              css={{
                width: "50vw",
                height: "6vh",
                overflowY: "hidden",
                marginBottom: "10vh",
                fontSize: "2.1vh",
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
                width: "20vw",
                height: "2vh",
                overflowY: "hidden",
                marginBottom: "10vh",
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
              bottom: "2vh",
              right: "9vw",
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
              setnotifyTimeout(false)
            }}
            css={{
              position: "absolute",
              bottom: "2vh",
              right: "2vw",
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
      <Container>
        <Content1 darkMode={DarkModeValue}>
          <HeadLine darkMode={DarkModeValue}>INTRODUCING</HeadLine>
          <HeadLine
            css={{
              fontSize: "10vh",
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
              fontSize: "5vh",
              fontWeight: "bold",
              marginTop: "5vh",
              width: "max-content",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "5vh",
              animation: "none",
            }}
          >
            Ready to Experience the Future ?
          </HeadLine>
          <InputTextBox
          spellCheck={"false"}
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
              marginTop: "3vh",
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
          DS
        </TextContainer>{" "}
        With ❤
      </Footer>
      <div></div>
    </>
  );
}

export default Home;
