import { useEffect, useState } from "react";
import { RecDashBoar } from "./RecDashBoar";
import { useParams } from "react-router";
import { PiDotsNine, PiDotsThreeVertical, PiListBullets } from "react-icons/pi";
import { ListDashBoard } from "../components/ListDashBoard";
import { getCandidatesByOfferId } from "../../../services/offersServices";

export const DashBoarPage = () => {
  const { offerId } = useParams();
  const [viewList, setViewList] = useState(false);
  const [nameOffer, setNameOffer] = useState('');

  //objeto con cinco arrays, uno por cada columna del Kanban.
  const [lists, setLists] = useState({
    pending: [],
    reviewed: [],
    interviewed: [],
    accepted: [],
    rejected: [],
  });

  // 1. Carga candidatos
  useEffect(() => {
    (async () => {
      const data = await getCandidatesByOfferId(offerId, localStorage.getItem('token'));
      setNameOffer(data.nameOffer);
      const candidates = data.applicants;
      //Crea grouped, un objeto vacío con las cinco claves.
      const grouped = { pending: [], reviewed: [], interviewed: [], accepted: [], rejected: [] };
      //Recorre cada candidato (data.forEach) y, según su status, lo añade al array correspondiente.
      candidates.forEach(c => grouped[c.status]?.push(c));
      //Llama a setLists(grouped), que actualiza el estado con los candidatos ya clasificados.
      console.log(grouped);
      setLists(grouped);
    })();
  }, [offerId]);


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
        <ListDashBoard offerId={offerId}
          lists={lists}
          setLists={setLists} />
      </div>

      <div className="hidden lg:block">
        {viewList ? <ListDashBoard offerId={offerId}
          lists={lists}
          setLists={setLists} /> : <RecDashBoar offerId={offerId}
            lists={lists}
            setLists={setLists} />}
      </div>
    </>
  )
}
