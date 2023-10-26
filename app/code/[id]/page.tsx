"use client";
import { Editor } from "@monaco-editor/react";
import { Button, Skeleton, Spinner } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Page({ params }: { params: { id: string } }) {
  // const [post, setPost] = React.useState(null)
  // const response = await fetch("/api/post", {
  //     method: "POST",
  //     // body: JSON.stringify(data),
  //   });

  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<any>(null);
  const [error, setError] = React.useState(null);
  const [languageServer, setLanguageServer] = React.useState("javascript");
  const [code, setCode] = React.useState("");

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_URL + "/api/StorageEngine?id=" + params.id)
      .then((res) => {
        let data = res.data;
        setData((prev: any) => data);
        if (data.data == null) {
          window.alert("Invalid Link");
          window.location.replace("/");
        }

        setIsLoading((prev) => false);
      });
    // (async()=>{
    //     const response = await fetch(process.env.NEXT_PUBLIC_URL+"/api/StorageEngine?url="+params.id, {
    //         method: "GET",
    //         // body: JSON.stringify(data),
    //       });
    //       const data = await response.json();
    //       setData(data);
    //       setIsLoading(false);
    // })()
  }, []);

  if (isLoading)
    return (
      <div className=" max-w-7xl mx-auto       grid place-content-center  h-full">
        <div className="justify-center flex flex-col items-center">
          <Skeleton className="rounded-md w-72 h-72"></Skeleton>
          <Spinner className="h-20 w-20" size="lg" />
          <div>Loading ....</div>
        </div>
      </div>
    );

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className=" flex-grow  flex   flex-col max-w-7xl mx-auto   min-h-full">
        <Button
          className="my-2"
          onClick={(raw) => {
            navigator.clipboard.writeText(data.data.code);
            toast("Code Copied to Clipboard", {
              position: "top-right",
            });
          }}
        >
          Copy Code
        </Button>
        <div className="max-w-7xl w-full border-2 rounded-md">
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
            value={data.data.code as any}
            options={{
              readOnly: true,
            }}
            width={"100%"}
            defaultLanguage={"javascript"}
            language={data.data.languageType}
            //   defaultValue="// Crafted By Dhananjay With love"
          />
        </div>
      </div>
    </>
  );
}
