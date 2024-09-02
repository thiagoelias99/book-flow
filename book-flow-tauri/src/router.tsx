import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import App from "./App"
import Header from "./components/header"
import Footer from "./components/footer"
import LoginPage from "./pages/login"
import LoggedArea from "./pages/logged-area"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className='w-full h-full flex flex-col justify-start items-start'>
            <Header />
            <Outlet />
            <Footer />
          </div>}>
          <Route index element={<App />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="logged-area" element={<LoggedArea />}>
            <Route path="users" element={<div>Users</div>} />
            <Route path="books" element={<div>Books</div>} />
          </Route>
          <Route path="*" element={<div>Pagina Não Encontrada</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
