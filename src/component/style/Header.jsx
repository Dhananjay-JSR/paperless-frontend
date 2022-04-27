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
            0: {
                backgroundColor: 'white',
                color: 'Black'
            },
            1:{
                backgroundColor: 'Black',
                color: 'White'

            }
        }
    }
})