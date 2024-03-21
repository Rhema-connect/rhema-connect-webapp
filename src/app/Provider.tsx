'use client';
import { ChakraProvider } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();
function Provider({ children }: any) {

  const pathname = usePathname()
  // Create a client    
  // useEffect(() => { 
  //   var addScript: any = document.createElement('script');
  //   addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
  //   document?.body?.appendChild(addScript);
  //   (window as any).googleTranslateElementInit = googleTranslateElementInit;

  //   // Cleanup function
  //   // return () => {
  //   //   document.body.removeChild(addScript);
  //   //   delete (window as any).googleTranslateElementInit;
  //   // };
  // }, []) 

  // const googleTranslateElementInit = () => {

  //   new (window as any).google.translate.TranslateElement({
  //     pageLanguage: 'auto',
  //     autoDisplay: false,
  //     includedLanguages: "en,ar,fa,tr,es,fr,pt,it",
  //     layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE
  //   },
  //     'google_translate_element');
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default Provider