import { styled } from "@stitches/react";

export const Header = styled('div',{
    height: '5rem',
    fontSize: 'xx-large',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all',
    width: '100vw',
    border: '1px solid black',
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