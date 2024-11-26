import {ICommand} from "../../../IData/Command/ICommand";
import {ISheet} from "../../../IData/Sheet/ISheet";
import { Chip, Fab, Table} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Delete } from "@mui/icons-material";
import {DeleteSheet} from "../../../Services/SheetService";
import {IError} from "../../../IData/IError";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {DeleteCommand, GetGlobalTotalCommand} from "../../../Services/CommandService";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {getTostifyParams} from "../../../Helper/TostifyHelper";

interface IProps {
    sheets: ISheet[];
    Refresh: () => void;

}

export function SheetTable(props: IProps): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const [totalGlobal, setTotalGlobal] = useState<number>(0);
    useEffect(() => {
        GetTotalSheet();

    }, []);

    return (
        <>
            <div className="lg:px-4 max-h-10/12">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            onClick={AddSheet}
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
                                <tr className="divide-x divide-gray-200">
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0 w-1/12">
                                        Nom
                                    </th>
                                    <th scope="col"
                                        className="px-2 text-left text-sm font-semibold text-gray-900 w-9/12">
                                        Commandes
                                    </th>

                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0 w-1/12">
                                        Total
                                    </th>
                                    <th className="w-1/12">

                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {props.sheets.map((sheet) => (
                                    <tr key={sheet.name} className="divide-x divide-gray-200"
                                        onClick={() => UpdateSheet(sheet.id)}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                                            {sheet.name}
                                        </td>
                                        <td className="whitespace-nowrap  text-sm text-gray-500 ">
                                            <div className="space-x-0.5 ml-1">
                                                {sheet.commands.length > 0 ? (

                                            <>
                                                {sheet.commands.map((command: ICommand, key: number) => (
                                                    <Chip color={command.price >= 0 ? "success" : "error"}
                                                          className="min-h-10 min-w-2"
                                                          label={command.price.toFixed(2) + "€"}
                                                          key={key}
                                                          onClick={(event): Promise<void> => UpdateCommand(event, command.id)}
                                                          onDelete={(event): Promise<void> => OnDeleteCommand(event, command.id)}/>
                                                ))}
                                            </>
                                        ) : (
                                            <Chip style={{marginRight: "0.15%", height: "40px", width: "16%"}}
                                                  label={"Aucune note !"}></Chip>
                                        )}
                                            <Fab size="small" color="info" aria-label="add"
                                                     onClick={(event): void => AddCommand(event, sheet.id)}>
                                                    <AddIcon/>
                                                </Fab>
                                            </div>
                                        </td>

                                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">{sheet.total + "€"}</td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
                                            <Fab size="small" color="error" aria-label="add"
                                            onClick={(event): Promise<void> => OnDeleteCommand(event,sheet.id)}>
                                            <Delete/>
                                        </Fab></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <span>{"Total de la feuille: " + totalGlobal.toFixed(2) + "€"}</span>
            </div>
        </>
    );

    function AddCommand(event: any, sheet_pk: number): void {
        event.stopPropagation();
        navigate("/staff/sheet/CommandForm/-1/" + sheet_pk);
    }

    function AddSheet(): void {
        navigate("/staff/sheet/SheetForm/-1");
    }

    function UpdateSheet(sheet_pk: number): void {
        console.log("test");
        navigate("/staff/sheet/SheetForm/" + sheet_pk);
    }

    async function OnDeleteSheet(event: any, sheet_pk: number): Promise<void> {
        event.stopPropagation();
        const status: IError = await DeleteSheet(sheet_pk);
        if (status.type === "success") {
            toast.success(status.description, getTostifyParams());
            props.Refresh();
        } else {
            toast.error(status.description, getTostifyParams());
        }
    }

    async function OnDeleteCommand(event: any, command_pk: number) {
        event.stopPropagation();
        const status: IError = await DeleteCommand(command_pk);
        if (status.type === "success") {
            toast.success(status.description, getTostifyParams());
            props.Refresh();
        } else {
            toast.error(status.description, getTostifyParams());
        }
    }

    async function UpdateCommand(event: any, command_pk: number) {
        event.stopPropagation();
        navigate("/staff/sheet/CommandForm/" + command_pk + "/-1");
    }

    async function GetTotalSheet(): Promise<void> {
        let total: number = await GetGlobalTotalCommand()
        setTotalGlobal(total);
    }
}