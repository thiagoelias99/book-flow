import H2 from "@/components/ui/h2"
import { Link, Outlet, useLocation } from "react-router-dom"

export default function LoggedArea() {
  const route = useLocation().pathname

  return (
    <main className='w-full h-full p-4'>
      <H2>Logged Area</H2>
      <div className='w-full h-full mt-4 flex flex-row justify-start items-start gap-4'>
        <aside className='w-full h-full max-w-40 border-r-2'>
          <nav className='w-full flex flex-col justify-start items-start gap-2'>
            <Link to="/logged-area/users"
              className={route === "/logged-area/users" ? "text-primary" : ""}
            >Users</Link>
            <Link to="/logged-area/books"
              className={route === "/logged-area/books" ? "text-primary" : ""}
            >Books</Link>
          </nav>
        </aside>
        <section className='w-full h-full'>
          <Outlet />
        </section>
      </div>
    </main>
  )
}
