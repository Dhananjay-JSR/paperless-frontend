// import React,{useState} from 'react'
// // import {Text,Button,Modal,Row,Input,Checkbox} from '@nextui-org/react'
// import axios from 'axios';
// import querystring  from 'query-string'

// function Container() {
//     const [textData, setTextData] = useState("")
//     const [password,setPassword] = useState(0)
//     const [received, setreceived] = useState('block')
//     const [received2, setreceived2] = useState('none')
//     const [hashedLink, sethashedLink] = useState("")
   
    
    
//     const content = { message: textData,password:password };

//     function SaveData(){

//         axios.post('https://paperless-backend-mongo.up.railway.app/storage', content)
//           .then(function (response) {
//             setreceived('none')
//             setreceived2('block')
//             sethashedLink(response.data.HashedLink)
        
//           })
//           .catch(function (error) {
//             console.log(error);
//           });
//     }


//     const handler = () => setVisible(true);

//     const [visible, setVisible] = React.useState(false);
//     const closeHandler = () => {
//         setreceived('block')
//         setreceived2('none')
//         setVisible(false);
//         console.log("closed");
//       };



//   return (
//    <>
//    <div className='text-center text-white'>
//     <div className='font-bold text-4xl pt-9 mb-48'>
//         INTRODUCING
//     </div>
//     <Text className=''
//         h1
//         size={70}
//         weight="bold"
//                 css={{
//                     textGradient: "45deg, $blue500 -20%, $pink500 50%",
//                   }}>
//             PAPERLESS
//         </Text>
//     <div className='pt-36 text-4xl font-bold'>
//         A PRIVACY FOCUSED
//     </div>
//     <div className='pt-6 text-2xl font-bold'>
//         TEXT SHARING WEBAPP
//     </div>
//     <div className='p-7 text-1xl font-bold'>
//         ENCRPTION DATA , ZERO ADS , HASHED URL , NO TRACKING and many more features coming soon
//     </div>
//     <div>

//         <input className='w-[99rem] rounded-md h-28 text-black text-' type="text" onChange={(e)=>{
//             setTextData(e.target.value)
//         }} />
//         <br />
//     <button className='bg-gray-500 w-20 h-7 rounded-t-none mt-6  active:scale-150 transition-all' onClick={handler}> GET LINK </button>
//     </div>
//       </div>
//       <Modal
//         closeButton
//         aria-labelledby="modal-title"
//         open={visible}
//         onClose={closeHandler}
//       >
//         <Modal.Header>

//             <Text b size={18}>
//               PAPERLESS
          
//           </Text>
//         </Modal.Header>
//         <Modal.Body>
//         <Text css={{
//             display: received2  
//         }}>
//        {hashedLink}
//         </Text>
        
//           <Input
//           css={{
//               display: received
//           }}
//             clearable
//             bordered
//             fullWidth
//             color="primary"
//             size="lg"
//             placeholder="Password"
//             type="number"
//             value={password}
//             onChange={(e)=>{setPassword(e.target.value)}}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button auto flat color="error" onClick={closeHandler}>
//             Close
//           </Button>
//           <Button auto onClick={SaveData}>
//             SEND
//           </Button>
//         </Modal.Footer>
//       </Modal>
//    </>
//   )
// }

// export default Container