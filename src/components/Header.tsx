import { useNavigate } from "react-router-dom";
import { logOut } from "../services/authentification";

const Header = () => {
  const navigate = useNavigate();

  const handleRetour = () => {
    navigate(-1);
  };

  return (
    <header className="flex items-center w-full justify-between p-4 bg-none">
      <button onClick={handleRetour} className="text-lg font-semibold">
        Retour
      </button>
      {document.cookie.includes("token") && (
        <button
          onClick={() => {
            logOut();
            navigate("/login");
            document.location.reload();
          }}
          className="text-lg font-semibold"
        >
          Déconnexion
        </button>
      )}
    </header>
  );
};

export default Header;
