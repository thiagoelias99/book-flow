import React from "react"
import ReactDOM from "react-dom/client"
import { Toaster } from "./components/ui/toaster"
import Router from "./router"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className='w-screen h-screen'>
      <Router />
      <Toaster />
    </div>
  </React.StrictMode>,
)
