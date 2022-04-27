import React,{useContext} from 'react'
import { globalStyles } from './style/globalReset'
import { Button } from './style/Button'
import { Header } from './style/Header';
import { TextContainer } from './style/TextContainer';
import DarkMode from '../context/Theme/ThemeContext';

function Home() {
  const ThemeConsumer = useContext(DarkMode)
  globalStyles()
function ThemeChanger(){
  console.log("Hello")
}
  return (
   <>

 <DarkMode.Provider>
  <Header darkMode={ThemeConsumer}>
    <TextContainer>
    PaperLess
    <Button css={{
      position: 'fixed',
      right: '60px'
    }} onClick={ThemeChanger} darkMode={ThemeConsumer}>Dark Mode</Button>
    </TextContainer>
  </Header>
        <div>
       
        </div>

        </DarkMode.Provider>

   </>

  )
}

export default Home
