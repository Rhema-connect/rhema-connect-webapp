import React, { ReactNode } from 'react'
import { ButtonProps, Button as ChakraButton, Box } from '@chakra-ui/react'

interface IProps {
    secondary?: boolean
    type?: 'button' | 'submit';
    text: any;
    backgroundColor?: string;
    color?: string;
    borderRadius?: string;
    width?: any;
    fontSize?: "13px" | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    height?: string;
    shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
    isLoading?: boolean;
    variant?: 'solid' | 'outline' | 'ghost' | 'link';
    icon?: ReactNode;
    disable?: boolean,
    border?: string
}

function CustomButton({
    type = 'button',
    text,
    backgroundColor,
    color = 'white',
    borderRadius = '8px',
    width = 'full',
    height = '48px',
    shadow = 'none',
    fontSize = "md",
    isLoading = false,
    icon = undefined,
    variant = 'solid',
    disable = false,
    border,
    secondary,
    ...rest
}: IProps & ButtonProps) {


    return (
        <ChakraButton
            // style={{ backgroundColor: backgroundColor ? backgroundColor?.includes("brand") ? THEME.COLORS[backgroundColor?.replace("brand.", "")] : backgroundColor : "#E5EBF4" }}
            {...rest}
            isDisabled={isLoading || disable}
            loadingText='Loading'
            width={width}
            height={height}
            color={secondary ? "#212B36" : color}
            fontSize={fontSize}
            borderRadius={borderRadius}
            type={type}
            isLoading={isLoading}
            shadow={shadow}
            variant={variant}
            
            border={border ? border : secondary ? "2px solid #BEBEBE" : "2px solid "+ backgroundColor ? backgroundColor : "#BEBEBE"}
            bgColor={backgroundColor ? backgroundColor : secondary ? "white" : "#BE0027"}
            _hover={{
                backgroundColor: backgroundColor
            }}
            fontWeight={"700"}
        >
            {icon && (
                <>
                    {icon}
                    <Box width={'5px'} />
                </>
            )}
            {text}
        </ChakraButton>
    )
}

export default CustomButton