"use client"
import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { IoChevronBackCircleOutline, IoChevronForwardCircleOutline } from "react-icons/io5"; 

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function BookPage({ params }: { params: { slug: string } }) {

    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const OnDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    return (
        <div className=' w-full flex-col gap-4 text-black ' > 
            <p className=' text-center text-xl font-bold ' >{params?.slug?.toString().split('-').join(' ')+"" }</p>
            <div className=' w-full flex mt-4 items-center ' >
                <button disabled={pageNumber === 1 ? true : false} onClick={() => setPageNumber((prev) => prev - 1)} className=' w-fit outline-none ' >
                    <IoChevronBackCircleOutline size={"30px"} />
                </button>
                <div className=' w-full flex flex-col gap-6 ' >
                    <div className=' w-full h-[700px] bg-slate-500 ' >
                        <Document
                            className={" flex justify-center items-center "}
                            file={"https://rhemaconnect.s3.eu-north-1.amazonaws.com/The-Book-of-Enoch-PDFdrive.com.co.%20PDF.pdf"}
                            onLoadSuccess={OnDocumentLoadSuccess}
                        >
                            <Page height={700} pageNumber={pageNumber} />
                        </Document>
                    </div>
                    <p>Page {pageNumber} of {numPages}</p>
                </div>
                <button disabled={pageNumber === numPages ? true : false} onClick={() => setPageNumber((prev) => prev + 1)} className=' w-fit outline-none ' >
                    <IoChevronForwardCircleOutline size={"30px"} />
                </button>
            </div>
        </div>
    )
}
