"use client";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState, useTransition } from "react";
// import { loginWithEmailAndPassword,signUpWithEmailAndPassword } from "../app/auth/actions";

export default function AuthForm() {

	const [isPending, startTransition] = useTransition();
    const [data,setData] = useState({})

    const handleChange = (e) => {
        console.log(data)
        setData({...data,[e.target.name]:e.target.value})
    }

	function onSubmit(data,e) {
		e.preventDefault()
		startTransition(async () => {
			const { error } = JSON.parse(
				// await loginWithEmailAndPassword(data)
			);
            console.log(data)
			if (error) {
				toast("Fail to login");
			} else {
				toast("Successfully login 🎉");
			}
		});
	}

	return (
		<div className="w-96">
            <form className="flex flex-col gap-4">
				<p>sign in</p>
                <input  onChange={handleChange}  name="email" className="rounded-md p-1 text-black" />
                <input  onChange={handleChange}  name="password" className="rounded-md p-1 text-black" />
                <button onClick={(e)=>onSubmit(data,e)} className="text-black bg-white py-2 rounded-md">Login</button>
            </form>
            <form className="flex flex-col gap-4">
				<p>sign up</p>
                <input  onChange={handleChange}  name="email" className="rounded-md p-1 text-black" />
                <input  onChange={handleChange}  name="password" className="rounded-md p-1 text-black" />
                <button onClick={(e)=>onSubmit(data,e)} className="text-black bg-white py-2 rounded-md">Login</button>
            </form>
		</div>
	);
}