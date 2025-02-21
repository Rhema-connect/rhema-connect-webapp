"use client"
import { InputGroup, InputLeftElement, Input, InputRightElement, Box, Text, Textarea } from "@chakra-ui/react"
import React, { HTMLInputTypeAttribute, ReactNode } from "react"
import { motion } from "framer-motion";
import { EyeIcon } from "@/components/svg";

interface Props {
    left?: boolean,
    leftIcon?: ReactNode,
    right?: boolean,
    rightIcon?: ReactNode,
    type: string,
    h?: string,
    touch?: any,
    error?: any,
    textarea?: boolean
    [x: string]: any;
}

export default function InputComponent({ left, leftIcon, right, rightIcon, type, touch, error, textarea, h, ...rest }: Props) {

    const [intialType, setIntialType] = React.useState(type)

    const ViewPassword = () => {
        if (intialType === "text") {
            setIntialType("password")
        } else {
            setIntialType("text")
        }
    }

    return (
        <div className=" w-full " >
            {!textarea && (
                <InputGroup w={"full"} >
                    {left && (
                        <InputLeftElement >
                            <Box display="flex" height={h ? h : "35px"} justifyContent="center" alignItems="center" marginTop="6px" marginLeft="12px" >
                                {leftIcon}
                            </Box>
                        </InputLeftElement>
                    )}
                    <Input {...rest} type={intialType} w={"full"} textColor="#000" paddingLeft={left ? "45px" : ""} fontSize="14px" fontWeight="400" bgColor="#FCFCFC" borderColor="#BDBDBD" _hover={{ borderColor: "#BDBDBD" }} _focus={{ backgroundColor: "#FCFCFC" }} focusBorderColor="#BDBDBD" height={h ? h : "45px"} />
                    {right && (
                        <InputRightElement> 
                            <Box display="flex" height={h ? h : "35px"} justifyContent="center" alignItems="center" marginTop="6px" paddingRight="30px" marginLeft="12px" >
                                <Box type="button" as="button" fontSize={"14px"} fontWeight={"600"} onClick={() => ViewPassword()} >
                                    <EyeIcon />
                                </Box>
                            </Box>
                        </InputRightElement>
                    )}
                </InputGroup>
            )}
            {textarea && (
                <Textarea  {...rest} textColor="#000" paddingLeft={left ? "45px" : ""} fontSize="14px" fontWeight="400" bgColor="#FCFCFC" borderColor="#BDBDBD" _hover={{ borderColor: "#BDBDBD" }} _focus={{ backgroundColor: "#FCFCFC" }} focusBorderColor="#BDBDBD" />
            )}
            {touch && error && (
                <Text as={motion.p}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }} color="#E84545" fontWeight="600" fontSize="xs" mt="3px" textAlign="left" >{error}</Text>
            )}
        </div>
    )
}