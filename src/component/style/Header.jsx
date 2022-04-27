import { styled } from "@stitches/react";

export const Header = styled('div',{
    height: '5rem',
    fontSize: 'xx-large',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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