import React from 'react'
import {Text} from '@nextui-org/react'

function Footer() {
  return (
    <div className='text-white fixed bottom-0 h-20 bg-[#111111] w-full text-center'>
        <Text h4 b weight="bold" size={30} css={
            {
                textGradient: "45deg, $yellow500 -20%, $red500 100%",
            }
        }>
            Made By Dhananjay Senday With Love
        </Text>
    </div>
  )
}

export default Footer