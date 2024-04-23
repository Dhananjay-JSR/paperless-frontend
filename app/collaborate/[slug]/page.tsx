"use client";

import { CodeContext } from "@/app/provider/Provider";
import { Editor, useMonaco } from "@monaco-editor/react";
import {
  Button,
  CircularProgress,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Snippet,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import type monaco from "monaco-editor";

const usercolors = [
  "#30bced",
  "#6eeb83",
  "#ffbc42",
  "#ecd444",
  "#ee6352",
  "#9ac2c9",
  "#8acb88",
  "#1be7ff",
];
export default function Collaborate({ params }: { params: { slug: string } }) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

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
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [languageServer, setLanguageServer] = useState("");
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [codeSnippetURL, setCodeSnippetURL] = useState("");
  const [UserCountArray, setUserCountArray] = useState<
    {
      [x: string]: any;
    }[]
  >([]);
  const router = useRouter();

  const { state } = useContext(CodeContext);
  const yDOcument = useMemo(() => {
    return new Y.Doc();
  }, []);
  const provider = useMemo(() => {
    return new WebsocketProvider("ws://localhost:1234", params.slug, yDOcument);
  }, []);
  const type = yDOcument.getText("monaco");
  const RoomConfig = yDOcument.getMap("roomConfig");

  const [MonacoColabBinding, setMonacoColabBinding] =
    useState<MonacoBinding | null>(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [setModalType, setModalTypeState] = useState<
    "USER_SETUP" | "SESSION_END" | "ARE_YOU_SURE_SESSION_END"
  >("USER_SETUP");

  useEffect(() => {
    if (state.userName == "") {
      //   type.insert(0, "Welcome to Kode By Dhananjay Senday");
      setIsAdmin(false);
      onOpen();
    } else {
      setIsAdmin(true);
      setUserName(state.userName);
      setCode(state.code);
      type.insert(0, state.code);
      setLanguage(state.language);
    }
    RoomConfig.observe((yevent) => {
      // console.log(yevent.keysChanged);
      if (yevent.keysChanged.has("language")) {
        //   console.log(RoomConfig.get("language"));
        setLanguage(RoomConfig.get("language") as string);
      }

      if (yevent.keysChanged.has("isSessionActive")) {
        setIsSessionActive(RoomConfig.get("isSessionActive") as boolean);
      }

      if (yevent.keysChanged.has("storeURL")) {
        setCodeSnippetURL(RoomConfig.get("storeURL") as string);
      }
    });
  }, []);

  useEffect(() => {
    if (
      MonacoColabBinding != undefined &&
      isAdmin &&
      MonacoColabBinding.awareness &&
      MonacoColabBinding.awareness.setLocalState
    ) {
      // Room Config is a Map that stores the Room Configuration
      //   we currently set the language of the room
      //   Only Admin can change the language of the room
      RoomConfig.set("language", language);
      RoomConfig.set("isSessionActive", true);
      RoomConfig.set("storeURL", "");
      MonacoColabBinding.awareness.setLocalState({
        name: userName,
        color: usercolors[Math.floor(Math.random() * usercolors.length)],
        isAdministrator: isAdmin,
        Language: language,
      });
    }
    if (MonacoColabBinding != null && MonacoColabBinding.awareness) {
      MonacoColabBinding.awareness.on("change", (chnages: any) => {
        setUserCountArray(
          // @ts-ignore
          Array.from(MonacoColabBinding.awareness.getStates().values())
        );
        // console.log(
        //   Array.from(MonacoColabBinding.awareness.getStates().values())
        // );
      });
    }
  }, [MonacoColabBinding]);

  useEffect(() => {
    if (isAdmin == false && isSessionActive == false) {
      onOpen();
      setModalTypeState("SESSION_END");
    }
  }, [isAdmin, isSessionActive]);

  return (
    <>
      <div className="">
        <Toaster position="top-right" />
      </div>
      <div className=" flex-grow  flex   flex-col max-w-7xl mx-auto   min-h-full">
        <Modal
          hideCloseButton
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
                {setModalType == "USER_SETUP" ? (
                  <>
                    {" "}
                    <ModalHeader>
                      Hello User Enter Your Name to Continue
                    </ModalHeader>
                    <ModalBody>
                      <Input
                        label="Enter Your NickName"
                        value={userName}
                        onChange={(e) => {
                          const value = e.target.value;
                          setUserName(value);
                        }}
                        isRequired
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        onPress={() => {
                          if (userName == "") {
                            toast.error("Please Enter a Valid Name");
                            return;
                          }
                          if (
                            MonacoColabBinding != undefined &&
                            MonacoColabBinding.awareness &&
                            MonacoColabBinding.awareness.setLocalState
                          ) {
                            MonacoColabBinding.awareness.setLocalState({
                              name: userName,
                              color:
                                usercolors[
                                  Math.floor(Math.random() * usercolors.length)
                                ],
                              isAdministrator: false,
                              Language: language,
                            });

                            onClose();
                          }
                        }}
                        color="primary"
                      >
                        Join Room
                      </Button>
                    </ModalFooter>
                  </>
                ) : setModalType == "SESSION_END" ? (
                  <>
                    <ModalHeader>Session Ended</ModalHeader>
                    {codeSnippetURL == "" ? (
                      <>
                        <ModalBody>
                          <div>
                            Session Ended By Admin, Generating Code Snippet
                          </div>
                          <CircularProgress aria-label="Loading..." />
                        </ModalBody>
                      </>
                    ) : (
                      <>
                        <ModalBody>
                          <>
                            <div>
                              Session Ended By Admin, Code Snippet Generated
                            </div>
                          </>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            onPress={() => {
                              navigator.clipboard.writeText(
                                "https://kode.dhananjaay.dev" +
                                  "/code/" +
                                  codeSnippetURL
                              );
                              router.push("/code/" + codeSnippetURL);
                              onClose();
                            }}
                            color="primary"
                          >
                            Copy Code Snippet URL
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </>
                ) : setModalType === "ARE_YOU_SURE_SESSION_END" ? (
                  <>
                    <ModalHeader>
                      Are You Sure You Want to End the Session
                    </ModalHeader>
                    <ModalBody>
                      <div>
                        {" "}
                        This make code read only which can be shared with other
                        users and will remove all the users from the room
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        onPress={() => {
                          RoomConfig.set("isSessionActive", false);
                          axios
                            .post(process.env.NEXT_PUBLIC_URL + "/api", {
                              code: code,
                              language: languageServer,
                            })
                            .then((Data) => {
                              let JSONDATA = Data.data;
                              // console.log(JSONDATA);
                              setCodeSnippetURL(JSONDATA.URL);
                              RoomConfig.set("storeURL", JSONDATA.URL);
                              router.push("/code/" + JSONDATA.URL);
                              setModalTypeState("SESSION_END");
                              onClose();
                            });
                        }}
                        color="primary"
                      >
                        End Session
                      </Button>
                      <Button onPress={onClose} color="warning">
                        Cancel
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
        <div className="w-full my-4 flex justify-between px-2 items-center">
          <div className="flex w-full items-end justify-between">
            {isAdmin ? (
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
                  RoomConfig.set("language", value);
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
            ) : (
              <>
                Language Server{" "}
                {
                  LanguageSpecs.find((value) => {
                    return value.value == language;
                  })?.label
                }
              </>
            )}
            {isAdmin && (
              <div>
                <div>ROOM ID (click to copy)</div>
                <Snippet size="lg" className="mx-auto">
                  {`http://localhost:3000/collaborate/${params.slug}`}
                </Snippet>
              </div>
            )}

            <div>
              <Tooltip
                content={
                  <>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">Users in Room</div>
                      {UserCountArray.filter((user) => {
                        return user.name;
                      }).map((user, index) => {
                        return (
                          <div key={index} className="flex gap-2 items-center">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: user.color }}
                            />
                            <div>{user.name}</div>
                            <div>
                              {user.isAdministrator ? (
                                <span className="text-xs bg-red-500 text-white px-1 rounded-md">
                                  Admin
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                }
              >
                <Button>
                  Member Count :-{" "}
                  {
                    UserCountArray.filter((user) => {
                      return user.name;
                    }).length
                  }
                </Button>
              </Tooltip>
            </div>
            {isAdmin && (
              <div>
                <Button
                  onPress={() => {
                    // RoomConfig.set("isSessionActive", false);
                    // let Data = await axios.post(
                    //   process.env.NEXT_PUBLIC_URL + "/api",
                    //   {
                    //     code: code,
                    //     language: languageServer,
                    //   }
                    // );
                    // let JSONDATA = Data.data;
                    // console.log(JSONDATA);
                    setModalTypeState("ARE_YOU_SURE_SESSION_END");
                    onOpen();
                  }}
                >
                  Save Code
                </Button>
              </div>
            )}
          </div>
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
            options={{
              readOnly: !isAdmin && !isSessionActive,
            }}
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
            onMount={(editor, monaco) => {
              editorRef.current = editor;

              const binding = new MonacoBinding(
                type,
                // @ts-ignore
                editor.getModel(),
                new Set([editor]),
                provider.awareness
              );
              setMonacoColabBinding(binding);
            }}
            className="w-full"
            height="68vh"
            theme="vs-dark"
            value={code}
            onChange={(value) => {
              if (value) {
                setCode(value);
              }
            }}
            width={"100%"}
            //   defaultLanguage={"javascript"}
            language={language}
            defaultValue="// Crafted By Dhananjay With love"
          />
        </div>
      </div>
    </>
  );
}
