// src/components/Alert.jsx
export default function Alert({ children, type = "info" }) {
  const types = {
    info: "bg-blue-100 text-blue-800 border-blue-200",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    danger: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className={`${types[type]} p-4 rounded-lg border mb-4 flex items-center shadow-sm`}>
      <span className="text-sm font-medium">{children}</span>
    </div>
  );
}