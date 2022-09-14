import "./styles/main.css";
import logoImg from "./assets/logo-nlw.svg";

function App() {
  return (
    <div className="max-w-[1344px] mx-auo flex flex-col items-center my-20">
      <img src={logoImg} alt="Logo da NLW" />
      <h1 className="text-6xl text-white font-black mt-20">Seu duo está aqui.</h1>
    </div>
  );
}

export default App;
