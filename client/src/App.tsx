import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import type { RootState } from "./store/store"
import AuthPage from "./pages/AuthPage/AuthPage"
import { authStatus } from "./store/slices/auth.slice"
import apiSlidersService from "./utils/api/api.sliders.service"
import LoadingSpinner from "./ui/LoadingSpinner"
import SlidePage from "./pages/Slide/SlidePage"
import "./App.css"
import { setSliders } from "./store/slices/slide.slice"
function MainApp() {
  const auth = useSelector((s: RootState) => s.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    const findSliders = async () => {
      const sliders = await apiSlidersService.getSlides()
      if(sliders) {
        dispatch(setSliders({ sliders }))
        dispatch(authStatus({ status: "auth" }))
      } else {
        dispatch(authStatus({ status: "notAuth" }))
      }
    }
    findSliders()
  }, [auth.authStatus, dispatch])

  return (
    <div className={`min-h-screen bg-white transition-colors duration-200 bg-gray-50 text-gray-900`}>
      <div className="mx-auto">
        <Routes>
          {auth.authStatus === "loading" && <Route path="/" element={<LoadingSpinner />} />}
          {auth.authStatus === "notAuth" && <Route path="/*" element={<AuthPage />} />}
          {auth.authStatus === "auth" && <>
            <Route path="/" element={<SlidePage />} />
          </>}
        </Routes>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  )
}
