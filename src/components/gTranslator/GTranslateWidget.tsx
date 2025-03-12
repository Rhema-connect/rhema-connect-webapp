"use client";
import React, { useEffect, useRef } from 'react';

const GTranslateWidget = () => {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;

    const script = document.createElement("script");
    script.src = "https://cdn.gtranslate.net/widgets/latest/dropdown.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    (window as any).gtranslateSettings = {
      default_language: "en",
      detect_browser_language: false,
      languages: ["en", "fr", "es", "ar", "tr", "sw", "iw", "pt", "ru"],
      wrapper_selector: ".gtranslate_wrapper",
    };
    scriptLoaded.current = true;

    return () => {
      document.body.removeChild(script);
      scriptLoaded.current = false;
    };
  }, []);
  return <div className="gtranslate_wrapper"></div>
};

export default GTranslateWidget;
