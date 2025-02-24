import { useAlert } from "../context/AlertContext";

export default function AlertPage() {
    const { alerts } = useAlert();
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Alerts</h1>
        <ul className="mt-4 space-y-2">
          {alerts.map((alert) => (
            <li key={alert.id} className="p-4 bg-gray-200 dark:bg-gray-800 rounded shadow">
              <p>{alert.message}</p>
              <span className="text-sm text-gray-500">{alert.timestamp}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }