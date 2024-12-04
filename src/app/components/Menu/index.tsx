import Link from "next/link"

const Menu = () => {
    return (
        <nav className="flex justify-around text-2xl text-[#8e8ec5] m-6">
            <Link className="hover:text-yellow-500 hover:underline transition 4s hover:font-semibold" href="/">Home</Link>
            <Link className="hover:text-yellow-500 hover:underline transition 4s hover:font-semibold" href="/profile">Profile</Link>
            <Link className="hover:text-yellow-500 hover:underline transition 4s hover:font-semibold" href="/category">Category</Link>
        </nav>
    )
}

export default Menu;