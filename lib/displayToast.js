import { Zoom, toast } from 'react-toastify'

const displayToast = (text) => {
    toast(text, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
}

export default displayToast