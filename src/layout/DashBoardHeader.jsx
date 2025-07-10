import { PiCaretLeft } from "react-icons/pi";
import { Link } from "react-router";
export const DashBoardHeader = () => {
    return (
        <div className="flex mb-4  ">
           
                
                    <Link to={'/private-rec/offers'} className="btn btn-ghost gap-2"><PiCaretLeft />  Back offers</Link>
           
        </div>
    )
}
