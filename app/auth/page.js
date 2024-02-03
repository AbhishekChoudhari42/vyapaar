"use client";
// import { button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useSearchParams } from "next/navigation";

export default function Page() {
	const params = useSearchParams();
	const next = params.get("next") || "";
	const handleLoginWithOAuth = (provider) => {
		const supabase = supabaseBrowser();
		supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: location.origin + "/auth/callback?next=" + next,
			},
		});
	};

	return (
		<div className="flex items-center justify-center w-full h-[100vh] bg-black">
			<div className=" w-96 rounded-md border p-5 space-y-5 relative bg-slate-900">
				<div className="flex items-center gap-2">
					<KeyRound />
					<h1 className="text-2xl font-bold">NextJS + Supabase</h1>
				</div>

				<p className="text-sm text-gray-300">
					Register/SignIn Today 👇
				</p>
				<div className="flex flex-col gap-5">
					<button
						className=" w-full flex items-center gap-2 "
						onClick={() => handleLoginWithOAuth("google")}
					>
						<FcGoogle /> Google
					</button>
				</div>
				<div className="glowBox -z-10"></div>
			</div>
		</div>
	);
}
