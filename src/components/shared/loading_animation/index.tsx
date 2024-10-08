import { Flex, Spinner, Text } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
    loading: any,
    refeching?: any,
    children: React.ReactNode,
    length?: any,
    fix_height?: boolean,
    color?: string
}

function LoadingAnimation(props: Props) {

    let {
        children,
        loading,
        length,
        refeching,
        fix_height,
        color
    } = props 

  const pathname = usePathname()

    return (
        <>
            {!loading && (
                <>
                    {children} 
                    {(!loading && refeching)&& (
                        <Flex width={"full"} justifyContent={"center"} height={fix_height ? "full": "auto"} fontSize={"20px"} py={fix_height ? "" : "8"}  >
                            <Spinner size={["lg", "md"]} color={color? color : pathname?.includes("/dashboard") ? "black" : 'white'} />
                        </Flex>
                    )}
                </>
            )}

            {(!loading && !refeching ) && (
                <>
                    {length === 0 && (
                        <Flex width={"full"} justifyContent={"center"} fontSize={"20px"} py={"4"}  >
                            <Text>No Records Found</Text>
                        </Flex>
                    )}
                </>
            )}
            {loading && (
                <Flex width={"full"} justifyContent={"center"} fontSize={"20px"} py={"8"}  >
                    <Spinner size={["lg", "md"]} color={color? color : pathname?.includes("/dashboard") ? "black" : 'white'} />
                </Flex>
            )}
        </>
    )
}

export default LoadingAnimation
