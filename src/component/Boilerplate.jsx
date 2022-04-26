import React from 'react'
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

     </div>
    </>
  )
}

export default Boilerplate