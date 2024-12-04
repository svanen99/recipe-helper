'use client'
import { SetStateAction, useState } from "react"
import { registredUsers } from "@/utils/users"
import { UserType } from "@/utils/types"
import { UserContextType } from "@/utils/types";
import { useUserContext } from "@/utils/contexts";

const LogIn  = () => {
    const[userInput, setUserInput] = useState<string | null>(null)

    const {setUser} = useUserContext() as UserContextType

    const handleChange = (e: { target: { value: SetStateAction<string | null> } }) => {
        setUserInput(e.target.value)
    }

    const handleClick = () => {
        const loggedInUser:UserType[] = registredUsers.filter((user:UserType) => user.name === userInput)
        if (loggedInUser.length) {
            console.log(loggedInUser[0])
            setUser(loggedInUser[0])
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <p className="text-[#3c179b] mb-6 justify-center text-2xl font-montserrat">To log in, please enter your username!</p>
            <label className="font-montserrat mb-2 text-black" htmlFor="user-input"> Enter Username:</label>
            <input className="w-full max-w-sm p-3 border rounded-lg focus:ring-2 focus:ring-[#3c179b] outline-none transition mb-4 text-[#3c179b]" id="user-input" onChange={handleChange} />
            <button className="font-montserrat bg-gray-200 text-black w-full max-w-sm py-3 rounded-lg hover:bg-[#d7d4ff] transition" onClick={handleClick}>Submit!</button>
        </div>
    )
}

export default LogIn;