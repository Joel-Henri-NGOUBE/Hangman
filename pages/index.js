import { useState } from 'react'

import styles from "./index.module.css"

// const words = ["SUISSESSE","EMBARQUER","PLASTIQUE","ETUDIANTE","FLEMMARDE","ESCAPADES","VERRIERES","PESTICIDE","ACCOUDOIR","CHATELAIN"]
// const n = parseInt(Math.random()*10)
// const chosenword = words[n]

const chosenword = "BOULANGER"

export default function Page(){
    const [clicked,setClicked] = useState(false)
    const [gameData,setGameData] = useState({
        letter: "",
        word: ["_","_","_","_","_","_","_","_","_","_"],
        missedLetters: 0,
        missed: [1,0,0,0,0,0,0,0],
        letters: [],
        points: 10,
        badLetters: []
    })

    let chosenword2 = []

    for(let element of chosenword){
        chosenword2.push(element)
    }

    function handleChangeLetter(lettre,lettres,badLetterArray){
        let i = 0
        let len  = 0 

        let chosenword3 = chosenword2.map((element) => { 
        i++
        if(element === lettre){
           if(lettres.includes(lettre)){ 
           }
           else{
            setGameData(gD => ({... gD, letters: [...gD.letters, lettre]}))
            setGameData(gD => ({... gD, points: gD.points + 10}))
           }
           return lettre
        }
        else if(gameData.word[i-1] !== "_"){
            return gameData.word[i-1]
        }
        else {
            if(i === 9 && !chosenword2.includes(lettre)){   
              if(!badLetterArray.includes(lettre)){
                setGameData(gD => ({... gD, badLetters: [...gD.badLetters, lettre, ""]}))   
              }  
             setGameData(gD => ({... gD, points: gD.points - 4})) 
             setGameData(gD => ({... gD, missedLetters: gD.missedLetters + 1})) 
             let j = -1
             setGameData(
                gD => ({... gD, missed: gD.missed.map((element) => {
                    j++
                    if(element === 0 || element === 1){
                        if(j === gD.missedLetters + 1){
                            return 1
                        }
                        else{
                            return 0
                        }
                    }
                })             
            }))                            
         }
        return "_"
        }
    })
    setGameData(gD => ({...gD, word: chosenword3}))
}
    function handleChange(e,lettres,badLetterArray){
        if (e.target.value){
        setGameData(gD => ({...gD, letter: e.target.value}))
        handleChangeLetter(e.target.value,lettres,badLetterArray)
        e.target.value = ""
        }
    }

    return (
    
        
    <div className={styles.all}>

      <Rules />
        { 
        clicked 
    
        ?
        <>
        <div className={styles.game}>
            <div className={styles.in_game}>
                <p className={styles.pendu}><b>LE PENDU</b></p>
            </div>


            <div className={styles.in_game}>
                <p className={styles.points_title}>Vos points actuels:</p>
                <p className={gameData.points >= 0 ? styles.p_points : styles.p_points_negative}><b>{gameData.points}</b></p>
            </div>

            <div className={styles.in_game}>
                <p className={(gameData.missed[7]!== 1 && !gameData.word.includes("_")) ? styles.won : ((gameData.missed[7] === 1 ? styles.lost : styles.p_word))}>{gameData.word.join(" ")}</p>
            </div>


            {(gameData.missed[7]!== 1 && !gameData.word.includes("_")) ? <p className={styles.won}>Bravo, vous avez trouvé le mot.</p> : ((gameData.missed[7] === 1 ? <p className={styles.lost}>Désolé, vous avez perdu!</p> : 
            
            <form onChange={(e) => handleChange(e, gameData.letters, gameData.badLetters)} className={styles.in_game}>
            <input type="text" maxLength="1" className ={styles.form_in_game}></input>
            </form>))}
            

            <div className={styles.in_game}>
                <p className={styles.p}><u>{ gameData.badLetters.length !== 0 && "Lettres utilisées:"}</u> <b> {gameData.badLetters} </b></p>
            </div>
        </div>

        <Trials
            missing = {gameData.missed}
        />
        </>
        :

        <div className={styles.start}>
            <button onClick={() => setClicked(!clicked)}>Start</button>
        </div>
      
}
        </div>
        )
}

function Trials({ missing }){
let i = 0
let trials = missing.map((element) => {
    i++
    if(element === 1){
        return (
        <div key={i} className={styles.divactualtrial}>
            <button className={(i === 1) ? styles.buttrial1 : ((i === 2) ? styles.buttrial2 : ((i === 3) ? styles.buttrial3 : ((i === 4) ? styles.buttrial4 :((i === 5) ? styles.buttrial5 : ((i === 6) ? styles.buttrial6 :((i === 7) ? styles.buttrial7 : styles.buttrial8))))))} ></button> 
            <p className={styles.p_trial}>{8 - i} {8 - i > 1 ? "essais" : "essai"}</p>
        </div>)
    }
    else{
        return <button key={i} className ={(i === 1) ? styles.butt1 : ((i === 2) ? styles.butt2 : ((i === 3) ? styles.butt3 : ((i === 4) ? styles.butt4 :((i === 5) ? styles.butt5 : ((i === 6) ? styles.butt6 :((i === 7) ? styles.butt7 : styles.butt8))))))}></button>
    }
})

 return (
    <div className={styles.divtrial}>
        {trials}
    </div>
 )
}

function Rules(){
    return(
        <div className={styles.rules}>
            <p>Bienvenue pour une partie de <b>HANGMAN</b> ou <b>PENDU</b> ou vous pourrez tenter de déceler le mot de neuf lettres caché. Pour pouvoir jouer, vous devez tenir compte de quelques points:</p>
            <ul>
                <li className={styles.liste}>Vous devez impérativement saisir des lettres majuscules sinon elles ne seront pas considérées comme équivalentes à celles du mot caché.</li><br/>
                <li className={styles.liste}>Evitez de mettre les mêmes mauvaises lettres, elles enlèveront tout de même des points: <b>4 points</b> par mauvaise lettre. Cependant en trouver une vous rapportera <b>10 points</b>.</li><br/>
                <li className={styles.liste}>Vous ne pourrez pas voir dans la zone de saisie la lettre que vous avez entrée et pour la voir vous disposez d'une mini-section "Lettres utilisées" qui référencie les mauvaises lettres que vous aurez entrées. Si elles sont bonnes, elle s'afficheront à la place des tirets.</li><br/>
                <li className={styles.liste}>Vous avez droit à <b>7 essais</b> au maximum au cas où vos lettres ne correspondent pas.</li>
            </ul>
        </div>
    )
}