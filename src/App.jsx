import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import DashboardLayout from "./scenes/layout/DashboardLayout";
import AdminLogin from "./scenes/admin/auth/Login";
import MerchantSignup from "./scenes/merchant/auth/Signup";
import MerchantLogin from "./scenes/merchant/auth/Login";
import VolunteerSignup from "./scenes/volunteer/auth/Signup";
import VolunteerLogin from "./scenes/volunteer/auth/Login";
import NotFound404 from "./scenes/_404";
import Signup from "./scenes/signup/Signup";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>

          <Route path="signup" element={<Signup />} />
          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Merchant Auth */}
          <Route path="/merchant/signup" element={<MerchantSignup />} />
          <Route path="/merchant/login" element={<MerchantLogin />} />

          {/* Volunteer Auth */}
          <Route path="/volunteer/signup" element={<VolunteerSignup />} />
          <Route path="/volunteer/login" element={<VolunteerLogin />} />

          {/* Nested routes under the dashboard layout */}
          <Route
            path="/"
            element={<DashboardLayout isSidebar={isSidebar} setIsSidebar={setIsSidebar} />}
          >


            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/team" element={<Team />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/form" element={<Form />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/line" element={<Line />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/geography" element={<Geography />} /> */}

          </Route>
          {/* 404 Not Found Page */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;