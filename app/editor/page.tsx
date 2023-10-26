'use client'
import Editor, { DiffEditor, useMonaco } from '@monaco-editor/react';
import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';
import { useRef } from 'react';

export default function Home() {

    const LanguageSpecs = [{
        value : 'javascript',
        label : 'Javascript'
    },{
        value : 'typescript',
        label : 'Typescript'
    },{
        value: 'python',
        label : 'Python'
    },{
        value: "css",
        label: "CSS"

    },{
        value: "html",
        label: "HTML"
    },{
        value: "xml",
        label: "XML"
    },{
        value: "sql",
        label: "SQL"
    },{
        value:"coffeescript",
        label:"CoffeeScript"
    }]
   
    const diffEditorRef = useRef(null);
const [languageServer,setLanguageServer] = React.useState('javascript')

const monaco =useMonaco();

// React.useEffect(()=>{
//     if (monaco){
//         monaco.editor.defineTheme('myCustomTheme', {

//         });
//     }
// },[monaco])
  return (
    <>
    <div className=' flex-grow  flex   flex-col max-w-7xl mx-auto   min-h-full'>
    <div className='w-full my-4'>
    <Select size='sm' label="Select a Language Server" 
 color='default' value={languageServer}  isRequired onChange={(e)=>{
        let value = e.target.value
        setLanguageServer(value)
    }} defaultValue={"Select language Server"} className='max-w-sm'>
        {LanguageSpecs.map((item,index)=>{
            return <SelectItem key={index} value={item.value} >{item.label}</SelectItem>
        })}
        {/* <SelectItem  key={1} >
            
        </SelectItem> */}
    </Select>
    </div>
      <div className='max-w-7xl w-full border-2 rounded-md'>
        <Editor
        beforeMount={(monaco)=>{
            monaco.editor.defineTheme('onedark', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                  {
                    token: 'comment',
                    foreground: '#5d7988',
                    fontStyle: 'italic'
                  },
                  { token: 'constant', foreground: '#e06c75' }
                ],
                colors: {
                  'editor.background': '#21252b'
                }
              });
        }}
        className='w-full'
        height="68vh"
        theme='vs-dark'
        width={"100%"}
        defaultLanguage={'javascript'}
        language={languageServer}
        defaultValue="// Crafted By Dhananjay With love"
        // onMount={handleEditorDidMount}
        />


        </div>


      </div>
    </>)

}