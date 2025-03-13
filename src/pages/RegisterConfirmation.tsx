import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { confirmAccount } from "../services/authentification";
import { notify } from "../utils/notify";
import LoadingDisplay from "../components/ui/LoadingDisplay";

const RegisterConfirmation = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { email, guid } = useParams<{ email: string; guid: string }>();
  const navigate = useNavigate();
  const hasConfirmed = useRef(false);

  useEffect(() => {
    const confirmUser = async () => {
      if (email && guid && !hasConfirmed.current) {
        try {
          setIsLoading(true);
          hasConfirmed.current = true;
          const response = await confirmAccount({ email, guid });

          if (response) {
            notify("Une petite connexion et on sera bon, accrochez-vous !", "success");
            navigate("/");
          } else {
            notify("Une erreur est survenue", "error");
          }
        } catch (err) {
          console.error("Erreur de confirmation :", err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    confirmUser();
  }, [email, guid, navigate]);

  return <>{isLoading && <LoadingDisplay />}</>;
};

export default RegisterConfirmation;
