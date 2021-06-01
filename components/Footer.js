import React from 'react'
import Link from 'next/link'
const Footer = () => {
    return (
        <footer>
            2021 - <Link href="/"><a style={{textDecoration:'underline'}}>Roomies App</a></Link> - built with Nextjs & MongoDB
        </footer>
    )
}
export default Footer
