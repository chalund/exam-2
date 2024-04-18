import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import './App.css'



import HomePage from "./Pages/HomePage"
import ListOfVenuesPage from "./Pages/VenuesPage"
import AboutPage from "./Pages/AboutPage"
import NotFoundPage from "./Pages/NotFoundPage"
import Layout from "./components/Layout"



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="listings" element={<ListOfVenuesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />


        </Route>
      </Routes>
    </Router>
 )
}

export default App
