import Pagination from '@mui/material/Pagination';
import React from "react";


interface IProps {
    NumberPerPage: number;
    TotalObjects: number;
    Refresh(offset: number): void;
}



export function Navigation(props: IProps): JSX.Element {

    const [page, setPage] = React.useState<number>(1);

    function handlePageChange(_event: React.ChangeEvent<unknown>,page: number) {
        setPage(page);
        props.Refresh(props.NumberPerPage*(page - 1));
    }

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Pagination
                count={Math.round(props.TotalObjects / props.NumberPerPage)}
                page={page}
                onChange={handlePageChange}
            />
        </div>
    );

}