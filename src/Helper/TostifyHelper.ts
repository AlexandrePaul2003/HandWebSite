import {Bounce, ToastOptions} from "react-toastify";

const tostifyObject: ToastOptions<unknown> = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
}
export function getTostifyParams(): ToastOptions<unknown> {
    return tostifyObject;
}