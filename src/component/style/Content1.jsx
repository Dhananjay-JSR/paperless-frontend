import { styled } from "@stitches/react";
export const Content1 =  styled('div',{
    height: '100%',
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    transition: 'all',
    transitionDuration: '0.3s',
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