import React from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton
} from "@chakra-ui/react"

interface Props {
    open: any,
    close: any,
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
    )
}