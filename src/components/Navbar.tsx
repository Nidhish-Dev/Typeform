import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

function Navbar() {
  return (
    <div className='flex justify-between mx-10 mt-4'>
      <img className='logo' src="/Typeform.svg" alt="" />

      <Link href="/register"><Button>Sign up</Button></Link>
      
    </div>
  )
}

export default Navbar
