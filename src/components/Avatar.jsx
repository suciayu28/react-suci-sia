// src/components/Avatar.jsx
export default function Avatar({ name }) {
  return (
    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700 border-2 border-white shadow-sm">
      {name.charAt(0)}
    </div>
  );
}