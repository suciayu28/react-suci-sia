// src/components/Input.jsx
export default function Input({ type = "text", placeholder, ...props }) {
  return (
    <input
      type={type}
      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
      placeholder={placeholder}
      {...props}
    />
  );
}