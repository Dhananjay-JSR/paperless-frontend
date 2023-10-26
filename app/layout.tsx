import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'
import { Providers } from './providers'
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import Logo from '../components/Logo.png'
import clsx from 'clsx'

// import { Image } from 'next/image'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kode By Dhananjay Senday',
  description: 'Dhanaanjay Senday\'s Code Sharing Platform',
}

function NavBar(){
  return <nav className='bg-white/10 z-30 rounded-md w-full max-w-7xl h-12 mx-auto flex  items-center px-5'>
    <div className='flex justify-between w-full'>
    <Button color="success" variant="light" className='text-3xl'>KODE</Button>
    <div className='text-2xl flex gap-7'>
      {/* <div className=''> */}
      <Link href='/'>
        FEATURES
      </Link>
      {/* </div> */}
      
<Link href='/'>

        ABOUT
</Link>
      
  <Link>
        DOCS
  </Link>    
      
    </div>
    <div className='flex items-center'>
      <Button  color='primary' size='sm' as={Link} href='https://www.buymeacoffee.com/dhananjayjsr' className='ml-3'>Buy Me Coffee</Button>
    </div>
    </div>
  </nav>
}

function Footer(){
return <nav className='bg-white/10 z-20 rounded-md  mt-auto max-w-7xl h-12 mx-auto w-full flex  justify-center  items-center px-5'>
Crafted with ❤️ by <Link href='http://dhananjaay.dev' color='primary' className='ml-1'>Dhananjay Senday</Link>
</nav>
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className+" dark text-foreground bg-background   flex-shrink-0  w-full"}>
      <Providers>
        <div className='flex flex-col min-h-screen p-4'>

        <NavBar/>
      
<main className='z-20 px-5 flex-grow justify-center items-center flex'>


      {children}
</main>
     
      {/* <div className='select-none relative flex flex-col'>
          <div className='select-none fixed  block opacity-70 '>
          <img src={"https://nextui.org/gradients/docs-left.png"} alt='docs left background' draggable={false} className='relative z-10 select-none shadow-black/5  shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large' />
          </div>
          <div className='fixed block opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12 select-none'>
          <img src='https://nextui.org/gradients/docs-right.png' draggable={false} alt='docs right background' className='relative z-10 select-none  shadow-black/5  shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large'/>
          </div>
        </div> */}

<div className='z-10 relative flex flex-col'>
          <div className='z-10 fixed  block opacity-70 '>
          <img src={"https://nextui.org/gradients/docs-left.png"} alt='docs left background' draggable={false} className='relative z-10  shadow-black/5  shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large' />
          </div>
          <div className='fixed z-10 block opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%]  rotate-12 '>
          <img src='https://nextui.org/gradients/docs-right.png' draggable={false} alt='docs right background' className='relative z-10  shadow-black/5  shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large'/>
          </div>
        </div>

        <Footer/>
        </div>
        </Providers>
      </body>
    </html>
  )
}
