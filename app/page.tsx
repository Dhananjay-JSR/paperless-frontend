import { Button, Divider } from "@nextui-org/react";
import Image from "next/image";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import CaptureImg from '../components/NewCap.png'
import Modi from '../components/Modi.png'
import Eye from '../components/Eye.png'
export default function Home() {
  return (
    <>
     <div className='z-10 relative flex flex-col'>
          <div className='z-10 fixed  block opacity-70 '>
          <img src={"https://nextui.org/gradients/docs-left.png"} alt='docs left background' draggable={false} className='relative z-10  shadow-black/5  shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large' />
          </div>
          <div className='fixed z-10 block opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%]  rotate-12 '>
          <img src='https://nextui.org/gradients/docs-right.png' draggable={false} alt='docs right background' className='relative z-10  shadow-black/5  shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large'/>
          </div>
        </div>
      <div className="max-w-7xl z-20 mx-auto p-4 flex-grow ">
        <div className="text-center mt-24 font-medium text-3xl">
          Share Code with{" "}
          <span className="from-[#9ae7ff] to-[#f06dee] bg-clip-text text-transparent bg-gradient-to-b tracking-tight inline font-semibold">
            {" "}
            Elegance
          </span>
          <br />
          Seamless{" "}
          <span className="from-[#7de5e0] to-[#0bffd6] bg-clip-text text-transparent bg-gradient-to-b tracking-tight inline font-semibold">
            Code Sharing
          </span>{" "}
          Made Easy
          <br />
          Explore{" "}
          <span className="from-[#b1e1f3] to-[#2ba8fb] bg-clip-text text-transparent bg-gradient-to-b tracking-tight inline font-semibold">
          &apos;Kode&apos;{" "}
          </span>
          - Your Code&apos;s New Home&apos;
        </div>
        <div className="flex w-full max-w-md justify-between mx-auto mt-16">
          <Button color="primary" href="/editor" as={Link} className="">
            Get Started
          </Button>
          <Button color="secondary" href="https://dhananjaay.dev" as={Link}>
            Learn More
          </Button>
        </div>
        <div className="mt-28 max-w-4xl mx-auto bg-white flex text-black font-semibold py-2 px-6 rounded-md justify-between ">
          <div className="flex gap-2 items-center">
            <CheckCircledIcon className="w-7 h-7  " color="lime" />
            Open Source
          </div>
          <div className="flex gap-2 items-center">
            <CheckCircledIcon className="w-7 h-7  " color="lime" />
            Fast Storage Engine
          </div>
          <div className="flex gap-2 items-center">
            <CheckCircledIcon className="w-7 h-7  " color="lime" />
            Sql Based
          </div>
        </div>
        <Divider className="mt-24" />
        <div className="mt-unit-lg">
          
          <Image src={CaptureImg}  alt="Image Preview" className="p-2 rounded-md border-2 blur-sm" />

        </div>
       
      </div>
      {/* Hello */}
    </>
  );
}
