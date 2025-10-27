import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ReportRoute } from "./routes/ReportRoute"
import { MainLayout } from "./components/layouts/MainLayout"
import { DevBuildLinkView } from "./views/DbgBuildLinkView"

export const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}> {/* this pulls the base path from the vite config */}
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ReportRoute />} />
          <Route path="/dbg/build-link" element={<DevBuildLinkView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
