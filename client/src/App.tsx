import { Routes, Route, BrowserRouter } from "react-router-dom"
import NotFound from "./components/NotFound"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import ChatPage from "./Pages/ChatPage"
import ChatProvider from "./Context/ChatProvider"

function App() {
  return (
    <>
      <BrowserRouter>
        <ChatProvider>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="chats" element={<ChatPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ChatProvider>
      </BrowserRouter>
    </>
  )
}

export default App