// Use useDictionary in client components only
"use client";

import React from "react";

const DictionaryContext = React.createContext(null);

export default function DictionaryProvider({ dictionary, children }) {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const dictionary = React.useContext(DictionaryContext);
  if (dictionary === null) {
    throw new Error(
      "useDictionary hook must be used within DictionaryProvider",
    );
  }

  return dictionary;
}
