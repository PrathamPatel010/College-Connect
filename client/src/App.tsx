import { Routes, Route, BrowserRouter } from "react-router-dom"
import NotFound from "./components/NotFound"
import SignIn from "./components/Pages/SignIn"
import SignUp from "./components/Pages/SignUp"
import ChatPage from "./components/Pages/ChatPage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="chats" element={<ChatPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ >
  )
}

export default App