import Alltasks from "./pages/Alltasks";
import CompletedTasks from "./pages/CompletedTasks";
import IncompleteTasks from "./pages/IncompleteTasks";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from "./pages/Signup";
import Signin from "./pages/SignIn";
import Protected from "./components/protected";

function App() {
  return (
    <>
      <div className="bg-gray-900 text-white h-screen p-2 relative">
        <BrowserRouter>
          <Routes>
            {/* Protected Routes */}
            <Route path="/" element={<Protected Component={Home} />}>
              <Route index element={<Protected Component={Alltasks} />} />
              <Route path="/incompleteTasks" element={<Protected Component={IncompleteTasks} />} />
              <Route path="/completedTasks" element={<Protected Component={CompletedTasks} />} />
            </Route>

            {/* Public Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
