import { styled,keyframes } from "@stitches/react";
const spinner = keyframes({
    '0%':{transform: 'rotate(0deg)'},
    '100%':{transform: 'rotate(360deg)'}
})
export const Loader = styled('div',{
    borderRadius: '50%',
    width: '5px',
    height: '5px',
    animation: `${spinner} 3s infinite`,
    variants:{
        "darkMode":{
            true:{
                border: '8px solid #151718',
                borderTop: '8px solid White',
            },
            false:{
                border: '8px solid #d2d2d2',
                borderTop: '8px solid Black',
            }
        }
    }
})