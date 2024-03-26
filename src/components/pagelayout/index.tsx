import React, { useEffect, useState } from 'react'
import { Connect } from '../svg'
import CustomText from '../shared/textcomponent'
import { usePathname } from 'next/navigation'

interface Props {
    children: React.ReactNode
}

function PageLayout(props: Props) {
    const {
        children
    } = props

    const pathname = usePathname()


    const [active, setActive] = useState(pathname)

    useEffect(() => {
        setActive(pathname)
    }, [])

    return (
        <div className=' w-full h-full py-8 ' >
            {children}
        </div>
    )
}

export default PageLayout
