import React, { useState, useEffect } from "react";
//import {Router, Route, useNavigate} from 'react-router-dom';
import axios from "axios";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import "../App.css";
import pilt from "../images/win.png";
import piltLose from "../images/pixelcatsadness.png";
import piltWait from "../images/catnormal.png";
import Navbar from "../Navbar";

function App() {

    //const navigate = useNavigate();
    const [tagastus, setTagastus] = useState([{sona: [], lauseV: "", lauseP: "", vale: ""}]);
    // showScore muutuja aitab meeles pidada, kas oleme jõudnud viimase võõrsõnani ehk mängu lõppu
    // tõeväärtus, kas näidata lõppskoori või mitte
      const [showScore, setShowScore] = useState(false);
      // muutuja, mis hoiab endas skoori
      const [score, setScore] = useState(0);

      const [uusLause, setUusLause] = useState(true);

    // selleks, et saada back-endist data kätte
    function getData() {
      axios({
        method: "GET",
        url:"/keskmmang2",
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


    //console.log(tagastus)
    //console.log(vihjed[0])
    //console.log(vihjed[0].sõna)
    //console.log(typeof vihjed[0])
    //console.log(typeof vihjed[0])

    //vastus on see, mille kasutaja sisestab
    const [vastus, setVastus] = useState("")
    const [sisestus, setSisestus] = useState("")

  // pean leidba parema viisi kuidas kõiki vihjeid väljastada ning eelnevad alles jätta
    //const [vihjeteKast, setVihjeteKast] = useState("Tere tulemast võõrsõnade eristamise mängu! Sulle on ette antud lause, kus õige võõrsõna on asendatud valega. Kui ei oska ära arvata, vajuta nuppu Vastus. Õnn kaasa :)")

  // muudame inputi ära iga kord, kui kasutaja sisestab mingi sõna
    const change = event => {
      setSisestus(event.target.value)
      setVastus(event.target.value)
    }
    // Mida teha siis kui kasutaja vajutab nupule Saada
    const click = () => {
        setSisestus('')
        //console.log(vastus)
        //console.log(tagastus[mitmesSentence].õige)
        //Võrdlus töötab :)
        if (mitmesSentence < tagastus.length){
            if (tagastus[mitmesSentence].õige[0] === vastus.toLowerCase() || tagastus[mitmesSentence].õige[1] === vastus.toLowerCase()) {
                setOnnitle(true)
                setSpikker(false)
                setScore(score + 20)
                setMitmesSentence(mitmesSentence + 1)
                //setVihjeteKast("")
                setCurrentSentence(currentSentence + "\n\n" + "Leidsid õige vastuse! " + "<b>" + tagastus[mitmesSentence].asendus + "</b>" + " asemel oleks pidanud olema " + "<b>" + tagastus[mitmesSentence].õige[1] + "</b>" + ".")
                setUusLause(true)
            } else {
                //console.log("Vale vastus")
                //alert("Kahjuks on see vale vastus :(")
                setKurb(true)
                setCurrentSentence(currentSentence + "\n\n" + "<b>" + vastus + "</b>" + " -- Kahjuks on see vale vastus :(")
                //setCurrentVihjeID(currentVihjeID + 1)
            }
        } else {
            setShowScore(true)
        }
    }

    // currentSentence muutuja näitab, mitmes lause hetkel käsil on
    const [currentSentence, setCurrentSentence] = useState('Tere tulemast võõrsõnade eristamise mängu! Mänguga alustamiseks vajuta nuppu "Järgmine lause". Õnn kaasa! :)')

    const [mitmesSentence, setMitmesSentence] = useState(0);

    const [mitmesLause, setMitmesLause] = useState(0);

    const [onnitle, setOnnitle] = useState(false);

    const [kurb, setKurb] = useState(false);

    const [spikker, setSpikker] = useState(false);

    const leiaSentence = () => {
        setCurrentSentence(tagastus[mitmesSentence].vasak + " "+ "<b>" + tagastus[mitmesSentence].asendus + "</b>" + tagastus[mitmesSentence].parem)
        return tagastus[mitmesSentence].vasak + " "+ "<b>" + tagastus[mitmesSentence].asendus + "</b>" + tagastus[mitmesSentence].parem
    }

    // Kui kasutaja vajutab Enterit, siis suuname click() funktsiooni juurde
    const _handleKeyDown = (e) => {
      if (e.key === 'Enter') {
          click()
      }
    }

    const alusta = () => {
      setMitmesLause(mitmesLause + 1)
      setSpikker(true)
        if (mitmesSentence < tagastus.length){
            setKurb(false)
            setOnnitle(false)
            leiaSentence()
            setUusLause(false)
        } else {
            setShowScore(true)
        }
    }

    // Mida teha siis, kui kasutaja on vajutanud nuppu Vastus
    const ytleEtte = () => {
        if (mitmesSentence >= tagastus.length){
            setShowScore(true)
        } else {
            //setVihjeteKast("")
            setMitmesSentence(mitmesSentence + 1)
            setCurrentSentence(currentSentence + "\n" + "\nÕige vastus oleks olnud " + "<b>" + tagastus[mitmesSentence].õige[1] + "</b>")
            setUusLause(true)
            setSpikker(false)
        }
        setKurb(true)
      }


    return (
      //<div className="App"> <Vihjed vihjed={vihjed} /></div>
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
							<p className="info">Mängid võõrsõnade eristamise mängu.</p>
							<p className="info">Ma hakkan sulle ühekaupa lauseid pakkuma, milles on õiged võõrsõnad asendatud valedega (paksus kirjas).</p>
							<p className="info">Sinu ülesandeks on vale võõrsõna asemel õige trükkida all asuvasse kasti ning vajutada nuppu <b>Saada</b> (või Enter). Selleks, et järgmist lauset näha, vajuta nuppu <b>Järgmine lause</b>.</p>
							<p className="info">Kui sa ei oska õige tähendusega võõrsõna leida, siis vajuta nuppu <b>Ütle ette</b>, kuid pea meeles, et selle eest ma sulle punkte ei anna.</p>
							<p className="info">Iga õigesti vastatud võõrsõna eest annan sulle <b>20 punkti</b>.</p>
						</div>
						}>
					<Button style={{borderRadius: '25px', width: '2px', height: 'auto'}} variant="outlined" size="small">?</Button>
					</Tooltip>
              </div>
              {showScore ? (
                  <div className='score-section'>
                      Sinu skoor on {score} / {tagastus.length * 20}
                  </div>
              ) : (
                  <>
                      <div className='question-section'>
                          <div className='question-count'>
                              <span>Lause {mitmesLause}</span>/{tagastus.length}
                              <span className="score">Skoor {score}</span>/{tagastus.length * 20}
                              { onnitle ? <span><img src={pilt} alt="Pilt" /><span className="õnnitlus"> Tubli! </span></span> : (kurb ? <span><img src={piltLose} alt="Pilt" /><span className="kurb">Oi ei!</span></span> : <span><img src={piltWait} alt="Pilt" /></span>)}
                          </div>
                          <div className='css-fix' dangerouslySetInnerHTML={{ __html: currentSentence }}></div>
                          <div className="AnswerBox">
                              <input onChange={change} onKeyDown={_handleKeyDown} value={sisestus}/>
                              {spikker ? <button className='answer-part' onClick={click}>Saada</button> : <button id="answer-part" className='disabled-button' disabled={true}>Saada</button>}
                              {uusLause ? <button className="answer-part" onClick={alusta}>Uus lause</button> : <button id="answer-part" className='disabled-button' disabled={true}>Uus lause</button>}
                              {spikker ? <button className='answer-part' onClick={ytleEtte}>Ütle ette</button> : <button id="answer-part" className='disabled-button' disabled={true}>Ütle ette</button>}
                          </div>
                      </div>
                  </>
              )}
          </div>
      </div>

      // onKeyDown -> Selle jaoks, et kui kasutaja kasutab enterit, siis oleks see võrdeline nupule vajutusega

    );
}

  export default App