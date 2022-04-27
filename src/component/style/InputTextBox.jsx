import { styled } from "@stitches/react";

export const InputTextBox = styled('textarea',{
    width: '800px',
    height: '100px',
    padding: '10px 10px 10px 10px',
    maxWidth: '800px',
    resize: 'none',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '10px',
    fontSize: '20px',
    fontWeight: 'bold',
    transition: 'all',
    transitionDuration: '0.3s',
    variants: {
        "darkMode":{
            true: {
                backgroundColor: '#d2d2d2',
                color: 'black',
                border: '5px solid black'

            },
            false:{
                backgroundColor: '#151718',
                border: '5px solid white',
                color: 'White'
            }
        }
    },
    
})