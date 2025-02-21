"use client"
import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { IoChevronBackCircleOutline, IoChevronForwardCircleOutline } from "react-icons/io5"; 
import { useQuery } from 'react-query';
import actionService from '@/connections/getdataaction';
import { ContentData } from '@/models';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function BookPage({ params }: { params: { slug: string } }) {

    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const OnDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };
    const [data, setData] = useState({} as ContentData)

    const { isLoading } = useQuery(['book', params?.slug], () => actionService.getservicedata(`/content/${params?.slug}`,
        {
            limit: 20,
            page: 0,
            type: "BOOK"
        }),
        {
            onError: (error: any) => {
                console.error(error);
            },
            onSuccess: (data: any) => {
                console.log(data?.data?.data);
                setData(data?.data?.data)
            }
        }
    )
    
    return (
        <div className=' w-full flex-col gap-4 ' > 
            <p className=' text-center text-xl font-bold ' >{data?.title}</p>
            <div className=' w-full flex mt-4 items-center ' >
                <button disabled={pageNumber === 1 ? true : false} onClick={() => setPageNumber((prev) => prev - 1)} className=' w-fit outline-none z-50 ' >
                    <IoChevronBackCircleOutline size={"30px"} />
                </button>
                <div className=' w-full flex flex-col gap-6 ' >
                    <div className=' w-full h-[700px] bg-slate-500 ' >
                        <Document
                            className={" flex justify-center items-center "}
                            file={data?.url}
                            onLoadSuccess={OnDocumentLoadSuccess}
                        >
                            <Page height={700} pageNumber={pageNumber} />
                        </Document>
                    </div>
                    <p>Page {pageNumber} of {numPages}</p>
                </div>
                <button disabled={pageNumber === numPages ? true : false} onClick={() => setPageNumber((prev) => prev + 1)} className=' w-fit outline-none z-50 ' >
                    <IoChevronForwardCircleOutline size={"30px"} />
                </button>
            </div>
        </div>
    )
}
