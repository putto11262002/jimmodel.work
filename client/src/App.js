import { BrowserRouter as Router, Routes, Route , Redirect} from "react-router-dom";
import Calender from "./pages/Calender";
import Model from "./pages/Model";
import Job from "./pages/Job";
import Admin from "./pages/Admin";
import MainNavbar from "./components/layout/navbar/MainNavbar";

import Alert from "./components/shared/alert/Alert";

import CreateModel from "./pages/CreateModel";
import ModelProfile from "./pages/ModelProfile";
import EditModel from "./pages/EditModel";

import ModalProvider from "./components/Modal/ModalProvider";

import Login from "./pages/Login";
import IsAuthenticated from "./components/shared/auth/IsAuthenticated";
import IsAdmin from "./components/shared/auth/IsAdmin";

import { useSessionContext } from "./context/unsecured/sessionContext";
import Register from "./pages/Regiester";
import NotFound from "./pages/NotFound";

function App() {
  const { loginStatus } = useSessionContext();
  return (
    <Router>
      {loginStatus && <MainNavbar />}
      {loginStatus && <ModalProvider />}
      <Alert />

      <Routes>
        <Route
          exact
          path="/"
          element={
            <IsAuthenticated>
              <Calender />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/model"
          element={
            <IsAuthenticated>
              <Model />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/job"
          element={
            <IsAuthenticated>
              <Job />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/admin"
          element={
            <IsAdmin>
              <Admin />{" "}
            </IsAdmin>
          }
        />
        <Route
          exact
          path="/create-model"
          element={
            <IsAuthenticated>
              <CreateModel />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/edit-model/:model_id"
          element={
            <IsAuthenticated>
              {" "}
              <EditModel />{" "}
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/model/:model_id"
          element={
            <IsAuthenticated>
              {" "}
              <ModelProfile />{" "}
            </IsAuthenticated>
          }
        />
       
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/*" element={<NotFound/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
