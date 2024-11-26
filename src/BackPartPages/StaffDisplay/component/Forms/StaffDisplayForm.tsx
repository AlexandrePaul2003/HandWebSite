import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {IMember} from "../../../../IData/Member/IMember";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {CreateMember, GetMember, UpdateMember} from "../../../../Services/MemberService";
import {TextFieldForm} from "../../../../components/Form/TextFieldForm";
import {Button} from "@mui/material";
import React, {useState} from "react";
import {QuillForm} from "../../../../components/Form/QuillForm";
import {toast} from "react-toastify";

export function StaffDisplayForm() {
    const navigate: NavigateFunction = useNavigate();
    const member_pk: number = Number(useParams().Id);
    const [fileBytes, setFileBytes] = useState<Uint8Array | null>(null);
    const defaultMember: IMember = {
        id: 0,
        order: 0,
        name:"",
        role:"",
        type:"",
        bio:"",
        picture:""
    };
    const memberShema = yup.object().shape({
        name: yup.string().required(),
        role: yup.string().required(),
        type: yup.string().required(),
        bio: yup.string(),
        picture: yup.string(),
    });
    const { register, handleSubmit,setValue, getValues, formState: { errors }, watch } = useForm({
        resolver: yupResolver(memberShema),
        defaultValues: LocalGetMember,
    });
    const bio = watch("bio");
    async function LocalGetMember(): Promise<IMember> {
        let localMember : IMember = defaultMember;
        if(member_pk > -1){
            localMember = await GetMember(member_pk);
        }
        return localMember;
    }
    async function OnSubmit(member: IMember): Promise<void> {
        console.log(member);
        if (fileBytes !== null ) member.picture = convertUint8ArrayToBase64(fileBytes);
        let status = member_pk > -1 ? await UpdateMember(member) : await CreateMember(member);
        if (status.type === "success"){
            toast.success(status.description);
            navigate("/staff/staffDisplay/")
        } else{
            toast.error(status.description);
        }
    }
    function convertUint8ArrayToBase64(bytes: Uint8Array): string {
        const binaryString = Array.from(bytes)
            .map(byte => String.fromCharCode(byte))
            .join('');
        return btoa(binaryString);
    }



    function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    const arrayBuffer = e.target.result as ArrayBuffer;
                    const bytes = new Uint8Array(arrayBuffer);
                    setFileBytes(bytes);
                    console.log("File bytes:", bytes);
                }
            };

            reader.readAsArrayBuffer(file);
        }
    }
    return (
        <>
            <form style={{display: "flex", flexDirection: "column", gap: "10px"}}
                  onSubmit={handleSubmit((member) => OnSubmit(member as IMember))}>
                <TextFieldForm displayName={"Nom"} register={register} formName={'name'} errors={errors}/>
                <TextFieldForm displayName={"Rôle"} register={register} formName={'role'}
                               errors={errors}/>
                <TextFieldForm displayName={"Type"} register={register} formName={'type'}
                               errors={errors}/>
                <QuillForm displayName={"Biographie"} getValues={getValues} formName={'bio'}
                           errors={errors} setValue={setValue}/>
                <div className="font-[sans-serif] max-w-md mx-auto">
                    <label className="text-base text-gray-500 font-semibold mb-2 block">Upload file</label>
                    <input type="file"  accept="image/jpeg" onChange={handleFileUpload}
                           className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"/>
                    <p className="text-xs text-gray-400 mt-2">PNG, JPG </p>
                </div>
                <div style={{display: "flex"}}>
                    <Button type="submit" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Envoyer </Button>
                    <Button onClick={(): void => navigate("/staff/staffDisplay/")} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> Retour </Button>
                </div>
            </form>
            <button onClick={() => console.log(getValues("bio"))}>test</button>
        </>
    );
}