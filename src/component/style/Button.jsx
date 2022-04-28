import { styled } from "@stitches/react";


   export const Button = styled('button',{

        borderRadius: '9999px',
        border: '0',
        fontSize: '2vh',
        transition: 'all',
        transitionDuration: '0.1s',
        paddingRight: '1.5vh',
        paddingLeft: '1.5vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1vh',
        '&:active':{
            transform: 'scale(1.5)'
        },
        variants: {
            "darkMode":{
                true: {
                    backgroundColor: 'BLACK',
                    color: 'white',
                    border: '0.2vh solid black',
                    '&:hover': {
                        backgroundColor: 'black',
                        color: 'white',
                        border: '0.2vh solid black',
                        
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
