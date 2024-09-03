import React from "react"
import ReactDOM from "react-dom/client"
import { Toaster } from "./components/ui/toaster"
import Router from "./router"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/query-client"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className='w-screen h-screen'>
        <Router />
        <Toaster />
      </div>
    </QueryClientProvider>
  </React.StrictMode>,
)
