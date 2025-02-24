import { usePageManager } from "../context/PageManager";
import AlertPage from "../pages/Alert";
import SettingsPage from "../pages/Settings";

export const PageSwitcher: React.FC = () => {
  const { currentPage } = usePageManager();

  switch (currentPage) {
    case "alert":
      return <AlertPage />;
    case "settings":
      return <SettingsPage />;
    default:
      return <div>Page not found</div>;
  }
};
