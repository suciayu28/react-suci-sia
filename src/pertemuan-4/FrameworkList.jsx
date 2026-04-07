import frameworkData from "./framework.json";

export default function FrameworkList() {
    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
            {/* Header Section */}
            <header className="max-w-6xl mx-auto mb-12 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                    Framework <span className="text-blue-600">Explorer</span>
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                    Daftar teknologi modern untuk pengembangan aplikasi masa kini.
                </p>
            </header>

            {/* Grid Container */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {frameworkData.map((item) => (
                    <div 
                        key={item.id} 
                        className="group relative bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 -z-0 w-24 h-24 bg-blue-50 rounded-bl-full transition-transform group-hover:scale-125 duration-500 opacity-50" />

                        <div className="relative z-10">
                            {/* Title & Description */}
                            <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                                {item.name}
                            </h2>
                            <p className="text-slate-500 leading-relaxed text-sm mb-6">
                                {item.description}
                            </p>

                            {/* Developer Details Card */}
                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block mb-1">
                                    Maintained By
                                </span>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-slate-700">{item?.details?.developer}</span>
                                    <span className="text-xs font-medium px-2 py-1 bg-white rounded-lg shadow-sm border border-slate-200">
                                        {item?.details?.releaseYear}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10">
                            {/* Tags Styling */}
                            <div className="flex gap-2 flex-wrap mb-6">
                                {item?.tags?.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-50 text-blue-600 px-3 py-1 text-[11px] font-bold rounded-full border border-blue-100"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Action Button (Website Link) */}
                            <a
                                href={item?.details?.officialWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-bold text-white bg-slate-900 rounded-xl hover:bg-blue-600 transform transition-all active:scale-95 shadow-lg shadow-slate-200 hover:shadow-blue-200"
                            >
                                Visit Documentation
                                <svg 
                                    className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer decoration */}
            <footer className="mt-20 text-center text-slate-400 text-sm">
                Built with React & Tailwind CSS
            </footer>
        </div>
    );
}