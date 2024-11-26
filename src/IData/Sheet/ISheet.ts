import {ICommand} from "../Command/ICommand";

export interface ISheet {
    id: number;
    name: string;
    communication: string;
    commands: ICommand[];
    total: number;
}