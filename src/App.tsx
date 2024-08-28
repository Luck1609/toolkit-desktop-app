import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Guest from "./layouts/guest";
import Register from "./pages/auth/register";
import Office from "./pages/auth/office";
import AuthLayout from "./layouts/auth";
import Dashboard from "./pages/dashboard";
import Permit from "./pages/applications";
import Locality from "./pages/locality";
import Sectors from "./pages/sector";
import Session from "./pages/sessions";
import Letters from "./pages/letters";
import Staff from "./pages/staff";
import Sms from "./pages/sms";
import Settings from "./pages/settings";
import Committee from "./pages/committee";
import CommitteeForm from "./pages/committee/form";
import PreflightCheck from "./pages/preflight";
import PermitForm from "./pages/applications/form";
import LocalityForm from "./pages/locality/form";
import SectorForm from "./pages/sector/form";
import Extracts from "./pages/extract";
import ExtractForm from "./pages/extract/form";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Guest />}>
          <Route index element={<PreflightCheck />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="office" element={<Office />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="committee-members">
            <Route index element={<Committee />} />
            <Route path=":page/:id?" element={<CommitteeForm />} />
            
            <Route path="*" element={<Committee />} />
          </Route>

          <Route path="letters">
            <Route index element={<Letters />} />
            <Route path=":page/:id?" element={<CommitteeForm />} />
            
            <Route path="*" element={<Committee />} />
          </Route>

          <Route path="staff">
            <Route index element={<Staff />} />
            <Route path=":page/:id?" element={<CommitteeForm />} />
            
            <Route path="*" element={<Committee />} />
          </Route>

          <Route path="sessions">
            <Route index element={<Session />} />
            <Route path=":page/:id?" element={<CommitteeForm />} />
            
            <Route path="*" element={<Committee />} />
          </Route>

          <Route path="sms">
            <Route index element={<Sms />} />
            <Route path=":page/:id?" element={<CommitteeForm />} />
            
            <Route path="*" element={<Committee />} />
          </Route>

          <Route path="applications">
            <Route index element={<Permit />} />
            <Route path=":page/:id?" element={<PermitForm />} />
            <Route path="*" element={<Permit />} />
          </Route>

          <Route path="extracts">
            <Route index element={<Extracts />} />
            <Route path=":page/:id?" element={<ExtractForm />} />
            <Route path="*" element={<Extracts />} />
          </Route>

          <Route path="localities">
            <Route index element={<Locality />} />
            <Route path=":page/:id?" element={<LocalityForm />} />
            <Route path=":id">
              <Route path="sectors">
                <Route index element={<Sectors />} />
                <Route path=":page/:id?" element={<SectorForm />} />

                <Route path="*" element={<Sectors />} />
              </Route>
            </Route>
            <Route path="*" element={<Locality />} />
          </Route>

          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
