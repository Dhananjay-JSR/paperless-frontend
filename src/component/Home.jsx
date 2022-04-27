import React, { useContext,useState } from "react";
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
function Home() {


  const [DarkModeValue,SetDarkModeValue]= useContext(DarkMode)
  const [open, setopen] = useState(false)
  globalStyles();


  function ThemeChanger() {
    SetDarkModeValue(!DarkModeValue)
  }


function onsubmit(){
  setopen(prev=>!prev)
}
//MODAL
  const Modal = styled('div',{
    position: 'fixed',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 7,
     backdropFilter: 'blur(15px)',
    variants: {
      "display":{
        false:{
          display: 'none'
        },
        true:{
          display: 'flex'
        }
      },
    }
  })

const ModalWindow=styled('div',{
  backgroundColor: 'Yellow',
  height: '20rem',
  width: '35rem',
  borderRadius: '25px',
  variants:{
    "darkMode":{
      false: {

        backgroundColor: '#151718',
        border: '2px solid white',
        color: 'White'
      },
      true:{
        backgroundColor: '#d2d2d2',
        color: 'Black',
        border: '2px solid black'

      }
  }
  }
  


})

  //MODAL
  return (
    <>
    <Modal display={open}>
        <ModalWindow darkMode={DarkModeValue} >
        <TextContainer css={{
          textAlign: 'center',
          marginTop: '10px',
          fontSize: 'xx-large',
          fontWeight: 'bold',
          fontFamily: 'ui-monospace'
        }}>
          ENTER YOUR PASSWORD
        </TextContainer>
        </ModalWindow>
    </Modal>
      <Header darkMode={DarkModeValue}>
        <TextContainer>
          PaperLess
          <Button
            css={{
              position: "fixed",
              right: "60px",
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

            <HeadLine darkMode={DarkModeValue}>
              INTRODUCING
            </HeadLine>
            <HeadLine 
            
            css={{
              fontSize: '100px',
              background: 'linear-gradient(90deg, #FEAC5E 0%, #C779D0 50%, #4BC0C8 100%)',
              '-webkit-background-clip': 'text',
              '-webkit-text-fill-color': 'transparent',
              animationDelay: '2s',
              animationTimingFunction: 'ease-in-out'
            }}>
            PaperLess
            </HeadLine >
            <HeadLine darkMode={DarkModeValue}>
            A MODERN PASTEBIN
            </HeadLine>
            <HeadLine darkMode={DarkModeValue}>
            PRIMARILY FOCUS ON 
            </HeadLine>
            <HeadLine darkMode={DarkModeValue}>
            SECURITY
            </HeadLine>
            </Content1>
            <Content2 darkMode={DarkModeValue}>
            <HeadLine
            
            darkMode={DarkModeValue}
            css={{
              fontSize: "60px",
              fontWeight: 'bold',
              marginTop: "70px",
              width: 'max-content',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '70px',
              animation: 'none'
            }}>
              Ready to Experience the Future ?
            </HeadLine>
            <InputTextBox placeholder="INSERT YOUR NOTE HERE" darkMode={DarkModeValue}>
            </InputTextBox>
            <Button
            onClick={onsubmit}
            css={{
            width: 'fit-content',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '30px'
            }}
            darkMode={DarkModeValue}
            >
              Let's Go !
            </Button>
            </Content2>
      </Container>
      <Footer darkMode={DarkModeValue}>
        Made By <TextContainer as="a" href="https://github.com/Dhananjay-JSR/paperless-frontend"> Dipesh </TextContainer> With ❤
      </Footer>
      <div></div>
  
    </>
  );
}

export default Home;
