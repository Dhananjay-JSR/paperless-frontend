import React, { useContext, useState } from "react";
import { globalStyles } from "./style/globalReset";
import { Button } from "./style/Button";
import { Header } from "./style/Header";
import { TextContainer } from "./style/TextContainer";
import DarkMode from "../context/Theme/ThemeContext";
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
      <div></div>
  
    </>
  );
}

export default Home;
