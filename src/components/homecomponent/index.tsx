"use client";
import React, { useEffect, useRef, useLayoutEffect } from 'react';
import PageLayout from '../pagelayout';
import CustomText from '../shared/textcomponent';
import { useRouter } from 'next/navigation';
import GTranslateWidget from '../gTranslator/GTranslateWidget';

interface Props {}

function HomeComponent(props: Props) {
  const router = useRouter();

  const headerData = [
    { label: 'English', value: 'en|en', image: '/images/flag4.png' },
    { label: 'French', value: 'en|fr', image: '/images/flag6.png' },
    { label: 'Spanish', value: 'en|es', image: '/images/flag5.png' },
    { label: 'Arabic', value: 'en|ar', image: '/images/flag1.png' },
    { label: 'Turkish', value: 'en|tr', image: '/images/flag3.png' },

    { label: 'Swahili', value: 'en|sw', image: '/images/flag4.png' },
    { label: 'Hebrew', value: 'en|iw', image: '/images/flag6.png' },
    { label: 'Portuguese', value: 'en|pt', image: '/images/flag5.png' },
    { label: 'Russian', value: 'en|ru', image: '/images/flag3.png'},

    // { label: 'Farsi', value: 'fa', image: '/images/flag2.jpg' },
    // { label: 'Portuguese', value: 'pt', image: '/images/flag7.png' },
    // { label: 'Italian', value: 'it', image: '/images/flag8.png' },
  ];


  // Load GTranslate script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.gtranslate.net/widgets/latest/dropdown.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    (window as any).gtranslateSettings = {
      default_language: 'en',
      detect_browser_language: true,
      languages: ['en', 'fr', 'es', 'ar', 'tr', 'sw', 'iw', 'pt', 'ru'],
      wrapper_selector: '.gtranslate_wrapper',
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

    // Wait for GTranslate dropdown to load
    useEffect(() => {
        const observer = new MutationObserver((mutations, obs) => {
            const gtranslateWrapper = document.querySelector('.gtranslate_wrapper gt_container--wz96ug gt_selector notranslate') as HTMLElement | null;
          if (gtranslateWrapper ) {
            console.log('GTranslate wrapper found:', gtranslateWrapper);
            gtranslateWrapper.click();
            console.log('GTranslate wrapper clicked.');
            obs.disconnect();
          }
        });
    
        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
    
        return () => {
          observer.disconnect();
        };
      }, []);

  // Wait for GTranslate dropdown to load
  useEffect(() => {
    const observer = new MutationObserver((mutations, obs) => {
      const selectField = document.querySelector('.gtranslate_wrapper select');
      if (selectField) {
        console.log('GTranslate dropdown found!');
        obs.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

    // Change language function
    const changeLanguage = (e: any, languageCode: string) => {
      console.log("function called")
     // e.preventDefault();
     // e.stopPropagation();
        const selectField: HTMLSelectElement | null = document.querySelector('.gtranslate_wrapper select');
        
        if (selectField) {
          // Set the desired language code 
          selectField.value = languageCode;
          
          // Trigger the change event
          const event = new Event('change', { bubbles: true });
          selectField.dispatchEvent(event); 
        
          setTimeout(() => {
            router.push('/home/resources');
          }, 1000);
        } else {
          console.error('GTranslate dropdown not found.');
        }
      };

    //   const query = document.getElementsByClassName('gtranslate_wrapper');
    //   console.log('query', query);

  return (
    <PageLayout>
      <div className=" w-full lg:px-0 px-6 relative -z-100">
        <CustomText className="font-bold text-[32px] lg:text-[24px] leading-[48px] lg:leading-[36px] max-w-64 py-11 lg:py-8">
          PLEASE SELECT YOUR LANGUAGE
        </CustomText>
        <div
          style={{
            background:
              'linear-gradient(126.5deg, rgba(255, 255, 255, 0.24) -4.87%, rgba(255, 255, 255, 0) 112.83%)',
          }}
          className="w-full flex h-full flex-col rounded-[16px] gap-6 flex-1 px-6 lg:px-10 py-14"
        >
            {/* <div
          className="gtranslate_wrapper w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] lg:ml-20 lg:mt-20 absolute -z-10  "
         // style={{ width: '0px', height: '0px', position: 'absolute', left: '50%', zIndex: -99999 }}
        ></div> */}
          {/* Mobile View */}
          <div className=" w-full grid grid-cols-2 lg:hidden gap-6">
            {headerData.map((item, index) => (
              <div
                key={index}
                role="button"
                onClick={(e) => changeLanguage(e, item.value)}
                className="w-full flex gap-4 flex-col md:items-center lg:items-start"
              >
                <div className="md:w-[160px] w-full lg:h-[226px] md:h-[160px] h-[125px] rounded-xl">
                  <img
                    className={`w-full h-full ${
                      item.image === '/images/flag2.jpg' ? 'object-cover' : 'object-contain'
                    } rounded-2xl`}
                    src={item.image}
                    alt={item.label}
                  />
                </div>
                <CustomText className="notranslate leading-[24px] font-medium mt-1 text-white">
                  {item.label}
                </CustomText>
              </div>
            ))}
          </div>
          {/* Desktop View */}
          <div className="w-full hidden lg:flex flex-row gap-6">
            {headerData
              .filter((item) => ['Arabic', 'Farsi', 'Turkish'].includes(item.label))
              .map((item, index) => (
                <div
                  key={index}
                  role="button"
                  onClick={(e) => changeLanguage(e, item.value)}
                  className="w-full lg:w-fit flex gap-4 flex-col md:items-center lg:items-start"
                >
                  <div className="w-full lg:w-[226px] lg:h-[226px] h-[160px] rounded-2xl">
                    <img
                      className={`w-full h-full ${
                        item.image === '/images/flag2.jpg' ? 'object-cover' : 'object-contain'
                      } rounded-2xl`}
                      src={item.image}
                      alt={item.label}
                    />
                  </div>
                  <CustomText className="notranslate leading-[24px] font-medium mt-1 text-white">
                    {item.label}
                  </CustomText>
                </div>
              ))}
          </div>
          <div className="w-full hidden lg:flex flex-row gap-6">
            {headerData
              .filter((item) => !['Arabic', 'Farsi', 'Turkish'].includes(item.label))
              .map((item, index) => (
                <div
                  key={index}
                  role="button"
                  onClick={(e) => changeLanguage(e, item.value)}
                  className="lg:w-fit w-full flex gap-4 flex-col md:items-center lg:items-start"
                >
                  <div className="w-full lg:w-[126px] h-[160px] lg:h-[126px] rounded-2xl">
                    <img
                      className={`w-[150px] h-full ${
                        item.image === '/images/flag2.jpg' ? 'object-cover' : 'object-contain'
                      } rounded-2xl`}
                      src={item.image}
                      alt={item.label}
                    />
                  </div>
                  <CustomText className="notranslate leading-[24px] font-medium mt-1 text-white">
                    {item.label}
                  </CustomText>
                </div>
              ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default HomeComponent;