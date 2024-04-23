"use client";
import React from "react";

export const CodeContext = React.createContext(
  {} as {
    state: {
      code: string;
      language: string;
      userName: string;
    };
    dispatch: React.Dispatch<{
      type: CodeContentActionType;
      payload: {
        code: string;
        language: string;
        userName: string;
      };
    }>;
  }
);

export enum CodeContentActionType {
  UPDATE_CODE = "UPDATE_CODE",
  UPDATE_LANGUAGE = "UPDATE_LANGUAGE",
  UPDATE_USERNAME = "UPDATE_USERNAME",
  UPDATE_ALL = "UPDATE_ALL",
}

function Reducer(
  state: {
    code: string;
    language: string;
    userName: string;
  },
  action: {
    type: CodeContentActionType;
    payload: {
      code: string;
      language: string;
      userName: string;
    };
  }
) {
  switch (action.type) {
    case CodeContentActionType.UPDATE_CODE:
      return { ...state, code: action.payload.code };
    case CodeContentActionType.UPDATE_LANGUAGE:
      return { ...state, language: action.payload.language };
    case CodeContentActionType.UPDATE_USERNAME:
      return { ...state, userName: action.payload.userName };
    case CodeContentActionType.UPDATE_ALL:
      return {
        code: action.payload.code,
        language: action.payload.language,
        userName: action.payload.userName,
      };
    default:
      return state;
  }
}

export default function ProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(Reducer, {
    code: "",
    language: "javascript",
    userName: "",
  });
  return (
    <CodeContext.Provider value={{ state, dispatch }}>
      {children}
    </CodeContext.Provider>
  );
}
