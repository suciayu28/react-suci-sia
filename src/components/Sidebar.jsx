import {
  FaHome,
  FaClipboardList,
  FaBoxOpen,
  FaFileAlt,
  FaExclamationTriangle,
  FaLock,
  FaUserSlash,
  FaMicrochip,
  FaStickyNote // PERBAIKAN: Menggunakan versi standard filled agar aman di sub-folder /fa
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { HiOutlineSquares2X2 } from "react-icons/hi2"; // Ikon kotak untuk Components

const Sidebar = () => {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-3 transition-all duration-200 ${isActive
      ? "text-green-600 bg-green-100 font-extrabold shadow-sm"
      : "text-gray-600 hover:text-green-600 hover:bg-green-50 hover:font-bold"
    }`;

  return (
    <div className="w-64 bg-white min-h-screen shadow-lg p-4 flex flex-col">

      {/* LOGO SECTION */}
      <div className="mb-8 px-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Sedap<span className="text-green-500">.</span>
        </h1>
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mt-1">
          Modern Admin Dashboard
        </p>
      </div>

      {/* MAIN MENU */}
      <nav className="flex-1">
        <ul className="space-y-1">
          <li>
            <NavLink to="/" className={menuClass}>
              <FaHome size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/orders" className={menuClass}>
              <FaClipboardList size={20} />
              <span>Orders</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/customers" className={menuClass}>
              <FaFileAlt size={20} />
              <span>Customers</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/products" className={menuClass}>
              <FaBoxOpen size={20} />
              <span>Products</span>
            </NavLink>
          </li>

          {/* MENU COMPONENTS (SESUAI MODUL PERTEMUAN 10) */}
          <li>
            <NavLink to="/components" className={menuClass}>
              <HiOutlineSquares2X2 size={20} />
              <span>Components</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/fiturXyz" className={menuClass}>
              <FaMicrochip size={20} /> 
              <span>Fitur Xyz</span>
            </NavLink>
          </li>

          {/* TAMBAHAN: MENU NOTES */}
          <li>
            <NavLink to="/notes" className={menuClass}>
              <FaStickyNote size={20} />
              <span>Notes</span>
            </NavLink>
          </li>

          {/* SECTION: ERROR PAGES */}
          <div className="pt-6 pb-2 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            System & Errors
          </div>

          <li>
            <NavLink to="/400" className={menuClass}>
              <FaExclamationTriangle size={18} />
              <span>Error 400</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/401" className={menuClass}>
              <FaUserSlash size={18} />
              <span>Error 401</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/403" className={menuClass}>
              <FaLock size={18} />
              <span>Error 403</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* FOOTER SIDEBAR (UPGRADE/COPYRIGHT) TETAP SAMA */}
      <div className="mt-auto">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-5 rounded-2xl shadow-lg shadow-green-100">
          <p className="text-xs font-medium mb-3 leading-relaxed opacity-90">
            Organize your restaurant menu and categories easily.
          </p>
          <button className="bg-white text-green-600 w-full py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 active:scale-95 transition-all">
            + Add Menu Item
          </button>
        </div>

        <div className="mt-6 mb-2 text-center">
          <h2 className="text-[12px] font-bold text-gray-700">
            Sedap Restaurant POS
          </h2>
          <p className="text-[10px] text-gray-400 mt-1">
            v1.0.4 &bull; &copy; 2026 All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;