import { styled } from "@stitches/react";
export const Content2 =  styled('div',{
    height: '100%',
    width: '60%',
    transition: 'all',
    transitionDuration: '0.3s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    variants: {
        "darkMode":{
            true: {
                backgroundColor: 'white',
                color: 'Black'
            },
            false:{
                backgroundColor: 'Black',
                color: 'White'

            }
        }
    }
})