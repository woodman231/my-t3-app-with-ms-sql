import React from 'react'
import { Popover } from '@headlessui/react';
import Bars3Icon from "@heroicons/react/20/solid/Bars3Icon"
import Greeting from './greeting';
import { useRouter } from 'next/router';
import Link from 'next/link';

function MainMenu() {
    const router = useRouter();

    const routes = [
        {
            name: "Home",
            pathName: "/"
        },
        {
            name: "Manage Todos",
            pathName: "/todos"
        }
    ]

    return (
        <Popover>
            <Popover.Button>
                <Bars3Icon className='h-8' />
            </Popover.Button>
            <Popover.Panel className="absolute bg-stone-800 w-10/12 border border-white p-2">
                <Greeting />
                <hr />
                {
                    routes.map((route, index) => {
                        return (
                            <div key={index}>
                                <Link href={route.pathName} className={route.pathName == router.pathname ? "font-bold" : ""}>
                                    {route.name}
                                </Link>
                            </div>
                        )
                    })
                }
            </Popover.Panel>
        </Popover>
    )
}

export default MainMenu