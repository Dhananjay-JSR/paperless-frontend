"use client";
import Editor, { useMonaco } from "@monaco-editor/react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  Select,
  SelectItem,
  useDisclosure,
  ModalFooter,
  Spinner,
} from "@nextui-org/react";
import axios from "axios";
import React from "react";
import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const LanguageSpecs = [
    {
      value: "javascript",
      label: "Javascript",
    },
    {
      value: "typescript",
      label: "Typescript",
    },
    {
      value: "python",
      label: "Python",
    },
    {
      value: "css",
      label: "CSS",
    },
    {
      value: "html",
      label: "HTML",
    },
    {
      value: "xml",
      label: "XML",
    },
    {
      value: "sql",
      label: "SQL",
    },
    {
      value: "coffeescript",
      label: "CoffeeScript",
    },
    {
        value : "cpp",
        label : "C++"
    }
  ];
const router = useRouter()
  const diffEditorRef = useRef(null);
  const [languageServer, setLanguageServer] = React.useState("javascript");
  const [codeInput, setCodeInput] = React.useState<any>("");
  const [codeOutput, setCodeOutput] = React.useState<any>("");

  const monaco = useMonaco();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isRequesting, setIsRequesting] = React.useState(false);
  // React.useEffect(()=>{
  //     if (monaco){
  //         monaco.editor.defineTheme('myCustomTheme', {
  //         });
  //     }
  // },[monaco])
  return (
    <>
    <div><Toaster/></div>
      <div className=" flex-grow  flex   flex-col max-w-7xl mx-auto   min-h-full">
        <div className="w-full my-4 flex justify-between px-2 items-center">
          <Select
            size="sm"
            label="Select a Language Server"
            color="default"
            value={languageServer}
            isRequired
            onChange={(e) => {
              let value = e.target.value;
              setLanguageServer(value);
            }}
            defaultValue={"Select language Server"}
            className="max-w-sm"
          >
            {LanguageSpecs.map((item, index) => {
              return (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              );
            })}
            {/* <SelectItem  key={1} >
                
            </SelectItem> */}
          </Select>
          <Button isDisabled={codeInput==""} onPress={async()=>{
            if (codeInput==""){
                alert("Bhai kuch toh daal")
                return 
            }
            setIsRequesting(true)
            try{

                let Data = await   axios.post(process.env.NEXT_PUBLIC_URL+"/api/StorageEngine",{
                    code:codeInput,
                    language:languageServer
                })
                
                let JSONDATA = Data.data
                // console.log(JSONDATA.URL)
                setCodeOutput((prev:any)=>JSONDATA.URL)
                toast("Click Copy to copy the link")
                setIsRequesting(false)
                onOpen()
            }
            catch(err){
                window.alert("Error Occured")
                window.location.reload()
            }
                
                // .then((res)=>{
                //     let data = JSON.parse(res.data)
                //     setCodeOutput(data.URL)
                //     console.log(data)
                // }).catch((err)=>{
                // setIsRequesting(false)
                // onOpen()
                // })
          }}>Create Link</Button>
          <Modal
            isDismissable={false}
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            classNames={{
              backdrop:
                "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
            }}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 px-5">
                    {isRequesting ? "Creating Link" : "Link Created..  "+process.env.NEXT_PUBLIC_URL+"/code/"+codeOutput}
                  </ModalHeader>
                  <ModalBody>
                    {isRequesting ? <Spinner/> : "Link Created"}
                  </ModalBody>
                  <ModalFooter>
                    {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button> */}
                    <Button
                    isDisabled={isRequesting}
                      color="primary"
                      onPress={() => {
                        window.navigator.clipboard.writeText(
                            process.env.NEXT_PUBLIC_URL+"/code/"+codeOutput
                        );
                        onClose();
                        router.push("/code/"+codeOutput)
                        
                      }}
                    >
                      Copy
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <div className="max-w-7xl mb-4 w-full border-2 rounded-md">
          <Editor
            beforeMount={(monaco) => {
              monaco.editor.defineTheme("onedark", {
                base: "vs-dark",
                inherit: true,
                rules: [
                  {
                    token: "comment",
                    foreground: "#5d7988",
                    fontStyle: "italic",
                  },
                  { token: "constant", foreground: "#e06c75" },
                ],
                colors: {
                  "editor.background": "#21252b",
                },
              });
            }}
            className="w-full"
            height="68vh"
            theme="vs-dark"
            value={codeInput}
            onChange={(value)=>{
                setCodeInput(value)
            }}
            width={"100%"}
            defaultLanguage={"javascript"}
            language={languageServer}
            defaultValue="// Crafted By Dhananjay With love"
          />
        </div>
      </div>
    </>
  );
}
