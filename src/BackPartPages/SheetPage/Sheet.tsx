import React, {useEffect, useState} from "react";
import {
    GetAllSheets,
    GetAllSheetsFiltered,
    GetNumberSheets,
    GetNumberSheetsFiltered
} from "../../Services/SheetService";
import {ISheet} from "../../IData/Sheet/ISheet";
import {Box, Button, CircularProgress} from "@mui/material";
import {SheetTable} from "./component/SheetTable";
import {Navigation} from "../../components/Navigation";
import {SearchArea} from "../../components/SearchArea";
import {toast} from "react-toastify";
import {getTostifyParams} from "../../Helper/TostifyHelper";
import {useNavigate} from "react-router-dom";

export function Sheet(): JSX.Element {

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [sheets, setSheets] = useState<ISheet[]>([]);
    const [ offset, setOffset ] = React.useState<number>(0);
    const [numberSheets, setNumberSheets] = React.useState<number>(0);
    const [isSearching, setIsSearching] = React.useState<boolean>(false);
    const [search, setSearch] = React.useState<string>("");
    const navigate = useNavigate();
    const numberPerPage: number = 15;
    useEffect(() => {
        try {
            GetSheets(numberPerPage, offset).then(() => {
                GetNumberSheets().then((result) => setNumberSheets(result));
            });
        }
        catch (ex: any){
            alert(ex.message);
        }

    }, []);
    async function RefreshSheet(Offset: number): Promise<void> {
        setIsLoaded(false);
        isSearching ? await GetSheetsFiltered(numberPerPage, Offset, search) : await GetSheets(numberPerPage, Offset);
        setOffset(Offset);
    }
    async function GetSheets(numberPerPage: number, offset: number): Promise<void> {
        GetAllSheets(numberPerPage, offset).then(function(response: ISheet[]) {
            setSheets(response);
            if (response.length <= 0) {
                toast.error("Impossible de charger les différentes feuilles", getTostifyParams());
            }
            setIsLoaded(true);
        });
    }
    async function GetSheetsFiltered(numberPerPage: number, offset: number, search: string): Promise<void> {
        GetAllSheetsFiltered(numberPerPage, offset, search).then(function(response: ISheet[]) {
            setSheets(response);
            if (response.length <= 0) {
                toast.error("Impossible de charger les différentes feuilles", getTostifyParams());
            }
            setIsLoaded(true);
        });
    }
    async function DoResearch(Search: string): Promise<void> {
        setIsLoaded(false);
        setSearch(Search);
        setIsSearching(true);
        await GetNumberSheetsFiltered(Search).then((result) => setNumberSheets(result));
        await GetSheetsFiltered(numberPerPage, offset, Search);
    }
    async function RemoveResearch(): Promise<void> {
        setIsLoaded(false);
        setIsSearching(false);
        setSearch("");
        await GetNumberSheets().then((result) => setNumberSheets(result));;
        await GetSheets(numberPerPage, offset);
    }
    return (
       <div style={{width:'100%',height:'100%'}}>
           <SearchArea DoResearch={DoResearch} RemoveResearch={RemoveResearch} />
           { isLoaded ? (
               <>
                   <SheetTable sheets={sheets} Refresh={(): Promise<void> => GetSheets(numberPerPage, offset)}  />
                   <Navigation NumberPerPage={numberPerPage} TotalObjects={numberSheets} Refresh={RefreshSheet}/>
               </>
           ) : (
           <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
               <CircularProgress />
           </Box>
           )}

       </div>
    );
}