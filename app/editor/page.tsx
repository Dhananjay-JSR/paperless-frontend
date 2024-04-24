"use client";
import Editor, { useMonaco } from "@monaco-editor/react";
import * as MON from "monaco-editor";
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
  Input,
} from "@nextui-org/react";
import * as Y from "yjs";
import axios from "axios";
import React, { useEffect } from "react";
import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
// import { WebrtcProvider } from "y-webrtc";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";
import { CodeContentActionType, CodeContext } from "../provider/Provider";
const ydocument = new Y.Doc();
//only provides TURN server for now , so only local connections are possible
// TODO: WebSoc is not scalable , use webrtc in future
// const provider = new WebrtcProvider("rpmmy", ydocument);
// const provider = new WebsocketProvider(
//   "ws://localhost:1234",
//   "my-roomname",
//   ydocument
// );

function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

// const type = ydocument.getText("monaco");

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
      value: "cpp",
      label: "C++",
    },
  ];
  const router = useRouter();
  const diffEditorRef = useRef(null);
  const [languageServer, setLanguageServer] = React.useState("javascript");
  const [codeInput, setCodeInput] = React.useState<any>(
    "// Crafted By Dhananjay With love"
  );
  const [codeOutput, setCodeOutput] = React.useState<any>("");

  const monaco = useMonaco();
  const editorRef = useRef();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [UserNameInput, setUserNameInput] = React.useState("");
  const [isRequesting, setIsRequesting] = React.useState(false);
  const [currentModalType, setCurrentModalType] = React.useState<
    "LINK_GENERATED" | "COLAB_SESSION"
  >("LINK_GENERATED");
  const { dispatch } = React.useContext(CodeContext);

  // useEffect(() => {
  //   if (
  //     editorRef != null &&
  //     editorRef.current &&
  //     editorRef.current.getModel()
  //   ) {

  //   }
  // }, [editorRef]);
  // React.useEffect(()=>{
  //     if (monaco){
  //         monaco.editor.defineTheme('myCustomTheme', {
  //         });
  //     }
  // },[monaco])
  // function handleEditorDidMount(editor: any, monaco: any) {
  //   // here is the editor instance
  //   // you can store it in `useRef` for further usage
  //   if (typeof window !== "undefined") {
  //     const monacoBinding = new MonacoBinding(
  //       type,
  //       editor.getModel(),
  //       new Set([editor]),
  //       provider.awareness
  //     );
  //   }
  // }
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className=" flex-grow  flex   flex-col max-w-7xl mx-auto   min-h-full">
        <div className="w-full my-4 flex justify-between px-2 items-center">
          <Select
            size="sm"
            label="Select a Language Server"
            color="default"
            value={languageServer}
            defaultSelectedKeys={["javascript"]}
            isRequired
            onChange={(e) => {
              let value = e.target.value;
              setLanguageServer(value);
            }}
            defaultValue={"javascript"}
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
          <div>
            {/* <Link
              href={{
                pathname: "/collaborate",
                query: { id: makeid(4) },
                
              }}
            ></Link> */}
            <Button
              onPress={() => {
                setCurrentModalType("COLAB_SESSION");
                onOpen();
              }}
              className="mr-5"
            >
              Create Collaborative Session
            </Button>
            <Button
              isDisabled={codeInput == ""}
              onPress={async () => {
                setCurrentModalType("LINK_GENERATED");
                if (codeInput == "") {
                  alert("Bhai kuch toh daal");
                  return;
                }
                setIsRequesting(true);
                try {
                  let Data = await axios.post(
                    process.env.NEXT_PUBLIC_URL + "/api",
                    {
                      code: codeInput,
                      language: languageServer,
                    }
                  );

                  let JSONDATA = Data.data;
                  // console.log(JSONDATA.URL)
                  setCodeOutput((prev: any) => JSONDATA.URL);
                  toast("Click Copy to copy the link", {
                    position: "bottom-right",
                  });
                  setIsRequesting(false);
                  onOpen();
                } catch (err) {
                  window.alert("Error Occured");
                  window.location.reload();
                }

                // .then((res)=>{
                //     let data = JSON.parse(res.data)
                //     setCodeOutput(data.URL)
                //     console.log(data)
                // }).catch((err)=>{
                // setIsRequesting(false)
                // onOpen()
                // })
              }}
            >
              Create Link
            </Button>
          </div>
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
                  {currentModalType == "LINK_GENERATED" ? (
                    <>
                      <ModalHeader className="flex flex-col gap-1 px-5">
                        {isRequesting
                          ? "Creating Link"
                          : "Link Created..  " +
                            "https://kode.dhananjaay.dev" +
                            "/code/" +
                            codeOutput}
                      </ModalHeader>
                      <ModalBody>
                        {isRequesting ? <Spinner /> : "Link Created"}
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
                              // "https://kode.dhananjaay.dev" + "/code/" + codeOutput
                              // TODO: Change this to the actual URL
                              "http://localhost:3000" + "/code/" + codeOutput
                            );
                            onClose();
                            router.push("/code/" + codeOutput);
                          }}
                        >
                          Copy
                        </Button>
                      </ModalFooter>
                    </>
                  ) : currentModalType == "COLAB_SESSION" ? (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Collaboration Session
                      </ModalHeader>
                      <ModalBody>
                        <p>
                          This will create a collaborative session for you and
                          your friends to code together
                        </p>
                        <Input
                          value={UserNameInput}
                          onChange={(e) => {
                            const value = e.target.value;
                            setUserNameInput(value);
                          }}
                          isRequired
                          label="Enter Name of Your Choice"
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                        <Button
                          color="primary"
                          onPress={() => {
                            let CollaborateID = makeid(6);
                            if (UserNameInput == "") {
                              alert("Please Enter a Name");
                              return;
                            }
                            dispatch({
                              payload: {
                                code: codeInput,
                                language: languageServer,
                                userName: UserNameInput,
                              },
                              type: CodeContentActionType.UPDATE_ALL,
                            });
                            router.push("/collaborate/" + CollaborateID);
                            // CodeContentActionType
                            // dispatch({
                            //   payload: {
                            //     code: codeInput,
                            //     language: languageServer,
                            //     userName: UserNameInput,
                            //   },
                            // });
                          }}
                        >
                          Start Session
                        </Button>
                      </ModalFooter>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <div className="max-w-7xl mb-4 w-full border-2 rounded-md">
          {/* <Editor
            height="90vh"
            defaultLanguage="yaml"
            defaultValue={`a: 2
b: a + 30`}
            onMount={handleEditorDidMount}
          /> */}
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
            // onMount={handleEditorDidMount}
            className="w-full"
            height="68vh"
            theme="vs-dark"
            value={codeInput}
            onChange={(value) => {
              setCodeInput(value);
            }}
            width={"100%"}
            defaultLanguage={"javascript"}
            language={languageServer}
            // defaultValue="// Crafted By Dhananjay With love"
          />
        </div>
      </div>
    </>
  );
}
