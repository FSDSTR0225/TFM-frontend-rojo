import { Outlet } from "react-router"
import { Header } from "./Header"
import { Footer } from "./Footer"

export const MainLayout= () => {
    return (
        <>
            <div className="flex flex-col min-h-screen ">
               <Header />
                <main className="flex-grow p-6 bg-secondary-10">
                    {<Outlet />}
                </main>
            <Footer />
            </div>

        </>
    )
}
