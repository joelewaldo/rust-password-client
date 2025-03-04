import { usePageManager } from "../context/PageManager";
import AlertPage from "../pages/Alert";
import SettingsPage from "../pages/Settings";
import PasswordsPage from "../pages/Passwords";

export const PageSwitcher: React.FC = () => {
  const { currentPage } = usePageManager();

  switch (currentPage) {
    case "passwords":
      return <PasswordsPage />;
    case "alert":
      return <AlertPage />;
    case "settings":
      return <SettingsPage />;
    default:
      return <PasswordsPage />;
  }
};
