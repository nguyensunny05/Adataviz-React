import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./index.css";
import SearchBar from "./SearchBar.jsx";

const App = () => {
  const [donnees, setDonnees] = useState([]);
  const [nombresVisibles, setNombresVisibles] = useState(3);
  const [recherche, setRecherche] = useState("");

  const donneesFiltrees = donnees.filter(
    (item) =>
      item.nom_de_l_ehpad.toLowerCase().includes(recherche.toLowerCase()) ||
      item.code_postal.toLowerCase().includes(recherche.toLowerCase()),
  );

  const chargerDonnees = async () => {
    try {
      const reponse = await fetch(
        "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/liste-des-ehpad/records?limit=20",
      );
      const resultat = await reponse.json();
      setDonnees(resultat.results);
    } catch (erreur) {
      console.error("Erreur de chargement :", erreur.message);
    }
  };

  useEffect(() => {
    chargerDonnees();
  }, []);

  useEffect(() => {
    setNombresVisibles(3);
  }, [recherche]);

  return (
    <>
      <header>
        <a href="#" className="logo-container">
          <svg viewBox="0 0 100 100" width="40" height="40">
            <path d="M42,28 Q35,15 22,25 Q32,38 42,28 Z" fill="#c4975b" />
            <path d="M46,24 Q42,8 28,12 Q34,28 46,24 Z" fill="#d9ad6b" />
            <path d="M54,26 Q55,10 43,8 Q44,25 54,26 Z" fill="#b3864b" />
            <path
              d="M35,52 L55,34 L75,52 L75,80 L35,80 Z"
              fill="none"
              stroke="#c4975b"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <rect
              x="50"
              y="55"
              width="12"
              height="12"
              fill="none"
              stroke="#c4975b"
              strokeWidth="3"
            />
          </svg>
          <strong className="logo-text">Retraite Sereine</strong>
        </a>
      </header>

      <main>
        <h1>Trouvez l'EHPAD idéal pour vos proches</h1>
        <p>
          Le répertoire complet des résidences médicalisées à Paris et ses
          alentours
        </p>
        <SearchBar onRecherche={setRecherche} />
      </main>

      <section className="card-body">
        <section id="parent" className="parent">
          {donneesFiltrees.slice(0, nombresVisibles).map((item, index) => (
            <Card key={item.nom_de_l_ehpad || index} item={item} />
          ))}
          {donneesFiltrees.length === 0 && donnees.length > 0 && (
            <p className="messageError">
              Aucun établissement ne correspond à votre recherche.
            </p>
          )}
        </section>
      </section>
      <div>
        {donneesFiltrees.length > 0 &&
          nombresVisibles < donneesFiltrees.length && (
            <section className="voirPlus">
              <button
                className="btn-plus"
                onClick={() => setNombresVisibles(nombresVisibles + 3)}
              >
                Voir plus de Résidences
              </button>
            </section>
          )}
      </div>
    </>
  );
};

export default App;
