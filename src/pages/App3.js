import React, { useState, useEffect } from "react";
import axios from "axios";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import "../App.css";
import piltLose from "../images/pixelcatsadness.png";
import Navbar from "../Navbar";

function App () {

    // muutuja, mis salvestab serverist saadavad andmed
    const [tagastus, setTagastus] = useState([{sona: [], lauseV: "", lauseP: "", sonad: []}]);
    // muutuja, mis hoiab endas mänguskoori
    const [score, setScore] = useState(0);
    // tõeväärtus, kas mäng on alanud või mitte (kas kuvada mängu vaade)
    const [showGame, setShowGame] = useState(false);
    // muutuja, mida kasutan lausete indeksite leidmiseks
    const [currentLause, setCurrentLause] = useState(0);
    // tõeväärtus, kas kasutaja on juba vastanud (kas kuvada nupp Uuesti!)
    const [kasVastatud, setKasVastatud] = useState(false);
    // tõeväärtus, kas kasutaja vajutas nuppu Kontrolli! ehk vastas ära
    const [vastatud, setVastatud] = useState(false);

    // tegin eraldi muutujad iga lause jaoks
    const [vastus1, setVastus1] = useState("")
    const [vastus2, setVastus2] = useState("")
    const [vastus3, setVastus3] = useState("")
    const [vastus4, setVastus4] = useState("")

    // selleks, et saada back-endist data kätte
    function getData() {
      axios({
        method: "GET",
        url:"/keskmmang3",
      })
      .then((response) => {
        const res = response.data
        setTagastus(res)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
    }

    useEffect(() => {
        getData()
      }, []);



  //mängu alustamine
  const alusta = () => {
    setCurrentLause(0)
    setShowGame(true)// näitame mängu vaadet
    shuffleArray(tagastus[tagastus.length - 1].sõnad)// selleks, et valikvastused ei oleks samas järjekorras, mis laused
  }
  // Esimese lause jaoks
  const [isCorrect1, setIsCorrect1] = useState(false)
  const changeV1 = event => {
    setVastus1(event.target.value)// pean kasutaja sisestatud vastuse meelde jätma
  }
  // Teise lause jaoks
  const [isCorrect2, setIsCorrect2] = useState(false)
  const changeV2 = event => {
    setVastus2(event.target.value)
  }
  // Kolmanda lause jaoks
  const [isCorrect3, setIsCorrect3] = useState(false)
  const changeV3 = event => {
    setVastus3(event.target.value)
  }
  // Neljanda lause jaoks
  const [isCorrect4, setIsCorrect4] = useState(false)
  const changeV4 = event => {
    setVastus4(event.target.value)
  }

  // siin toimub vastuste kontrollimine, kui vajutati nuppu Kontrolli!
  const kontroll = () => {
    var kokku = 0 // mitu on õigesti vastatud ehk kui suur peaks skoor olema
    if (vastus1 === tagastus[currentLause].sõna[1]) {
      setIsCorrect1(true)
      kokku += 1
    } else { // tühjaks jäetud kastid tuleb ka kuidagi ära märkida
      if (vastus1 === "")
      setVastus1("___")
    }
    if (vastus2 === tagastus[currentLause + 1].sõna[1]) {
      setIsCorrect2(true)
      kokku += 1
    } else {
      if (vastus2 === "")
      setVastus2("___")
    }
    if (vastus3 === tagastus[currentLause + 2].sõna[1]) {
      setIsCorrect3(true)
      kokku += 1
    } else {
      if (vastus3 === "")
      setVastus3("___")
    }
    if (vastus4 === tagastus[currentLause + 3].sõna[1]) {
      setIsCorrect4(true)
      kokku += 1
    } else {
      if (vastus4 === "")
      setVastus4("___")
    }
    setScore(score + (10 * kokku))
    setVastatud(true)
  }

  // Fisher-Yates algoritm listi segamiseks
  // Allikas: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }


  // Kui vajutatakse nuppu Uuesti!
  const uusGame = () => {
      window.location.reload(true);
  }

    return (
      <div>
      <Navbar />
      <div className='Box'>
            <div className="information">
            <Tooltip
            disableFocusListener
					arrow
					componentsProps={{
						tooltip: {
						sx: {
							bgcolor: 'common.grey',
							'& .MuiTooltip-arrow': {
							color: 'common.grey',
							},
							border: '1px solid #dadde9',
							width: 500,
						},
						},
					}}
					 title={
						<div style={{fontSize: "15px", color: "white", textAlign: "justify"}}>
							<p className="info">Mängid võõrsõnade konteksti asetamise mängu.</p>
							<p className="info">Sulle on ette antud neli lünklikku lauset ning kuus võõrsõna, millest kaks on üleliigsed.</p>
							<p className="info">Sinu ülesandeks on võõrsõnad trükkida õiges käändes sobivatesse lausetesse. Kui arvad, et oled kõik õigesti kirjutanud, siis vajuta nuppu <b>Kontrolli!</b>.</p>
							<p className="info">Kui sa ei oska lausesse õiget võõrsõna leida, siis võid lünga tühjaks jätta, kuid pea meeles, et selle eest ma sulle punkte ei anna.</p>
							<p className="info">Iga õigesti vastatud võõrsõna eest annan sulle <b>10 punkti</b>.</p>
              <p className="info">Kui sul on soov peale kontrollimist testi uuesti lahendada, siis vajuta nuppu <b>Uuesti!</b>.</p>
						</div>
						}>
					<Button style={{borderRadius: '25px', width: '2px', height: 'auto'}} variant="outlined" size="small">?</Button>
					</Tooltip>
              </div>
              {showGame ? (
                <>
                <div className='question-section'>
                    <div className='question-count'>
                        <span>Skoor {score}</span>/{(tagastus.length - 1) * 10}
                    </div>
                    <div> {tagastus[tagastus.length - 1].sõnad.join(' | ')} </div>
                    <div className='css-fix' >
                      {vastatud ? <li className="esimene" style={{color: isCorrect1 ? 'green' : 'brown'}}>{tagastus[currentLause].vasak}<b> {vastus1} </b>{tagastus[currentLause].parem} {isCorrect1 ? null : (<span><img style={{width: "40px", height: "auto"}} src={piltLose} alt="Pilt" /> <b>{tagastus[currentLause].sõna[1]}</b></span>)}</li> : <li>{tagastus[currentLause].vasak} <input onChange={changeV1} value={vastus1}/>{tagastus[currentLause].parem}</li>}
                      {vastatud ? <li className="teine" style={{color: isCorrect2 ? 'green' : 'brown'}}>{tagastus[currentLause + 1].vasak}<b> {vastus2} </b>{tagastus[currentLause + 1].parem} {isCorrect2 ? null : (<span><img style={{width: "40px", height: "auto"}} src={piltLose} alt="Pilt" /> <b>{tagastus[currentLause + 1].sõna[1]}</b></span>)}</li> : <li>{tagastus[currentLause + 1].vasak} <input onChange={changeV2} value={vastus2}/>{tagastus[currentLause + 1].parem}</li>}
                      {vastatud ? <li className="kolmas" style={{color: isCorrect3 ? 'green' : 'brown'}}>{tagastus[currentLause + 2].vasak}<b> {vastus3} </b>{tagastus[currentLause + 2].parem} {isCorrect3 ? null : (<span><img style={{width: "40px", height: "auto"}} src={piltLose} alt="Pilt" /> <b>{tagastus[currentLause + 2].sõna[1]}</b></span>)}</li> : <li>{tagastus[currentLause + 2].vasak} <input onChange={changeV3} value={vastus3}/>{tagastus[currentLause + 2].parem}</li>}
                      {vastatud ? <li className="neljas" style={{color: isCorrect4 ? 'green' : 'brown'}}>{tagastus[currentLause + 3].vasak}<b> {vastus4} </b>{tagastus[currentLause + 3].parem} {isCorrect4 ? null : (<span><img style={{width: "40px", height: "auto"}} src={piltLose} alt="Pilt" /> <b>{tagastus[currentLause + 3].sõna[1]}</b></span>)}</li>  : <li>{tagastus[currentLause + 3].vasak} <input onChange={changeV4} value={vastus4}/>{tagastus[currentLause + 3].parem}</li>}
                    </div>
                    <div className="AnswerBox">
                        { kasVastatud ? <button className="answer-part" onClick={uusGame}>Uuesti!</button> : <button className="answer-part" onClick={kontroll}>Kontrolli!</button>}
                    </div>

                </div>
            </>
              ) : (
                <div className="question-section">
                  <div className='question-count'>
                        <span>Skoor {score}</span>/{(tagastus.length - 1) * 10}
                    </div>
                  <div className='css-fix' >
                      <p>Tere tulemast võõrsõnade konteksti seadmise mängu! Et mänguga alustada, vajuta nupule "Alusta".</p>
                    </div>
                <div className="AnswerBox">
                        <button className="answer-part" onClick={alusta}>Alusta</button>
                    </div>
                    </div>
              )}
          </div>
      </div>
    );
}

export default App;