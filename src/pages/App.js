import React, { useState, useEffect } from "react";
import axios from "axios";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import "../App.css";
import pilt from "../images/win.png";
import piltLose from "../images/pixelcatsadness.png";
import piltWait from "../images/catnormal.png"
import Navbar from "../Navbar"


function App() {

  //const navigate = useNavigate();
  const [vihjed, setVihjed] = useState([{sona: [], tase: "", vihje: []}]);
// currentQuestion muutuja näitab, mitmes võõrsõna hetkel käsil on
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [sonadeArv, setSonadeArv] = useState(0);
  // showScore muutuja aitab meeles pidada, kas oleme jõudnud viimase võõrsõnani ehk mängu lõppu
  // tõeväärtus, kas näidata lõppskoori või mitte
	const [showScore, setShowScore] = useState(false);
	// muutuja, mis hoiab endas skoori
	const [score, setScore] = useState(0);

  /*// selleks, et saada back-endist data kätte
  useEffect(() => {
    fetch("/mang1").then((res) =>
	res.json().then((data) => {
        setVihjed(list(data));
      })
    );
  }, []);*/

  function getData() {
      axios({
        method: "GET",
        url:"/keskmmang1",
      })
      .then((response) => {
        const res = response.data
        setVihjed(res)
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

  console.log(vihjed)
  //console.log(vihjed[0])
  //console.log(vihjed[0].sõna)
  //console.log(typeof vihjed[0])
  //console.log(typeof vihjed[0])

  //vastus on see, mille kasutaja sisestab
  const [vastus, setVastus] = useState("")

  const [sisestus, setSisestus] = useState("")
  //currentVihjeID on muutuja, mis peab meeles mitmenda vihje juures oleme
  const [currentVihjeID, setCurrentVihjeID] = useState(0)
  // currentVihje muutujasse salvestame vihje
  const [currentVihje, setCurrentVihje] = useState("")
  const [teavitus, setTeavitus] = useState("")
// pean leidba parema viisi kuidas kõiki vihjeid väljastada ning eelnevad alles jätta
  const [vihjeteKast, setVihjeteKast] = useState('Tere tulemast võõrsõnade äraarvamise mängu! Mänguga alustamiseks vajuta nuppu "Järgmine vihje". Õnn kaasa! :)')

  const [teabVastust, setTeabVastust] = useState(false)

  const [onnitle, setOnnitle] = useState(false)

  const [vastused, setVastused] = useState([{vaste: "", oige: false, raskus:""}])

  const [kasViimane, setKasViimane] = useState(true)

  const [lubaSpikker, setLubaSpikker] = useState(false)

  const [kurb, setKurb] = useState(false);

// muudame inputi ära iga kord, kui kasutaja sisestab mingi sõna
  const change = event => {
	setSisestus(event.target.value)
	setVastus(event.target.value)
  }

  const addRow=(sõna, kasõige, raskusaste)=>{
	let uusVastus={vaste:sõna,oige:kasõige,raskus:raskusaste}
	setVastused([...vastused,uusVastus])
}

  // Mida teha siis kui kasutaja vajutab nupule Saada
  const click = () => {
	setSisestus('')
	if (currentQuestion >= vihjed.length){
		setShowScore(true)
		} else {
		console.log(vastus)
		console.log(vihjed[currentQuestion].sõna[0])
		console.log(vihjed[currentQuestion].vihjeteNkr)
		//Võrdlus töötab :)
		if (vihjed[currentQuestion].sõna[0] === vastus.toLowerCase() | vihjed[currentQuestion].sõna[1].toLowerCase() === vastus.toLowerCase()) {
			setOnnitle(true)
			setLubaSpikker(true)
			addRow(vihjed[currentQuestion].sõna[0], true, vihjed[currentQuestion].raskus)
			/*if (oigedVastused === ""){
				setOigedVastused(`${oigedVastused} <b className='õnnitlus'> ${vihjed[currentQuestion].sõna[0]} </b>`)
			} else {
				setOigedVastused(`${oigedVastused} | <b className='õnnitlus'> ${vihjed[currentQuestion].sõna[0]} </b>`)
			}*/
			setShowResults(true)
			if (vihjed[currentQuestion].raskus === "kerge") {
				setScore(score + 10)
			} else {
				setScore(score + 20)
			}
			setCurrentVihjeID(0)
			setCurrentVihje("")
			setCurrentQuestion(currentQuestion + 1)
			setVihjeteKast(vihjeteKast + "\n" + currentVihje + "\n" + teavitus + "\nTubli! Mõtlesin sõna " + "<b>" + vastus + "</b>")
			setTeavitus("")
			setTeabVastust(true)
			setShowResults(true)
			if (sonadeArv === vihjed.length) {
				setKasViimane(true)
			}
		} else {
			// lisasin juurde kasutaja sisestatud vastuse, et oleks kasutajale näha, mis sõnu ta juba arvanud on
			// Aitab vb vältida kordusi
			setKurb(true)
			setTeavitus(teavitus + "\n"+ "<b>" + vastus + "</b>" + " Kahjuks vastasid valesti :(\n")
			//setVihjeteKast(vihjeteKast + '\n' + teavitus)
			console.log(currentVihjeID)
		}
	}
  }

  //Järgmist vihjet ei tohi lasta küsida, kui:
  // vihjete arv on otsas
  // sõnade arv on otsas (oleme jõudnud viimase võõrsõnani)
  const nextVihje = () => {
	// näitan tavalise kassi pilti kui kasutaja ei ole kas õigesti või valesti vastanud või vastust ei ole ette öeldud
	setOnnitle(false)
	setKurb(false)
	//Kui mäng on jõudnud lõppu ja rohkem vihjeid ei ole küsida
	if (sonadeArv >= vihjed.length && kasViimane){
		setVihjeteKast("")
		setShowScore(true)
	} //kui vastus on juba käes, siis peaks ette viskama vihje küsimise peale uue sõna vihjed
	else if (teabVastust){
		setSonadeArv(sonadeArv + 1)
		setCurrentVihje(vihjed[currentQuestion].vihjeteNkr[currentVihjeID])
		setVihjeteKast(`\n${currentVihje}`)
		setCurrentVihjeID(currentVihjeID + 1)
		setTeavitus("")
		setTeabVastust(false)
		setSonadeArv(sonadeArv + 1)
	} else
	{
		if (currentQuestion < vihjed.length && currentVihjeID < vihjed[currentQuestion].vihjeteNkr.length) {
			setLubaSpikker(false)
			if (currentVihjeID === 0 && (currentQuestion === 0 )){
				setKasViimane(false)
				setSonadeArv(sonadeArv + 1)
			}
			console.log(currentVihjeID)
			setCurrentVihje(vihjed[currentQuestion].vihjeteNkr[currentVihjeID])
			setVihjeteKast(`${vihjeteKast}\n${currentVihje}${teavitus}`)
			setTeavitus("")
			setCurrentVihjeID(currentVihjeID + 1)
		} else if (currentVihjeID >= vihjed[currentQuestion].vihjeteNkr.length){
			setShowResults(false)
			setVihjeteKast(vihjeteKast + '\n' + currentVihje + "\n" + "<b>" + "Vihjed said otsa!" + "</b>" + "\n")
			setCurrentVihje("")
		}
	}
  }

  // Vihjed said otsa -> vastas õigesti -> Järgmine vihje nupp ei ole enam aktiivne
  // kui oled esimese mängu lõpetanud, siis uuesti 1.mängu nupule vajutades ei tule uut mängu ette??

  // Kui kasutaja vajutab Enterit, siis suuname click() funktsiooni juurde
  const _handleKeyDown = (e) => {
	if (e.key === 'Enter') {
		click()
	}
  }

  // Mida teha siis, kui kasutaja on vajutanud nuppu Vastus
  const ytleEtte = () => {
	setKurb(true)
	/*if (teavitus != ""){
		setTeavitus(teavitus + "\n Mõtlesin sõna " + "<b>" + vihjed[currentQuestion].sõna + "</b>")
	} else {*/
		setTeavitus(teavitus + "\n Mõtlesin sõna " + "<b>" + vihjed[currentQuestion].sõna[0] + "</b>" + ".")
	//}
	setVihjeteKast(vihjeteKast + '\n' +currentVihje)
	setLubaSpikker(true)
	if (sonadeArv === vihjed.length) {
		setKasViimane(true)
		setCurrentVihje("")
	}
	else {
		setCurrentVihje("")
		setCurrentQuestion(currentQuestion + 1)
		setCurrentVihjeID(0)
		setShowResults(true)
	}
	/*if (vihjed[currentQuestion].raskus === "kerge"){
		vastusedKerged.concat([vihjed[currentQuestion].sõna, false])
	} else if (vihjed[currentQuestion].raskus === "keskmine"){
		vastusedKeskm.concat([vihjed[currentQuestion].sõna, true])
	}*/
	addRow(vihjed[currentQuestion].sõna[0], false, vihjed[currentQuestion].raskus)
	/*if (oigedVastused === ""){
		setOigedVastused(`${oigedVastused} <b className='kurb'> ${vihjed[currentQuestion].sõna[0]} </b>`)
	} else {
		setOigedVastused(`${oigedVastused} | <b className='kurb'> ${vihjed[currentQuestion].sõna[0]} </b>`)
	}*/
	setTeabVastust(true)
  }

  const [showResults, setShowResults] = useState(true)

  return (
    //<div className="App"> <Vihjed vihjed={vihjed} /></div>
	//sx={{backgroundColor: '#f5f5f9', color: 'rgba(0, 0, 0, 0.87)', border: '1px solid #dadde9'}}
	<div>
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
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
							<p className="info">Mängid võõrsõnade äraarvamise mängu.</p>
							<p className="info">Sa pead kokku ära arvama kümme võõrsõna, mille vihjeid hakkan sulle järjest ette ütlema.</p>
							<p className="info">Selleks, et järgmist vihjet saada, vajuta nupule <b>Järgmine vihje</b>. Kui arvad, et oled õige võõrsõna leidnud, siis sisesta oma vastus all asuvale väljale ning vajuta nuppu <b>Saada</b> (või Enter).</p>
							<p className="info">Kui sa ei oska minu pakutud vihjete põhjal vastust ära arvata, siis vajuta nuppu <b>Ütle ette</b>, kuid pea meeles, et selle eest ma sulle punkte ei anna.</p>
							<p className="info">Esimesed viis sõna on kergete grupist ehk annavad <b>10 punkti</b> ning järgmised viis on keskmiste grupist, mis annavad <b>20 punkti</b>.</p>
						</div>
						}>
					<Button style={{borderRadius: '25px', width: '2px', height: 'auto'}} variant="outlined" size="small">?</Button>
					</Tooltip>
				</div>
			{showScore ? (
				<div>
				<div className='score-section'>
					Sinu skoor on {score} / {((vihjed.length / 2) * 10) + ((vihjed.length / 2) * 20)}
				</div>
					<br/>
					<div>
						{vastused.map((v, index) => (
							<div key={index}>
								{v.oige ? (v.raskus === 'keskmine' ? <b><p className="õnnitlus">{v.vaste}</p></b> : <p className="õnnitlus">{v.vaste}</p>) : (v.raskus === 'keskmine' ? <b><p className="kurb">{v.vaste}</p></b> : <p className="kurb">{v.vaste}</p>)}
							</div>
						))}
					</div>
					<br/>
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Sõna {sonadeArv}</span>/{vihjed.length}
							<span className="score">Skoor {score}</span>/{((vihjed.length / 2) * 10) + ((vihjed.length / 2) * 20)}
							{ onnitle ? <span><img src={pilt} alt="Pilt" /><span className="õnnitlus"> Tubli! </span></span> : (kurb ? <span><img src={piltLose} alt="Pilt" /><span className="kurb">Oi ei!</span></span> : <span><img src={piltWait} alt="Pilt" /></span>)}
						</div>
						<div className='css-fix' dangerouslySetInnerHTML={{ __html: `${vihjeteKast}\n${currentVihje}${teavitus}` }}></div>
						<div className="AnswerBox">
							<input onChange={change} onKeyDown={_handleKeyDown} value={sisestus}/>
							{kasViimane ? <button id="answer-part" className='disabled-button' disabled={true}>Saada</button> : <button id="answer-part" className='answer-part' onClick={click}>Saada</button>}
							{ showResults ? (teabVastust ? (kasViimane ? <button id="answer-part" className='answer-part' onClick={nextVihje}>Tulemus</button> : <button id="answer-part" className='answer-part' onClick={nextVihje}>Järgmine sõna</button>) : <button id="answer-part" className='answer-part' onClick={nextVihje}>Järgmine vihje</button>) : <button id="answer-part" className='disabled-button' disabled={true}>Järgmine vihje</button>}
							{kasViimane ? <button id="answer-part" className='disabled-button' disabled={true}>Ütle ette</button> : (lubaSpikker ? <button id="answer-part" className='disabled-button' disabled={true}>Ütle ette</button> : <button id="answer-part" className='answer-part' onClick={ytleEtte}>Ütle ette</button>)}
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
