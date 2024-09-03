import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { Button, buttonVariants } from "./ui/button"
import useUser from "@/hooks/use-user"
import useUsers from "@/hooks/use-users"
import { UserLevels } from "@/models/User"

export default function Header() {
  const { user } = useUser(undefined)
  const { logout } = useUsers()

  return (
    <header className='w-full px-4 py-2 flex flex-row justify-between items-center bg-card'>
      <h1 className='text-2xl font-bold'>Book Flow</h1>
      <nav className='flex flex-row justify-center items-baseline gap-4'>
        {!!user && (
          <>
            <NavLink
              to="/"
              className={({ isActive }) => `${isActive ? "text-primary" : ""}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) => `${isActive ? "text-primary" : ""}`}
            >
              Profile
            </NavLink>
            {(user.level === UserLevels.admin.toLowerCase() || user.level === UserLevels.manager.toLowerCase()) && (
              <NavLink
                to="/logged-area"
                className={({ isActive }) => `${isActive ? "text-primary" : ""}`}
              >
                Admin Area
              </NavLink>
            )}
          </>
        )}
      </nav>

      {user ? (
        <Button
          variant="ghost"
          onClick={() => logout()}
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
