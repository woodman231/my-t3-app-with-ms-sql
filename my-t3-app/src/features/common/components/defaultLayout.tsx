import React from 'react'
import Head from "next/head";
import MainMenu from './mainMenu';
import ApplicationTitle from './applicationTitle';
import type { PropsWithChildren } from 'react'

interface DefaultLayoutProps extends PropsWithChildren {
    pageTitle: string;
    pageDescription: string;
}

function DefaultLayout(props: DefaultLayoutProps) {
    return (
        <>
            <Head>
                <title>{props.pageTitle}</title>
                <meta name="description" content={props.pageDescription} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='grid grid-cols-1 justify-items-stretch items-stretch min-h-screen bg-stone-900 text-white'>
                <div className='bg-stone-400 h-12'>
                    <div className='w-full flex justify-start gap-2 align-text-top bg-stone-700'>
                        <div className="p-2">
                            <MainMenu />
                        </div>
                        <div className="self-center">
                            <ApplicationTitle />
                        </div>
                    </div>
                </div>
                <div className='min-h-[calc(100vh-6rem)] p-2'>
                    <h1 className="text-2xl font-bold p-t-2">{props.pageTitle}</h1>
                    {props.children}
                </div>
                <div className='bg-stone-600 h-12 p-2'>
                    <p>Created By Sean Woodward</p>
                </div>
            </div>
        </>
    )
}

export default DefaultLayout
