import { Outlet } from "react-router"
import { Header } from "./Header"
import { Footer } from "./Footer"

export const MainLayout= () => {
    return (
        <>
            <div class="flex flex-col min-h-screen bg-base-200">
               <Header />
                <main class="flex-grow p-6">
                    {<Outlet />}
                </main>
            <Footer />
            </div>

        </>
    )
}
