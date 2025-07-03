import { Outlet } from "react-router"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { Widget } from "./chat/Widget"

export const MainLayout= () => {
    return (
        <>
            <div className="flex flex-col min-h-[100dvh] ">
               <Header />
                <main className="flex-grow bg-neutral-90">
                    {<Outlet />}
                </main>
            <Footer />
            </div>

            {/* Chat flotante en toda la web */}
            <Widget />
        </>
    )
}
