import React, { useState } from "react";

const Card = ({ item }) => {
  const [estOuverte, setEstOuverte] = useState(false);

  return (
    <div className="card">
      <div>
        {item.image?.url && (
          <img
            className="pic"
            src={item.image.url}
            alt={`photo de l'établissement ${item.nom_de_l_ehpad}`}
          />
        )}
      </div>
      <div className="card-info">
        <h5 className="titleCard">{item.nom_de_l_ehpad}</h5>
        <ul>
          <li>
            {item.adresse}, {item.ville}
          </li>
        </ul>
        <footer className={`footer ${estOuverte ? "" : "hidden-info"}`}>
          <ul>
            <li>{item.code_postal}</li>
            <li>{item.telephone}</li>
          </ul>
        </footer>
      <button
        className="btn-voir-plus"
        onClick={() => setEstOuverte(!estOuverte)}
      >
        {estOuverte ? "Masquer les infos" : "Voir la fiche"}
      </button>
    </div>
    </div>
  );
};

export default Card;
