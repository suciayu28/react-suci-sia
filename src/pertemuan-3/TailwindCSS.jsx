export default function TailwindCSS(){
    return(
        <div>
            <h1 class="border m-4">Belajar Tailwind CSS 4</h1>
            <button className= "bg-blue-500 text-white px-4 py-2 mx-4 rounded shadow-lg">Click Me</button>
            <Spacing/>
            <FlexboxGrid/>
            <Typography/>
            <BorderRadius/>
            <BackgroundColors/>
            <TailwindShowcase/>
            
            <ShadowEffects/>
        </div>
    )
}
function Spacing(){
    return (
        <div className="bg-white shadow-lg p-6 m-4 rounded-lg">
            <h2 className="text-lg font-semibold">Card Title</h2>
            <p className="mt-2 text-gray-600">Ini adalah contoh penggunaan padding dan margin di Tailwind.</p>
        </div>
    )
}
function Typography(){
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-blue-600">Tailwind Typography</h1>
            <p className="text-gray-400 text-lg mt-2">Belajar Tailwind sangat menyenangkan dan cepat!</p>
        </div>
    )
}
function BorderRadius(){
    return (
        <button className="border-2 border-blue-500 text-blue-500  ml-4 px-4 py-2 rounded-lg"> Klik Saya </button>
    )
}
function BackgroundColors(){
    return(
        <div className="bg-blue-500 text-white p-6 m-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Tailwind Colors</h3>
            <p className="mt-2">Belajar Tailwind itu seru dan fleksibel!</p>
        </div>
    )
}
function FlexboxGrid(){
    return (
        <nav className="flex justify-between bg-gray-800 p-4 text-white">
            <h1 className="text-lg font-bold">MyWebsite</h1>
            <ul className="flex space-x-4">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    )
}
function ShadowEffects(){
    return (
        <div className="bg-white shadow-lg p-6 m-6 rounded-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold">Hover me!</h3>
            <p className="text-gray-600 mt-2">Lihat efek bayangan saat hover.</p>
        </div>
    )
}

function TailwindShowcase() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Utama */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-gray-900 mb-4">
            Belajar Tailwind CSS 4
          </h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 font-bold">
            Click Me
          </button>
        </header>

        {/* Gabungan Semua Komponen */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <FlexboxGrid />
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Typography />
              <Spacing />
            </div>
            
            <div className="space-y-6">
              <BackgroundColors />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                 <BorderRadius />
                 <ShadowEffects />
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}