import { styled,keyframes } from "@stitches/react";
const spinner = keyframes({
    '0%':{transform: 'rotate(0deg)'},
    '100%':{transform: 'rotate(360deg)'}
})
export const Loader = styled('div',{
    borderRadius: '10vh',
    width: '0.4vw',
    height: '0.8vh',
    animation: `${spinner} 3s infinite`,
    variants:{
        "darkMode":{
            true:{
                border: '0.6vh solid grey',
                borderTop: '0.6vh solid white',
            },
            false:{
                border: '0.6vh solid #d2d2d2',
                borderTop: '0.6vh solid Black',
            }
        }
    }
})