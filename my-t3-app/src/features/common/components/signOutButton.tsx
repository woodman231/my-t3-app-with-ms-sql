import React from 'react'
import { signOut } from "next-auth/react";

function SignOutButton() {
  return (
    <button className='bg-yellow-500 rounded px-2' onClick={() => void signOut({callbackUrl: "/"})}>
        Sign Out
    </button>
  )
}

export default SignOutButton