import { useState } from "react";
//import { useParams } from "react-router";
//import { AuthContext } from "../../../context/authContext";
import { RecDashBoar } from "./RecDashBoar";
import { PiDotsNine, PiDotsThreeVertical, PiListBullets } from "react-icons/pi";

export const DashBoarPage = () => {
const [viewList, setViewList] = useState(false);

  //const { token } = useContext(AuthContext);
  return (
   <>
    <button className="btn font-bold text-2xl btn-square self-end" onClick={() => setViewList(!viewList)}>{viewList ? <PiDotsNine /> : <PiListBullets />}</button>
    <RecDashBoar />
  </>
  )
}
