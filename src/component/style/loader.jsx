import { styled,keyframes } from "@stitches/react";
const spinner = keyframes({
    '0%':{transform: 'rotate(0deg)'},
    '100%':{transform: 'rotate(360deg)'}
})
export const Loader = styled('div',{
    border: '8px solid #f3f3f3',
    borderTop: '8px solid #3498db',
    borderRadius: '50%',
    width: '5px',
    height: '5px',
    animation: `${spinner} 3s infinite`,
})