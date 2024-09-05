import React from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton, 
} from "@chakra-ui/react"
import { Popover } from '@radix-ui/themes'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoMenu } from "react-icons/io5";

interface Props {
    open: boolean,
    close: () => void,
    size?: any,
    width?: string,
    title?: any, 
    height?: boolean,
    children: React.ReactNode, 
}

export default function ModalLayout(props: Props) {

    let {
        open,
        close,
        size,
        width,
        title, 
        children, 
    } = props; 


    return (
        <Modal size={size ? size : ""} isCentered scrollBehavior="inside" isOpen={open} onClose={close}>
            <ModalOverlay />
            <ModalContent width={width} bgColor="#FFFFFF">
                {title && (
                    <>
                        <ModalHeader color={"#010203"} lineHeight={"23.2px"} textAlign={"center"} fontWeight={"medium"} >{title}</ModalHeader>
                        <ModalCloseButton color={"#000000"} />
                    </>
                )}
                <ModalBody bgColor="#FFFFFF" padding="6" borderRadius="8px" >
                    <div >
                        {children}
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>

                // <Popover.Root open={open} onOpenChange={close} >
                //     {/* <Popover.Trigger>
                //         <button role='button' onClick={() => setShow(true)} className=' text-primary lg:hidden ' >
                //             <IoMenu size={"35px"} />
                //         </button>
                //     </Popover.Trigger> */}
                //     <Popover.Content className=" z-[10000000000000000] " maxWidth={"500px"}> 
                //         {children}
                //     </Popover.Content>
                // </Popover.Root>
    )
}