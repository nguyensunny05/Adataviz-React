const SearchBar = ({ onRecherche }) => {
  return (
    <div className="search">
    <input type="search" placeholder="Nom de l'établissement" onChange={(event) => onRecherche(event.target.value)} />
    <input type="search" placeholder="Code postal / Arrondissements" onChange={(event) => onRecherche(event.target.value)} />
    </div>
    
  )
}

export default SearchBar