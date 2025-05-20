import { Outlet } from "react-router"
import { SectionContainer } from "../components/SectionContainer"
import { DashBoardHeader } from "./DashBoardHeader"
export const DashBoardLayout = () => {
    return (
        <>
            <div>
                <SectionContainer>
                    <DashBoardHeader/>
                    {<Outlet />}
                </SectionContainer>
            </div>
        </>
    )
}
