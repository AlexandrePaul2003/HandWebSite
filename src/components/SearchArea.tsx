import {Button, TextField} from "@mui/material";
import {useState} from "react";

interface IProps {
    DoResearch(research: string): Promise<void>;
    RemoveResearch(): Promise<void>;
}
export const SearchArea = (props: IProps) => {
    const [search, setSearch] = useState<string>("");
    return (
        <>
            <div>
                <TextField label="Recherche" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <Button onClick={async (): Promise<void> => {
                    if (search !== "") await props.DoResearch(search);
                    else alert("Impossible d'effectué une recherche vide !");
                }}>Rechercher</Button>
                <Button onClick={async (): Promise<void> => {
                    await props.RemoveResearch();
                    setSearch("");
                }}>Vider</Button>
            </div>
        </>
    );
};