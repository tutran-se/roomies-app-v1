import React from 'react'

const Button = ({label, disable, onClick=null}) => {
    return (
        <button disabled={disable} onClick={onClick && onClick} type="button">
            {label}
        </button>
    )
}

export default Button
