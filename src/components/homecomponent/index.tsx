"use client"
import React from 'react' 
import PageLayout from '../pagelayout'
import CustomText from '../shared/textcomponent'
import { usePathname, useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next';
import checkdata from '@/store/checklang'

interface Props { }

function HomeComponent(props: Props) {
    const { } = props

    const router = useRouter()
    const { setCheck } = checkdata((state) => state);

    const pathname = usePathname()

    console.log(pathname);

    const headerData = [
        { label: 'Arabic', value: '/auto/ar', image: '/images/flag1.png' },
        { label: 'Farsi', value: '/auto/fa', image: '/images/flag7.png' },
        { label: 'Turkish', value: '/auto/tr', image: '/images/flag3.png' },
        { label: 'English', value: '', image: '/images/flag4.png' },
        { label: 'Spanish', value: '/auto/es', image: '/images/flag5.png' },
        { label: 'French', value: '/auto/fr', image: '/images/flag6.png' },
        { label: 'Portuguese', value: '/auto/pt', image: '/images/flag7.png' },
        { label: 'Italian', value: '/auto/it', image: '/images/flag8.png' }
    ]

    const clickHandler = (item: string) => { 
        setCookie('googtrans', decodeURI(item))
        setCheck(item) 
        router.push('/resources')
    }

    return (
        <PageLayout>
            <CustomText className=' font-bold text-[32px] lg:text-[48px] leading-[48px] lg:leading-[64px] py-11 lg:py-[76px] ' >PLEASE SELECT YOUR LANGUAGE</CustomText>
            <div id="google_translate_element" style={{ width: '0px', height: '0px', position: 'absolute', left: '50%', zIndex: -99999 }}></div>
            <div className=' w-full grid grid-cols-2 lg:hidden flex-row gap-6 mt-8 ' >

                {headerData?.map((item: { label: string, value: string, image: string }, index: number) => {
                    return (
                        <div key={index} role='button' onClick={() => clickHandler(item?.value)} className=' w-full lg:w-fit flex gap-4 flex-col md:items-center lg:items-start ' >
                            <div className=' w-full lg:w-[226px] lg:h-[226px] h-[160px] rounded-2xl ' >
                                <img className=' w-full h-full object-contain ' src={item?.image} />
                            </div>
                            <CustomText className=' leading-[24px] font-medium mt-1 text-white ' >{item?.label}</CustomText>
                        </div>
                    )
                })}
            </div>
            <div className=' w-full hidden lg:flex flex-row gap-6 mt-8 ' >
                {headerData?.filter((item: { label: string }) => item?.label === "Arabic" || item?.label === "Farsi" || item?.label === "Turkish").map((item: { label: string, value: string, image: string }, index: number) => {
                    return (
                        <div key={index} role='button' onClick={() => clickHandler(item?.value)} className=' w-full lg:w-fit flex gap-4 flex-col md:items-center lg:items-start ' >
                            <div className=' w-full lg:w-[226px] lg:h-[226px] h-[160px] rounded-2xl ' >
                                <img className=' w-full h-full object-contain ' src={item?.image} />
                            </div>
                            <CustomText className='notranslate leading-[24px]  font-medium mt-1 text-white ' >{item?.label}</CustomText>
                        </div>
                    )
                })}
            </div>
            <div className=' w-full hidden lg:flex flex-row gap-6 mt-8 ' >
                {headerData?.filter((item: { label: string }) => item?.label !== "Arabic" && item?.label !== "Farsi" && item?.label !== "Turkish").map((item: { label: string, value: string, image: string }, index: number) => {
                    return (
                        <div key={index} role='button' onClick={() => clickHandler(item?.value)} className=' lg:w-fit w-full flex gap-4 flex-col md:items-center lg:items-start ' >
                            <div className=' w-full lg:w-[126px] h-[160px] lg:h-[126px] rounded-2xl ' >
                                <img className=' w-full h-full object-contain ' src={item?.image} />
                            </div>
                            <CustomText className=' notranslate leading-[24px] font-medium mt-1 text-white ' >{item?.label}</CustomText>
                        </div>
                    )
                })}
            </div>
            {/* </div>  */}
        </PageLayout>
    )
}

export default HomeComponent
function filterdata(arg0: (state: any) => any): { filter: any; setFilter: any } {
    throw new Error('Function not implemented.')
}

