import React from 'react' 

function CustomText(props: any) { 

    return (
        <p {...props} >
            {props?.children}
        </p>
    )
}

export default CustomText
