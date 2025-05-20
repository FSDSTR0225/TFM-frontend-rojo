import { NavLink } from "react-router";
export const DashBoardHeader = () => {
    return (
        <div className="flex flex-col justify-center md:flex-row">
            <ul className="menu menu-vertical lg:menu-horizontal gap-20 rounded-box">
                <li className="bg-base-200">
                    <NavLink to={'/private-rec/offers'}><a>Offers</a></NavLink></li>
                <li className="bg-base-200">
                    <NavLink to={'/private-rec/dashboard'}>
                        <a>Canva</a>
                    </NavLink>
                </li>
                <li className="bg-base-200"><a>Developers</a></li>
            </ul>
        </div>
    )
}
