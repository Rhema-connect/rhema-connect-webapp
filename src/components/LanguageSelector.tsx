import { useEffect } from "react";

const LanguageSelector = () => {

  useEffect(() => {
    // Initialize Google Translate
    const script = document.createElement("script");
    script.src = "https://cdn.gtranslate.net/widgets/latest/dropdown.js";
    // script.src = "https://cdn.gtranslate.net/widgets/latest/fd.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Define translation settings
    (window as any).gtranslateSettings = {
      default_language: "en",
      detect_browser_language: true,
      languages: ["en", "fr", "es", "ar", "tr", "sw", "iw", "pt", "ru"],
      wrapper_selector: ".gtranslate_wrapper",
      //   flag_size: 24,
      //   horizontal_position: "right",
      //   vertical_position: "top",
      //   alt_flags: { en: "usa" },
      //   select_language_label: "Select Language",
    };

    return () => {
      // Remove the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);
  
  return <div className="gtranslate_wrapper"></div>;
};

export default LanguageSelector;