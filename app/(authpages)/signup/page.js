export default function SingUp(){
    return <form action="/api/auth/signup" method="post" className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input name="email" />
                <label htmlFor="password">Password</label>
                <input name="password" />
                <button type="submit">Sing Up</button>
           </form>
}