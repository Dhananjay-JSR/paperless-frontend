import React, { useContext } from "react";
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
function Home() {
  const [DarkModeValue,SetDarkModeValue]= useContext(DarkMode)
  console.log(DarkModeValue)
  globalStyles();
  function ThemeChanger() {
    SetDarkModeValue(!DarkModeValue)
  }
  return (
    <>
     
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

            <HeadLine >
              INTRODUCING
            </HeadLine>
            <HeadLine css={{
              fontSize: '100px',
              background: 'linear-gradient(90deg, #FEAC5E 0%, #C779D0 50%, #4BC0C8 100%)',
              '-webkit-background-clip': 'text',
              '-webkit-text-fill-color': 'transparent',
              animationDelay: '2s',
              animationTimingFunction: 'ease-in-out'
            }}>
            PaperLess
            </HeadLine>
            <HeadLine>
            A MODERN PASTEBIN
            </HeadLine>
            <HeadLine>
            PRIMARILY FOCUS ON 
            </HeadLine>
            <HeadLine>
            SECURITY 
            </HeadLine>
            </Content1>
            <Content2 darkMode={DarkModeValue}>
            <TextContainer
            placeholder="INSERT YOUR NOTE HERE"
            
            css={{
              fontSize: "60px",
              fontWeight: 'bold',
              marginTop: "70px",
              width: 'max-content',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '70px'

            }}>
              Ready to Experience the Future ?
            </TextContainer>
            <InputTextBox darkMode={DarkModeValue}>
            </InputTextBox>
            <Button
            
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
