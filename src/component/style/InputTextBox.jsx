import { styled } from "@stitches/react";

export const InputTextBox = styled('textarea',{
    width: '41vw',
    height: '10vh',
    padding: '1vh 1vh 1vh 1vh',
    maxWidth: '41vw',
    resize: 'none',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '1vh',
    fontSize: '2vh',
    fontWeight: 'bold',
    transition: 'all',
    transitionDuration: '0.3s',
    '&:focus':{
        outline: 'none'
    },
    variants: {
        "darkMode":{
            true: {
                backgroundColor: '#d2d2d2',
                color: 'black',
                border: '0.5vh solid black'

            },
            false:{
                backgroundColor: '#151718',
                border: '0.5vh solid white',
                color: 'White'
            }
        },
    },
    
})