import { Outlet } from "react-router"
import { Header } from "./Header"
import { Footer } from "./Footer"

export const MainLayout= () => {
    return (
        <>
            <div className="flex flex-col min-h-screen bg-base-200">
               <Header />
                <main className="flex-grow p-6 bg-base-300">
                    {<Outlet />}
                </main>
            <Footer />
            </div>

        </>
    )
}
