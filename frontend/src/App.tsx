import { BrowserRouter, Route, Routes } from "react-router-dom"
import Scheduling from "./routes/Scheduling"
import SchedulingListing from "./routes/Scheduling/SchedulingListing"



function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Scheduling />}>
          <Route index element={<SchedulingListing />} ></Route>
          <Route path=":id" element={<SchedulingListing />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
