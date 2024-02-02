export default function LogIn(){
    return <form action="/api/auth/login" method="post" className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" />
                <button  type="submit">Log In</button>
           </form>
}