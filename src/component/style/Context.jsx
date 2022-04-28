import { styled } from "@stitches/react";

export const Container = styled('div',{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '86vh',
    variants:{
        'darkmode':{
            true:{
               
                backgroundColor: 'White'
            },
            false:{
                backgroundColor: 'Black'
            }
        }
    }
})