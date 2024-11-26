import React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronRightIcon } from "@heroicons/react/20/solid"
import {Link, Outlet} from "react-router-dom";

interface ITabs {
    name: string;
    path: string;
    current: boolean;
    children?: ITabs[];
}
export function StaffOutlet() {
    const [currentNav, setCurrentNav] = React.useState("Home");
    const [currentSubNav, setCurrentSubNav] = React.useState("");
    const navigation: ITabs[] = [
        {
            name:"Home",
            path:"/",
            current: true,
        },
        {
            name:"Buvette",
            path:"",
            current: false,
            children: [
                {
                    name:"Feuille buvette",
                    path:"/staff/sheet",
                    current: false,
                },
            ],
        },
        {
            name:"Donnée front",
            path:"",
            current: false,
            children: [
                {
                    name:"Staff",
                    path:"/staff/staffDisplay",
                    current: true,
                }
            ],
        },
    ];
    return (
        <div className="flex h-screen w-screen">
            <div className="flex flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-blue-800 px-6 w-2/12">
                <div className="flex h-16 shrink-0 items-center">
                    <img
                        alt="Your Company"
                        src="/LOGOMSM.webp"
                        className="h-8 w-auto"
                    />
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {navigation.map((item) => (
                                    <li key={item.name}>
                                        {!item.children ? (
                                            <Link
                                                to={item.path}
                                                onClick={()=> HandleTabChange(item.name)}
                                                className={classNames(
                                                    item.name === currentNav ? 'bg-blue-900' : 'hover:bg-blue-600',
                                                    'block rounded-md py-2 pl-10 pr-2 text-sm/6 font-semibold text-black-white',
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        ) : (
                                            <Disclosure as="div">
                                                <DisclosureButton
                                                    className={classNames(
                                                        item.name === currentNav ? 'bg-blue-900' : 'hover:bg-blue-600',
                                                        'group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm/6 font-semibold text-black-white',
                                                    )}
                                                >
                                                    <ChevronRightIcon
                                                        aria-hidden="true"
                                                        className="size-5 shrink-0 text-black group-data-[open]:rotate-90 group-data-[open]:text-black"
                                                    />
                                                    {item.name}
                                                </DisclosureButton>
                                                <DisclosurePanel as="ul" className="mt-1 px-2">
                                                    {item.children.map((subItem) => (
                                                        <li key={subItem.name}>
                                                            <Link
                                                                onClick={()=> HandleTabChange(item.name, subItem.name)}
                                                                to={subItem.path}
                                                                className={classNames(
                                                                    subItem.name === currentSubNav ? 'bg-blue-900' : 'hover:bg-blue-600',
                                                                    'block rounded-md py-2 pl-9 pr-2 text-sm/6 text-black-white',
                                                                )}
                                                            >
                                                                {subItem.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </DisclosurePanel>
                                            </Disclosure>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className="-mx-6 mt-auto">
                            <a
                                href="#"
                                className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-black hover:bg-blue-600"
                            >
                                <img
                                    alt=""
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    className="size-8 rounded-full bg-gray-50"
                                />
                                <span className="sr-only">Your profile</span>
                                <span aria-hidden="true">Tom Cook</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="flex-1 p-4 ">
                <Outlet/>
            </div>
        </div>
    )
        ;

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }
    function HandleTabChange(tabName: string, subTabName? :string ): void {
        let currTab: ITabs | undefined = navigation.find((tab) => tab.name = tabName);
        console.log(currTab?.name);
        setCurrentNav(tabName);
        if(subTabName){
            setCurrentSubNav(subTabName);
        }
        else {
            setCurrentSubNav("");
        }
        if (currTab) {
            navigation.forEach((tab) => {
                tab.current = false
            });
            currTab.current = true;
        }
    }
}