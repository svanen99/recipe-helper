'use client'
import { useUserContext } from "@/utils/contexts";
import LogIn from "../LogIn";
import { UserContextType } from "@/utils/types";
import Menu from "../Menu";

const LogInWrapper = ({children}:{children:React.ReactNode}) => {
    const { user } = useUserContext() as UserContextType
    return (

        <div className="flex flex-col">
            {!user ? <LogIn /> : (
                <>
                    <Menu />
                    <p className="text-4xl text-yellow-500 text-center font-extralight underline m-20 font-montserrat">Hi {user.name}!</p>
                    {children}
                </>
            )}
        </div>
        
    )
}

export default LogInWrapper;