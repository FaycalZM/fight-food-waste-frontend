import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "@/scenes/dashboard";
import Team from "@/scenes/team";
import Invoices from "@/scenes/invoices";
import Contacts from "@/scenes/contacts";
import Bar from "@/scenes/bar";
import Form from "@/scenes/form";
import Line from "@/scenes/line";
import Pie from "@/scenes/pie";
import FAQ from "@/scenes/faq";
import Geography from "@/scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "@/theme";
import Calendar from "@/scenes/calendar/calendar";
import DashboardLayout from "@/scenes/layout/DashboardLayout";
import AdminLogin from "@/scenes/admin/auth/Login";
import MerchantSignup from "@/scenes/merchant/auth/Signup";
import MerchantLogin from "@/scenes/merchant/auth/Login";
import VolunteerSignup from "@/scenes/volunteer/auth/Signup";
import VolunteerLogin from "@/scenes/volunteer/auth/Login";
import NotFound404 from "@/scenes/_404";
import NewSubscriptions from "@/scenes/admin/merchants_management/NewSubscriptions";
import Partners from "@/scenes/admin/merchants_management/Partners";
import NewApplications from "@/scenes/admin/volunteers_management/NewApplications";
import Members from "@/scenes/admin/volunteers_management/Members";
import Stocks from "@/scenes/admin/stocks/Stocks";
import AddStock from "@/scenes/admin/stocks/AddStock";
import AddProductToStock from "@/scenes/admin/stocks/AddProduct";
import StockDetails from "@/scenes/admin/stocks/Details";
import ProductDetails from "@/scenes/admin/stocks/ProductDetails";
import CollectionPlanning from "@/scenes/admin/collections/Planification";
import CollectionsHistory from "@/scenes/admin/collections/History";
import CollectionDetails from "./scenes/admin/collections/Details";
import InProgressCollections from "./scenes/admin/collections/InProgress";
import UpdateCollection from "./scenes/admin/collections/Update";
import DistributionsPlanning from "./scenes/admin/distributions/Planification";
import AddProductToDistribution from "./scenes/admin/distributions/AddProduct";
import AddBeneficiaryToDistribution from "./scenes/admin/distributions/AddBeneficiary";
import DistributionsHistory from "./scenes/admin/distributions/History";
import DistributionsDetails from "./scenes/admin/distributions/Details";
import InProgressDistributions from "./scenes/admin/distributions/InProgress";
import MerchantHome from "./scenes/merchant/home/Home";
import VolunteerHome from "./scenes/volunteer/home/Home";
import ProtectedRoute from "./components/ProtectedRoute";

import { DataContext } from "./context/DataContext";


function App() {
  const [theme, colorMode] = useMode();
  const { userType, login } = useContext(DataContext);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin onLogin={() => { login("admin") }} />} />

          {/* Merchant Auth */}
          <Route path="/merchant/signup" element={<MerchantSignup />} />
          <Route path="/merchant/login" element={<MerchantLogin onLogin={() => { login("merchant") }} />} />

          {/* Volunteer Auth */}
          <Route path="/volunteer/signup" element={<VolunteerSignup />} />
          <Route path="/volunteer/login" element={<VolunteerLogin onLogin={() => { login("volunteer") }} />} />

          {/* Nested routes under the dashboard layout */}
          <Route
            path="/"
            element={<DashboardLayout
              userType={userType}
            />}
          >
            {/* Admin routes */}
            <Route
              path="/admin/dashboard"
              element={<ProtectedRoute role="admin" children={<Dashboard />} />} />

            <Route path="/admin/merchants/new" element={<ProtectedRoute role={"admin"} children={<NewSubscriptions />} />} />
            <Route path="/admin/merchants/partners" element={<ProtectedRoute role={"admin"} children={<Partners />} />} />

            <Route path="/admin/volunteers/new" element={<ProtectedRoute role={"admin"} children={<NewApplications />} />} />
            <Route path="/admin/volunteers/members" element={<ProtectedRoute role={"admin"} children={<Members />} />} />

            <Route path="/admin/stocks" element={<ProtectedRoute role={"admin"} children={<Stocks />} />} />
            <Route path="/admin/stocks/add" element={<ProtectedRoute role={"admin"} children={<AddStock />} />} />
            <Route path="/admin/stocks/:id/products/add" element={<ProtectedRoute role={"admin"} children={<AddProductToStock />} />} />
            <Route path="/admin/stocks/:id" element={<ProtectedRoute role={"admin"} children={<StockDetails />} />} />
            <Route path="/admin/stocks/products/:id" element={<ProtectedRoute role={"admin"} children={<ProductDetails />} />} />

            <Route path="/admin/collections/planning" element={<ProtectedRoute role={"admin"} children={<CollectionPlanning />} />} />
            <Route path="/admin/collections/history" element={<ProtectedRoute role={"admin"} children={<CollectionsHistory />} />} />
            <Route path="/admin/collections/:id" element={<ProtectedRoute role={"admin"} children={<CollectionDetails />} />} />
            <Route path="/admin/collections/in-progress" element={<ProtectedRoute role={"admin"} children={<InProgressCollections />} />} />
            <Route path="/admin/collections/:id/update" element={<ProtectedRoute role={"admin"} children={<UpdateCollection />} />} />

            <Route path="/admin/distributions/planning" element={<ProtectedRoute role={"admin"} children={<DistributionsPlanning />} />} />
            <Route path="/admin/distributions/history" element={<ProtectedRoute role={"admin"} children={<DistributionsHistory />} />} />
            <Route path="/admin/distributions/:id" element={<ProtectedRoute role={"admin"} children={<DistributionsDetails />} />} />
            <Route path="/admin/distributions/in-progress" element={<ProtectedRoute role={"admin"} children={<InProgressDistributions />} />} />
            <Route path="/admin/distributions/:id/add-product" element={<ProtectedRoute role={"admin"} children={<AddProductToDistribution />} />} />
            <Route path="/admin/distributions/:id/add-beneficiary" element={<ProtectedRoute role={"admin"} children={<AddBeneficiaryToDistribution />} />} />


            {/* Merchant routes */}
            <Route path="/merchant/home" element={<ProtectedRoute role={"merchant"} children={<MerchantHome />} />} />
            {/* Volunteer routes */}
            <Route path="/volunteer/home" element={<ProtectedRoute role={"volunteer"} children={<VolunteerHome />} />} />





            <Route path="/team" element={<Team />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/form" element={<Form />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/line" element={<Line />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/geography" element={<Geography />} />

          </Route>
          {/* 404 Not Found Page */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
