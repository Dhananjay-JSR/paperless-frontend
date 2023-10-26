'use client'
import Editor, { DiffEditor } from '@monaco-editor/react';
import { useRef } from 'react';

export default function Home() {
   
    const diffEditorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    diffEditorRef.current = editor;
  }

  function showOriginalValue() {
    alert(diffEditorRef.current.getOriginalEditor().getValue());
  }

  function showModifiedValue() {
    alert(diffEditorRef.current.getModifiedEditor().getValue());
  }

  return (
    <>
      <div className='bg-[#212121]'>
      {/* <Editor
        className='h-screen'
      defaultLanguage="javaScript"
      defaultValue="// let's write some broken code 😈"
      onValidate={(markers)=> {
        // model markers
        markers.forEach((marker) => console.log('onValidate:', marker.message));
      }}
    /> */}



      </div>
    </>)

}