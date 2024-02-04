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
        <div className="flex items-center justify-center w-full h-screen rounded-md">
            <div className="w-full max-w-96 bg-black rounded-md p-2 space-y-5 relative">
                {/* <div className="flex flex-col gap-5 w"> */}
                    <button
                        className="w-full flex items-center gap-2 rounded-md p-2 relative bg-blue-600 justify-center"
                        onClick={() => handleLoginWithOAuth("google")}
                    >
                        <div className="bg-white p-2 rounded-[6px] absolute left-1">
                            <FcGoogle />
                        </div>
                        <p className="text-white font-semibold">Sign In with Google</p>
                    </button>
                {/* </div> */}
                <div className="glowBox -z-10"></div>
            </div>
        </div>
    );
}
