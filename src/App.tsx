import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ReportRoute } from "./routes/ReportRoute"

export const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}> {/* this pulls the base path from the vite config */}
      <Routes>
        <Route path="/report" element={<ReportRoute />} />
      </Routes>
    </BrowserRouter>
  )
}
