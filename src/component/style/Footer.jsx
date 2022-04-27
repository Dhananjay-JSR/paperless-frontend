import { styled } from "@stitches/react";

export const Footer = styled('div',{
    height: '5rem',
    fontSize: 'xx-large',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all',
    position: 'fixed',
    bottom: '0',
    width: '100vw',
    borderTop: '1px solid black',
    boxSizing: 'border-box',
    transitionDuration: '0.3s',
    'variants':{
        "darkMode":{
            false: {
                backgroundColor: 'white',
                color: 'Black'
            },
            true:{
                backgroundColor: 'Black',
                color: 'White'

            }
        }
    }
})