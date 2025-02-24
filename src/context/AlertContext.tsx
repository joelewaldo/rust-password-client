import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type AlertType = {
  id: number;
  message: string;
  timestamp: string;
};

type AlertContextType = {
  alerts: AlertType[];
  addAlert: (message: string) => void;
};

const AlertContext = createContext<AlertContextType>({
  alerts: [],
  addAlert: () => {},
});

export const useAlert = () => useContext(AlertContext);

type AlertProviderProps = {
  children: ReactNode;
};

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [visibleAlerts, setVisibleAlerts] = useState<number[]>([]);

  const addAlert = (message: string) => {
    const newAlert = {
      id: Date.now(),
      message,
      timestamp: new Date().toLocaleString(),
    };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
    setVisibleAlerts((prevVisible) => [...prevVisible, newAlert.id]);
  };

  const hideAlert = (id: number) => {
    setVisibleAlerts((prevVisible) =>
      prevVisible.filter((alertId) => alertId !== id)
    );
  };

  return (
    <AlertContext.Provider value={{ addAlert, alerts }}>
      {children}
      {alerts
        .filter((alert) => visibleAlerts.includes(alert.id))
        .map((alert) => (
          <Alert
            key={alert.id}
            message={alert.message}
            onClose={() => hideAlert(alert.id)}
          />
        ))}
    </AlertContext.Provider>
  );
};

type AlertProps = {
  message: string;
  onClose: () => void;
};

const Alert = ({ message, onClose }: AlertProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white p-3 rounded shadow-lg">
      {message}
      <button onClick={onClose} className="ml-2 text-white">
        ×
      </button>
    </div>
  );
};
