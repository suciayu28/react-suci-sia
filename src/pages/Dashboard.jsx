import PageHeader from "../components/PageHeader";
import {
  FaShoppingCart,
  FaTruck,
  FaTimesCircle,
  FaDollarSign,
  FaUsers,
  FaArrowUp,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const pieData = [
    { name: "Total Order", value: 81 },
    { name: "Customer Growth", value: 22 },
    { name: "Total Revenue", value: 62 },
  ];

  const lineData = [
    { name: "Sun", value: 100 },
    { name: "Mon", value: 200 },
    { name: "Tue", value: 350 },
    { name: "Wed", value: 200 },
    { name: "Thu", value: 150 },
    { name: "Fri", value: 250 },
    { name: "Sat", value: 400 },
  ];

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b"];

  return (
    <div className="p-6 font-barlow animate-in fade-in duration-700">
      <PageHeader title="Dashboard Overview" breadcrumb={["Home", "Dashboard"]} />

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
        <StatCard icon={<FaShoppingCart />} label="Total Orders" value="75" trend="+12%" color="emerald" />
        <StatCard icon={<FaTruck />} label="Delivered" value="175" trend="+5%" color="blue" />
        <StatCard icon={<FaTimesCircle />} label="Canceled" value="40" trend="-2%" color="red" />
        <StatCard icon={<FaDollarSign />} label="Revenue" value="Rp 12.8M" trend="+18%" color="amber" />
        <StatCard icon={<FaUsers />} label="Customers" value="320" trend="+24%" color="purple" />
      </div>

      {/* CHART SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-soft border border-gray-100 relative overflow-hidden">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
              <h2 className="font-poppins font-black text-gray-800 text-xl tracking-tight">Sales Performance</h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Weekly analysis</p>
            </div>
            <button className="px-4 py-2 bg-gray-50 text-gray-500 rounded-xl text-xs font-bold hover:bg-emerald-50 hover:text-emerald-500 transition">Reports</button>
          </div>

          <div className="h-[300px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 'bold'}} dy={10} />
                <YAxis hide />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: "#10b981", strokeWidth: 3, stroke: "#fff" }} activeDot={{ r: 8, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-soft border border-gray-100 flex flex-col justify-center">
          <h2 className="font-poppins font-black text-gray-800 text-xl tracking-tight mb-2 text-center">Business Reach</h2>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value">
                  {pieData.map((entry, index) => (
                    // PERBAIKAN: Gunakan backtick di Cell key
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-gray-800">85%</span>
              <span className="text-[10px] font-black text-gray-400 uppercase">Efficiency</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                  <span className="text-sm font-bold text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-black text-gray-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, trend, color }) => {
  const colorMap = {
    emerald: "bg-emerald-50 text-emerald-500",
    blue: "bg-blue-50 text-blue-500",
    red: "bg-red-50 text-red-500",
    amber: "bg-amber-50 text-amber-500",
    purple: "bg-purple-50 text-purple-500",
  };

  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-soft border border-gray-50 hover:shadow-xl transition-all duration-300 group cursor-default">
      <div className="flex justify-between items-start mb-4">
        {/* PERBAIKAN: Gunakan backtick pada className */}
        <div className={`${colorMap[color]} p-4 rounded-2xl transition-transform group-hover:scale-110 duration-300`}>
          {icon}
        </div>
        <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">
          <FaArrowUp size={8} /> {trend}
        </div>
      </div>
      <div>
        <h2 className="font-poppins font-black text-2xl text-gray-800 tracking-tight">{value}</h2>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.15em] mt-1">{label}</p>
      </div>
    </div>
  );
};

export default Dashboard;