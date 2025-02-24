import { useState, createContext, useContext, useEffect, ReactNode } from "react";

interface AlertContextType {
  addAlert: (message: string) => void;
}

interface AlertProviderProps {
  children: ReactNode;
}

interface AlertProps {
  message: string;
  onClose: () => void;
}

interface AlertMessage {
  id: number;
  message: string;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  const addAlert = (message: string) => {
    setAlerts((prevAlerts) => [...prevAlerts, { id: Date.now(), message }]);
  };

  const removeAlert = (id: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter(alert => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      {alerts.map((alert) => (
        <Alert key={alert.id} message={alert.message} onClose={() => removeAlert(alert.id)} />
      ))}
    </AlertContext.Provider>
  );
};

const Alert = ({ message, onClose }: AlertProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white p-3 rounded shadow-lg">
      {message}
      <button onClick={onClose} className="ml-2 text-white">×</button>
    </div>
  );
};