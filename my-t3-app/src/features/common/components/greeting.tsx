import React from 'react'
import SignInButton from './signInButton';
import SignOutButton from './signOutButton';
import { useSession } from 'next-auth/react';

function Greeting() {

    const { data: sessionData } = useSession();

    if (sessionData && sessionData.user) {
        const { name } = sessionData.user;
        return (
            <>
                <p className="mb-1">Welcome {name} <SignOutButton /></p>
            </>
        )
    }

    return (
        <>
            <p className='mb-1'>Welcome <SignInButton /></p>
        </>
    )
}

export default Greeting