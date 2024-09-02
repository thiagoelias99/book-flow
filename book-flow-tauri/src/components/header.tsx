import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { Button, buttonVariants } from "./ui/button"
import { useLocalStorage } from "@/hooks/use-local-storage"

export default function Header() {
  const { storedValue, setValue } = useLocalStorage("current_user", null)

  return (
    <header className='w-full px-4 py-2 flex flex-row justify-between items-center'>
      <h1 className='text-2xl font-bold'>Book Flow</h1>
      <nav className='flex flex-row justify-center items-baseline gap-4'>
        <NavLink
          to="/"
          className={({ isActive }) => `${isActive ? "text-primary" : ""}`}
        >
          Home
        </NavLink>

        {storedValue && (
          <>
            <NavLink
              to="/logged-area"
              className={({ isActive }) => `${isActive ? "text-primary" : ""}`}
            >
              Logged Area
            </NavLink>
          </>
        )

        }
      </nav>

      {storedValue ? (
        <Button
          variant="ghost"
          onClick={() => setValue(null)}
        >Logout
        </Button>
      ) : (
        <Link
          to={"/login"}
          className={cn("", buttonVariants({ variant: "ghost" }))}
        >Login</Link>
      )
      }
    </header >
  )
}
