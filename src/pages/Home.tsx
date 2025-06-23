import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Controle de Gastos</h1>
      <p>Bem-vindo ao seu aplicativo de controle de gastos!</p>
      <p>Gerencie suas despesas e receitas facilmente.</p>
      <Button 
        text="Começar"
        className="m-5"
        onClick={() => navigate("/signup")}
      />
    </div>
  );
}   
export default Home;