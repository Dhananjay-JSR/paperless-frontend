import { styled } from "@stitches/react";


   export const Button = styled('button',{

        borderRadius: '9999px',
        fontSize: '13px',
        border: '0',
        fontSize: 'x-large',
        transition: 'all',
        transitionDuration: '0.1s',
        paddingRight: '15px',
        paddingLeft: '15px',
        margin: '2px',
        '&:active':{
            transform: 'scale(1.5)'
        },
        variants: {
            "darkMode":{
                true: {
                    backgroundColor: 'BLACK',
                    color: 'white',
                    border: '2px solid black',
                    '&:hover': {
                        backgroundColor: 'black',
                        color: 'white',
                        border: '2px solid white',
                        
                      },
                    

                },
                false:{
                    backgroundColor: 'White',
                    color: 'BLACK',
                    border: '2px solid black',
                    '&:hover': {
                        backgroundColor: 'white',
                        color: 'Black',
                        border: '2px solid black',
                        
                      },
                }
            }
        },

    })
