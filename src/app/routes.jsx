import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import DashboardPage from "../features/dashboard/pages/dashboardPage";
import TransactionPage from "../features/transactions/pages/TransactionPage";
import UsersPage from "../features/users/pages/UsersPage";
import AnalyticPage from "../features/analytics/pages/AnalyticPage";
import SettingsPage from "../features/settings/pages/settingsPage";

import ProtectedRoute from "../features/auth/ProtectedRoute";
import LoginPage from "../features/auth/LoginPage";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <PageLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "transactions", element: <TransactionPage /> },
      { path: "analytics", element: <AnalyticPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);
