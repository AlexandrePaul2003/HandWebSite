import {IGaleryPictures} from "../../../IData/GaleryPictures/IGaleryPictures";
import {ValidationPopup} from "../../../components/ValidationPopup";
import React, {useState} from "react";
import {DeleteGalerySubject} from "../../../Services/GalerySubjectService";
import {DeletePictures} from "../../../Services/GaleryPictureService";

interface IProps {
    pictures: IGaleryPictures[];
}


export function GaleryPictures(props: IProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteFunction, setDeleteFunction] = React.useState<any>();
    return (
        <>
            <ValidationPopup open={isOpen} setOpen={(value: boolean): void => setIsOpen(value)} OnConfirm={ConfirmDelete} text={"Voulez-vous vraiment supprimer cette image ?"}/>
            <ul
                role="list"
                className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
            >
                {props.pictures.length > 0 ? (
                    <>
                        {props.pictures.map((picture: IGaleryPictures) => (
                                <li key={picture.id} className="relative w-full">
                                    {/* Conteneur pour la photo */}
                                    <div
                                        className="group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
                                    >
                                        <div className="h-full w-full relative">
                                            <img
                                                alt=""
                                                src={`data:image/jpeg;base64,${picture.picture}`}
                                                className="pointer-events-none h-full w-full object-cover group-hover:opacity-75"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-0 focus:outline-none"
                                                style={{zIndex: 1}}
                                            >
                                                <span className="sr-only">View details for {"test"}</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Bouton "Supprimer" sous la photo */}
                                    <div className="mt-2 flex justify-end">
                                        <button
                                            type="button"
                                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                            onClick={():void => {setIsOpen(true); setDeleteFunction(() => () => DeletePictures(picture.id)); }}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </li>
                        ))}
                    </>
                ) : (<div><h1>nothing</h1></div>)}

            </ul>


        </>
    );
    function ConfirmDelete(): void {
        deleteFunction();
        window.location.reload();
    }
}