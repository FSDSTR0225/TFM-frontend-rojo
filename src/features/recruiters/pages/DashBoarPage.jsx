import { useState } from "react";
//import { useParams } from "react-router";
//import { AuthContext } from "../../../context/authContext";
import { RecDashBoar } from "./RecDashBoar";
import { PiDotsNine, PiDotsThreeVertical, PiListBullets } from "react-icons/pi";
import { ListDashBoard } from "../components/ListDashBoard";

export const DashBoarPage = () => {
  const [viewList, setViewList] = useState(false);
  const [nameOffer,setNameOffer] = useState('');
  //const { token } = useContext(AuthContext);
  return (
    <>  
        <div>
          <h1>{nameOffer}</h1>
        </div>
         {/* Botón solo visible en lg y superiores */}
      <button 
        className="btn font-bold text-2xl btn-square self-end hidden lg:inline-flex" 
        onClick={() => setViewList(!viewList)}
      >
        {viewList ? <PiDotsNine /> : <PiListBullets />}
      </button>
      
      {/* En pantallas lg y superiores: muestra según el estado del botón */}
      {/* En pantallas menores a lg: siempre muestra ListDashBoard */}
      <div className="lg:hidden">
        <ListDashBoard />
      </div>
      
      <div className="hidden lg:block">
        {viewList ? <ListDashBoard /> : <RecDashBoar setNameOffer={setNameOffer} />}
      </div>
    </>
  )
}
