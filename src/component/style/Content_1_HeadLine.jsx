import { styled,keyframes } from "@stitches/react";


const floating  = keyframes({
    '0%':{transform: 'translate(0, 0px)'},
    '50%':{transform: 'translate(0, 15px)'},
    '100%':{transform: 'translate(0, -0px)'},
  });
  export const Content_1_HeadLine = styled('div',{
    margin: '20px',
    fontSize: '50px',
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