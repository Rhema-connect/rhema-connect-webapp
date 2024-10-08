"use client"

import { useEffect } from "react";

interface Props {
  children: React.ReactNode
}

function Layout(props: Props) {
  const {
    children
  } = props

  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://cdn.gtranslate.net/widgets/latest/dropdown.js';
    script.defer = true; 
    // Append script to the document body
    document.body.appendChild(script);

    // Cleanup function to remove the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  //   script.async = true;
  //   document.body.appendChild(script);

  //   // Define the googleTranslateElementInit function
  //   const googleTranslateElementInit = () => {
  //     new (window as any).google.translate.TranslateElement(
  //       {
  //         pageLanguage: 'auto',
  //         autoDisplay: false,
  //         includedLanguages: "en,ar,fa,tr,es,fr,pt,it",
  //         layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE
  //       },
  //       'google_translate_element'
  //     );
  //   };

  //   // Attach googleTranslateElementInit to the window object
  //   (window as any).googleTranslateElementInit = googleTranslateElementInit;

  //   // Cleanup function
  //   return () => {
  //     document.body.removeChild(script);
  //     delete (window as any).googleTranslateElementInit;
  //   };
  // }, []);

  return (
    <div className=' w-full ' >
      {children}
    </div>
  )
}

export default Layout
