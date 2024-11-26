import React, {useEffect} from "react";
import {IMember} from "../../../IData/Member/IMember";
import {GetAllMembers, GetAllMembersByType} from "../../../Services/MemberService";

export function Staff() {

    const [members, setMembers ] = React.useState<IMember[]>([]);

    useEffect(() => {
        GetAllMembersByType("coach").then(function (result: IMember[]){
            setMembers(result);
        })
    }, []);
    return (
        <div className="bg-gray-900 border-2 border-gray-900 h-full overflow-y-auto">
            <div className="bg-blue-800 py-24 md:py-32 text-white h-full m-4 rounded " >
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 px-6 lg:px-8 xl:grid-cols-5">
                    <div className="max-w-2xl xl:col-span-2">
                        <h2 className="text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
                            A propos de notre staff
                        </h2>
                        <p className="mt-6 text-lg/8 ">
                            Nos coaches sont des personnes à l'écoute et toujours de bonne humeur
                        </p>
                    </div>
                    <ul role="list" className="-mt-12 space-y-12 divide-y divide-gray-200 xl:col-span-3">
                        {members.map((member) => (
                            <li key={member.name} className="flex flex-col gap-10 pt-12 sm:flex-row">
                                {member.picture ? (
                                    <img src={`data:image/jpeg;base64,${member.picture}`} alt="Dynamic from bytes" className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover" />
                                ) : (
                                    <p>Loading...</p>
                                )}
                                <div className="max-w-xl flex-auto">
                                    <h3 className="text-lg/8 font-semibold tracking-tight">{member.name}</h3>
                                    <p className="text-base/7 ">{member.role}</p>
                                    <p className="mt-6 text-base/7 ">{member.bio}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}