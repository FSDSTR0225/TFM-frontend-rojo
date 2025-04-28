export const MainLayout= () => {
    return (
        <>
            <div class="flex flex-col min-h-screen bg-gray-900">

                <header class="bg-black text-white p-4">
                    <nav class="bg-black text-white flex items-center justify-between px-6 py-4">
                        <div class="flex items-center gap-4">
                            <span class="text-green-500 font-bold text-xl flex items-center">
                                DevMatch
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 ml-1">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6h13v13H9zM5 15V6H3v9a2 2 0 002 2h2v-2H5z" />
                                </svg>
                            </span>
                            <div class="flex gap-2">
                                <a href="#" class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h18m-6 6l6-6-6-6" />
                                    </svg>
                                    Home
                                </a>
                                <a href="#" class="bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-md flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18m-6 5h6" />
                                    </svg>
                                    Portfolios
                                </a>
                                <a href="#" class="bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-md flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16m-7 4h7" />
                                    </svg>
                                    Job Listings
                                </a>
                                <a href="#" class="bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-md flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Mis Aplicaciones
                                </a>
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <div class="relative">
                                <input type="text" placeholder="Search talents or jobs..." class="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none w-64 pl-10" />
                                <div class="absolute top-2.5 left-3 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0a7 7 0 1110 0 7 7 0 01-10 0z" />
                                    </svg>
                                </div>
                            </div>
                            <a href="#" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A8.967 8.967 0 0112 15c2.21 0 4.22.805 5.879 2.139M15 11a3 3 0 10-6 0 3 3 0 006 0z" />
                                </svg>
                                Profile
                            </a>
                            <a href="#" class="bg-transparent border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition">
                                Sign Out
                            </a>
                        </div>
                    </nav>
                </header>

                <main class="flex-grow p-6">
                    <h2 class="text-xl sm:text-2xl mb-4 text-white">Contenido Principal</h2>
                    <p class="text-lg sm:text-xl text-white">Este es el contenido principal de la página. Aquí puedes agregar cualquier información relevante.</p>
                    {/* Router outlet */}
                </main>

                <footer class="bg-black text-white p-4 text-center">
                    <p class="text-sm sm:text-base">© 2025 Tu Empresa. Todos los derechos reservados.</p>
                </footer>
            </div>

        </>
    )
}
