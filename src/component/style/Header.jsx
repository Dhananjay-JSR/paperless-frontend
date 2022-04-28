import { styled } from "@stitches/react";

export const Header = styled('div',{
    height: '7vh',
    fontSize: '4vh',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all',
    width: '100%',
    position: "relative",
    border: '0.1vh solid black',
    transitionDuration: '0.3s',
    'variants':{
        "darkMode":{
            false: {
                backgroundColor: '#151718',
                color: 'White'
            },
            true:{
                backgroundColor: '#d2d2d2',
                color: 'Black'

            }
        }
    }
})