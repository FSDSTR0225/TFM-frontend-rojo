import { Outlet } from "react-router"
import { Header } from "./Header"
import { Footer } from "./Footer"

export const MainLayout= () => {
    return (
        <>
            <div class="flex flex-col min-h-screen bg-gray-900">
               <Header />
                <main class="flex-grow p-6">
                    <h2 class="text-xl sm:text-2xl mb-4 text-white">Contenido Principal</h2>
                    <p class="text-lg sm:text-xl text-white">Este es el contenido principal de la página. Aquí puedes agregar cualquier información relevante.</p>
                    {<Outlet />}
                </main>
            <Footer />
            </div>

        </>
    )
}
