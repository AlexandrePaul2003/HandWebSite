import React, {useEffect} from "react";
import {IMember} from "../../IData/Member/IMember";
import {DeleteMeber, GetAllMembersByType} from "../../Services/MemberService";
import {useNavigate} from "react-router-dom";
import {ValidationPopup} from "../../components/ValidationPopup";

export function StaffDisplay() {
    const [members, setMembers ] = React.useState<IMember[]>([]);
    const navigate = useNavigate();
    const [deleteFunction, setDeleteFunction] = React.useState<any>();
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
        GetAllMembersByType("coach").then(function (result: IMember[]){
            setMembers(result);
        });
    }, []);
    function DeleteMember(event: React.MouseEvent, member_pk: number): void {
        event.stopPropagation();
        setDeleteFunction(() => () => ConfirmDelete(member_pk));
        setOpen(true);
    }
    async function ConfirmDelete(member_pk: number): Promise<void> {
        await DeleteMeber(member_pk);
        GetAllMembersByType("coach").then(function (result: IMember[]){
            setMembers(result);
        });
    }
    return (
        <>
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900">Staff</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        La liste des staff affichés sur la facade du site.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        onClick={()=> navigate("/staff/staffDisplay/Form/-1")}
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Ajouter
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th scope="col"
                                    className="px-3 w-1/12 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Ordre
                                </th>
                                <th scope="col"
                                    className="py-3.5 w-3/12 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                    Nom
                                </th>
                                <th scope="col"
                                    className="px-3 w-1/12 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Type
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0 my-2">
                                    <span className="sr-only">Supprimer</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {members.map((member) => (
                                <tr key={member.name} className="hover:bg-gray-50"
                                    onClick={()=> navigate("/staff/staffDisplay/Form/"+member.id)}>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{member.order}</td>
                                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                        <div className="flex items-center">
                                            <div className="size-11 shrink-0">
                                                {member.picture ? (
                                                    <img src={`data:image/jpeg;base64,${member.picture}`}
                                                         alt="Dynamic from bytes"
                                                         className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"/>
                                                ) : (
                                                    <p>Loading...</p>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="font-medium text-gray-900">{member.name}</div>
                                                <div className="mt-1 text-gray-500">{member.role}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        <div className="text-gray-900">{member.type}</div>
                                    </td>
                                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <button
                                            type="button"
                                            onClick={(event: React.MouseEvent)=> DeleteMember(event, member.id)}
                                            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
            <ValidationPopup open={open} setOpen={setOpen} OnConfirm={deleteFunction} text={"Voullez-vous vraiment supprimer ce membre ?"}/>
            </>
    );
}