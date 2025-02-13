import { useContext } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
import CricketerCard from "../components/cards/CricketerCard";

const CricketerDetails = () => {
  const context = useContext(AppContext);
  const { id } = useParams();

  return <div className="p-4">
    <CricketerCard {...context?.app.players.find(pl => pl.id === id)} />
  </div>;
};

export default CricketerDetails;
