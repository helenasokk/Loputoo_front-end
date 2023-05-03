Täpsemad juhised Reacti kohta: [Create React App](https://github.com/facebook/create-react-app).

# Eeldused:
* eelnevalt on installeeritud Node.js versioon v18.16.0
* server töötab ning [selles projektis](https://github.com/helenasokk/Loputoo) olevad juhised on läbi tehtud.

# Kuidas alustada?
Enda projekti põhikaustas, kus on olemas juba eelnevalt loodud serveri kaust, tuleks luua vaikimisi uus projekt käsuga ```npx create-react-app client```. Selle tulemusena tekib juurde *front-end*'i jaoks vajalikke faile sisaldav kaust **client**. Käsuga ```npm start``` avatakse automaatselt veebibrauseris Reacti esialgne veebileht, mis sisaldab ainult Reacti logot. Värskelt loodud projekti tuleks nüüd lisada siin projektis olevad failid ning eemaldada *default* failid, mis pole enam vajalikud.

# Vajalikud moodulid:
```
npm install react-router-dom  
npm install axios
npm install @mui/material @emotion/react @emotion/styled
```

**NB!** Kindlasti tuleb meeles pidada, et õiged käsud tuleb teha viibides õigetes kaustades: ```npm``` käsud *front-end* kaustas ning serveriga seotud käsud serveri kaustas.
