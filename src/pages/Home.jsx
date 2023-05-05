import React from 'react';
import "../App.css";
import Navbar from "../Navbar";
// Esileht koos juhistega
function Home() {
    return (
        <div>
        <Navbar />
		<div className='Box'>
      <div className='start-page'>
      <b>Tere tulemast võõrsõnade mängu!</b> <br/>
    <br/>Sul on võimalik valida kolme alammängu vahel:
    <ul><li><b>Esimene mäng</b> keskendub võõrsõnade tähenduste tundmisele.</li>
    <li><b>Teises mängus</b> kontrollitakse, kui hästi tunned sarnaseid võõrsõnu
    ning oskad lausetes valede võõrsõnade asemel õigeid leida.</li>
    <li><b>Kolmandas mängus</b> tuleb etteantud võõrsõnad õigetesse lausetesse asetada.</li>
    </ul>
    Iga alammängu juures on üleval paremas nurgas olemas väike küsimärk, millel kursoriga hõljudes näed täpsemaid juhiseid.<br/>
    <b>NB!</b> Ole vastuse sisestamisel ettevaatlik, kuna mäng ei kontrolli trükivigu.<br/>
    <br/><b>Head lahendamist!</b>
      </div>
    </div>
    </div>
    );
}

export default Home;