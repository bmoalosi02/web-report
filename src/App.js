import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./features/login-page/loginPage";
import { UserManagementPage } from "./features/user-management-page/userManagementPage";
import { SalesHistoryPage } from "./features/sales-history-page/salesHistoryPage";
import { ReportsPage } from "./features/reports-page/reportsPage";
import { MainLayout } from "./features/mainLayout";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthService } from "./services/authService";
import { useDispatch, useSelector } from "react-redux";
import { createAction } from "@reduxjs/toolkit";

const theme = createTheme({
  palette: {
    primary: {
      light: "#9ddcd5",
      main: "#57b4b1",
      dark: "#9bc1bf",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f2f2f2",
      main: "#56b0ab",
      dark: "#56b0ab",
      contrastText: "#5e5e5e",
    },
  },
});

const setAccessToken = createAction("SET_ACCESS_TOKEN");

const App = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();

  const handlelogin = async (username, password) => {
    const result = await AuthService.login(username, password);

    if (result.success === true) {
      dispatch(setAccessToken(result.accessToken));
      return true;
    } else {
      return false;
    }
  };

  const accessToken = useSelector((state) => state.accessToken);
  const isLoggedIn = accessToken !== null;

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div
          className="app-container"
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          {isLoggedIn ? (
            <MainLayout>
              <CssBaseline />
              <Routes>
                <Route
                  path="/user-management-page"
                  element={<UserManagementPage />}
                />
                <Route path="/reports-page" element={<ReportsPage />} />
                <Route path="/sales-history" element={<SalesHistoryPage />} />
                <Route
                  path="/"
                  element={<Navigate to="/user-management-page" replace />}
                />
              </Routes>
            </MainLayout>
          ) : (
            <LoginPage handleLogin={handlelogin} />
          )}
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
