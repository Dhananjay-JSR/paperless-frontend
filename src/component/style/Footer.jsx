import { styled } from "@stitches/react";

export const Footer = styled('div',{
    height: '7vh',
    fontSize: '4vh',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all',
    position: 'fixed',
    bottom: '0',
    width: '100%',
    borderTop: '0.1vh solid black',
    boxSizing: 'border-box',
    transitionDuration: '0.3s',
    'variants':{
        "darkMode":{
            false: {
                backgroundColor: '#151718',
                color: 'White'
            },
            true:{
                backgroundColor: '#d2d2d2',
                color: 'Black'

            }
        }
    }
})