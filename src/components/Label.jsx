// src/components/Label.jsx
export default function Label({ children, htmlFor }) {
  return (
    <label 
      htmlFor={htmlFor} 
      className="block text-sm font-semibold text-gray-700 mb-2"
    >
      {children}
    </label>
  );
}