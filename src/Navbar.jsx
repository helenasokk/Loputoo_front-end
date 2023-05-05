import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./App.css";

function Navbar() {

  let location = useLocation();//Kontrollimiseks, mis lehel hetkel asume
  let navigate = useNavigate();

  // Järgnevad funktsioonid on mõeldud selleks, et kontrollida, mis lehel hetkel kasutaja viibib
  // Ehk kui kasutaja on esimese alammängu lehel ja soovib uuesti selle alamlehe laadida vajutades 'Mäng 1' nupule,
  // siis antud leht lihtsalt värskendab ennast ehk serverist küsitakse uued andmed
  const refreshPage1 = () => {
    if (location.pathname === "/mang1") {
      window.location.reload(true);
    } else {
      navigate('/mang1');
    }
  }

  const refreshPage2 = () => {
    if (location.pathname === "/mang2") {
       window.location.reload(true);
    } else {
      navigate('/mang2');
    }
  }

  const refreshPage3 = () => {
    if (location.pathname === "/mang3") {
       window.location.reload(true);
    } else {
      navigate('/mang3');
    }
  }

  // Tagastan lehe ülemise osa, et oleks võimalik liikuda alamlehtede vahel
  return (
    <div>
      <h1><Link to="/" style={{textDecoration: "none"}}>Võõrsõnade mäng</Link></h1>
    <div className="ButtonBox">
		<button type="button" className="Buttons" onClick={refreshPage1}><Link to="/mang1" className="Navbar"> Mäng 1</Link></button>
		<button type="button" className="Buttons" onClick={refreshPage2}><Link to="/mang2" className="Navbar"> Mäng 2</Link></button>
		<button type="button" className="Buttons" onClick={refreshPage3}><Link to="/mang3" className="Navbar"> Mäng 3</Link></button>
	</div>
  </div>
  );
}

export default Navbar;