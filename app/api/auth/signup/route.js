import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function POST(req,res){
    const url = new URL(req.url)
    const formData = await req.formData();
    
    const email = formData.get('email')
    const password = formData.get('password')

    const cookieStore = cookies()
    
    const supabase =  createRouteHandlerClient(
            {
                cookies:() => cookieStore
            }
        )
    
        const response = await supabase.auth.signUp({
        email,password,options:{
            emailRedirectTo:`${url.origin}/auth/callback`
        }
    })

    return NextResponse.redirect(url.origin)
}

// process.env.NEXT_PUBLIC_SUPABASE_URL,
// process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY