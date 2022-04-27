import React from 'react'
import axios from 'axios';
import {useParams} from 'react-router-dom'

function Boilerplate() {

    
    const handler = () => setVisible(true);

    const [visible, setVisible] = React.useState(false);
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
      };
      
      
    const {id} = useParams();
    console.log(id)
  return (
    <>
     <div className='bg-[#000000] h-screen'>
     <div className='h-full w-full flex flex-col items-center place-content-center'>
       <div className='h-52 w-52 bg-white rounded-xl animate-pulse'>

       </div>
       <div className='text-white mt-48 animate-bounce text-5xl'>
           CHECKING IF THE LINK IS VALID OR NOT
       </div>
        
    </div>
     </div>
    </>
  )
}

export default Boilerplate