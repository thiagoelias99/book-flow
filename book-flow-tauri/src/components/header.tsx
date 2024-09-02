import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { buttonVariants } from "./ui/button"

export default function Header() {
  return (
    <header className='w-full px-4 py-2 flex flex-row justify-between items-center'>
      <h1 className='text-2xl font-bold'>Book Flow</h1>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => `${isActive ? "text-primary" : ""}`}
        >
          Home
        </NavLink>

      </nav>

      <Link
        to="/login"
        className={cn("", buttonVariants({ variant: "ghost" }))}
      >Login</Link>
    </header>
  )
}
