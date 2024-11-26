import React, { useEffect} from 'react';
import './App.css';
import {Link, NavigateFunction, Outlet, useNavigate} from "react-router-dom";

interface ITabs {
    name: string;
    path: string;
    current: boolean;
}
function App(): JSX.Element{
    useEffect(() => {
        navigate("/home")
    }, []);

      const navigate: NavigateFunction = useNavigate();
      const [currentNav, setCurrentNav] = React.useState("Acceuil");
      const tabs: ITabs[] = [
          {
              name:"Acceuil",
              path:"/home",
              current: true,
          },
          {
              name:"Equipes",
              path:"/teams",
              current: false,
          },
          {
              name:"Staff",
              path:"/staffList",
              current: false,
          },
          {
              name:"Club",
              path:"/club",
              current: false,
          },
          {
              name:"Gallerie",
              path:"/galery",
              current: false,
          },
          {
              name:"Contacte",
              path:"/contact",
              current: false,
          },
          {
              name:"Information utiles",
              path:"/info",
              current: false,
          },
      ];

    return (
        <div>
            <div className="fixed top-0 w-full h-full z-10 bg-white ">
                <div className="my-0 bg-blue-300">
                <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">Select a tab</label>
                    <select
                        id="tabs"
                        name="tabs"
                        value={currentNav}
                        className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        {tabs.map((tab) => (
                            <option key={tab.name}>{tab.name}</option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:flex items-centerh-18 ">
                    <nav aria-label="Tabs"
                         className="flex-1 isolate flex divide-x divide-gray-200 shadow items-stretch">
                        <Link className="flex shrink-0 items-center justify-center w-12 h-12" to="/staff">
                            <img
                                alt="SHCMSMLOGO"
                                src="/LOGOMSM.webp"
                                className="h-12 w-22 "
                            />
                        </Link>
                        {tabs.map((tab: ITabs, tabIdx: number) => (
                            <React.Fragment key={tab.name}>
                                <Link
                                    to={tab.path}
                                    aria-current={tab.name === currentNav ? 'page' : undefined}
                                    onClick={(event) => HandleTabChange(tab.name)}
                                    className={classNames(
                                        "h-full",
                                        tab.name === currentNav ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                                        tabIdx === 0 ? '' : '',
                                        tabIdx === tabs.length - 1 ? '' : '',
                                        'group relative min-w-0 flex-1 overflow-hidden  px-4 py-4 text-center text-sm font-medium hover:bg-blue-200 focus:z-10'
                                    )}
                                >
                                    <span>{tab.name}</span>
                                    <span
                                        aria-hidden="true"
                                        className={classNames(
                                            tab.name === currentNav ? 'bg-black' : 'bg-transparent',
                                            'absolute inset-x-0 bottom-0 h-0.5'
                                        )}
                                    />
                                </Link>
                            </React.Fragment>
                        ))}

                    </nav>
                </div>
                </div>
                <Outlet/>
            </div>
        </div>
    )

    function HandleTabChange(tabName: string): void {
        let currTab: ITabs | undefined = tabs.find((tab) => tab.name = tabName);
        setCurrentNav(tabName);
        if (currTab) {
            console.log(tabs);
            tabs.forEach((tab) => {
                tab.current = false
            });
            currTab.current = true;
        }
    }

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }
}

export default App;
