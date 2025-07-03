import { Outlet } from "react-router"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { Widget } from "./chat/Widget"

export const MainLayout= () => {
    return (
        <>
            
               <Header />
                <main className=" bg-neutral-90">
                    {<Outlet />}
                </main>
            <Footer />
           

            {/* Chat flotante en toda la web */}
            <Widget />
        </>
    )
}
