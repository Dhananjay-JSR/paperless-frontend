import { styled,keyframes } from "@stitches/react";


const floating  = keyframes({
    '0%':{transform: 'translate(0, 0vh)'},
    '50%':{transform: 'translate(0, 1.5vh)'},
    '100%':{transform: 'translate(0, 0vh)'},
  });
  export const Content_1_HeadLine = styled('div',{
    margin: '2vh',
    fontSize: '5vh',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    animation: `${floating} 3s infinite`,
    variants: {
      "darkMode":{
          true: {
            '&::selection':{
              color: 'white',
              background: 'black',
            }
          },
          false:{
            '&::selection':{
              color: 'black',
              background: 'white',
            }
          }
      }
  },
})