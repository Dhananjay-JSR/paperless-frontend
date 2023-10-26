import { Button, Divider } from '@nextui-org/react'
import Image from 'next/image'

export default function Home() {
  return (
   <>
   <div className='max-w-7xl mx-auto p-4 flex-grow '>
    <div className='text-center mt-12 font-medium text-3xl'>

   Share Code with <span className='from-[#9ae7ff] to-[#f06dee] bg-clip-text text-transparent bg-gradient-to-b tracking-tight inline font-semibold'> Elegance</span>
   <br/>
Seamless  <span className='from-[#7de5e0] to-[#0bffd6] bg-clip-text text-transparent bg-gradient-to-b tracking-tight inline font-semibold'>Code Sharing</span> Made Easy
<br/>
Explore <span className='from-[#b1e1f3] to-[#2ba8fb] bg-clip-text text-transparent bg-gradient-to-b tracking-tight inline font-semibold'>'Kode' </span>- Your Code's New Home"
    </div>
<div className='flex w-full max-w-md justify-between mx-auto mt-16'>

    <Button color='primary' className=''>Get Started</Button>
    <Button color='secondary' className=''>Learn More</Button>
</div>
    <Divider className='mt-36'/>
   </div>
   {/* Hello */}
   </>
  )
}
