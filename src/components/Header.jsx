import { FaBell, FaEnvelope, FaCog, FaSearch, FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HEADER CONTAINER */}
      <div className="flex items-center justify-between bg-white/80 backdrop-blur-md px-8 py-4 sticky top-0 z-40 border-b border-gray-100">

        {/* SEARCH BAR MODERN */}
        <div className="relative w-1/3 group">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />

          <input
            type="text"
            placeholder="Search analytics, orders, or customers..."
            onClick={() => setOpen(true)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border-none bg-gray-50 font-barlow font-medium text-sm
            focus:bg-white focus:ring-2 focus:ring-emerald-100 placeholder:text-gray-400
            hover:bg-gray-100 transition-all cursor-pointer outline-none"
            readOnly
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2">
          
          {/* ACTION ICONS */}
          <div className="flex items-center gap-1 border-r border-gray-100 pr-4 mr-2">
            <IconButton icon={<FaEnvelope />} />
            <div className="relative">
              <IconButton icon={<FaBell />} />
              <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white">
                5
              </span>
            </div>
            <IconButton icon={<FaCog />} />
          </div>

          {/* PROFILE SECTION */}
          <div className="flex items-center gap-3 pl-2 py-1 pr-1 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="text-right hidden md:block">
              <p className="text-sm font-poppins font-black text-gray-800 leading-none">Suci Dwimas Ayu</p>
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Administrator</p>
            </div>
            <div className="relative">
              <img
                src="https://i.pravatar.cc/150?u=suci"
                alt="profile"
                className="w-10 h-10 rounded-2xl object-cover shadow-sm group-hover:shadow-emerald-100 transition-all"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <FaChevronDown className="text-gray-300 text-xs group-hover:text-emerald-500 transition-colors mr-2" />
          </div>
        </div>
      </div>

      {/* MODAL SEARCH (Emerald Style) */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-300" />
          
          <div
            className="relative bg-white p-8 rounded-[2.5rem] w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-poppins font-black text-gray-800 tracking-tight">
                Global Search
              </h2>
              <button 
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-red-500 transition-colors font-bold text-sm"
              >
                Esc
              </button>
            </div>

            <div className="relative">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500 text-xl" />
              <input
                autoFocus
                type="text"
                placeholder="Type keywords (e.g. 'Orders', 'Reports')..."
                className="w-full bg-gray-50 border-none pl-14 pr-6 py-5 rounded-[1.5rem] font-barlow font-bold text-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-inner"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold text-gray-400">
              <span className="uppercase tracking-widest">Quick links:</span>
              <button className="text-emerald-500 hover:underline">#Products</button>
              <button className="text-emerald-500 hover:underline">#Invoice</button>
              <button className="text-emerald-500 hover:underline">#Customers</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* Reusable Icon Button Component */
const IconButton = ({ icon }) => (
  <button className="p-3 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all duration-300">
    {icon}
  </button>
);

export default Header;