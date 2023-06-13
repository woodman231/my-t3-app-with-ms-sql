import React from 'react'
import { signIn } from 'next-auth/react'

function SignInButton() {
    return (
        <button className='bg-yellow-500 rounded px-2' onClick={() => void signIn()}>
            Sign In
        </button>
    )
}

export default SignInButton