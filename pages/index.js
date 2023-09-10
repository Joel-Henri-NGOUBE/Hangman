import { useState } from 'react'

// const words = ["SUISSESSE","EMBARQUER","PLASTIQUE","ETUDIANTE","FLEMMARDE","ESCAPADES","VERRIERES","PESTICIDE","ACCOUDOIR","CHATELAIN"]
// const n = parseInt(Math.random()*10)
// const chosenword = words[n]

const chosenword = "BOULANGER"

export default function Page(){
    const [letter,setLetter] = useState('')
    const [word,setWord] = useState(["_","_","_","_","_","_","_","_","_","_"])
    const [missedLetters,setMissedLetters] = useState(0)
    const [missed,setMissed] = useState([1,0,0,0,0,0,0,0])
    const [letters, setLetters] = useState([])

    let chosenword2 = []

    for(let element of chosenword){
        chosenword2.push(element)
    }

    function handleChangeLetter(lettre,lettres){
        let i = 0
        let len  = 0 

        setWord(chosenword2.map((element) => {
        i++
        if(element === lettre){
           if(lettres.includes(lettre)){ 
           }
           else{
            setLetters([...letters, lettre])
           }
           return lettre
        }
        else if(word[i-1] !== "_"){
            return word[i-1]
        }
        else {
            if(i === 9 && !chosenword2.includes(lettre)){                           
             setMissedLetters(missedLetters + 1)
             let j = -1
             setMissed(missed.map((element) => {
                 j++
                 if(element === 0 || element === 1){
                     if(j === missedLetters + 1){
                         return 1
                     }
                     else{
                         return 0
                     }
                 }
             }))                           
         }
        return "_"
                    }
                }))
    }
    function handleChange(e,lettres){
        if (e.target.value){
        setLetter(e.target.value)
        handleChangeLetter(e.target.value,lettres)
        }
        else{
        }
    }
    return (
    <div>

        <p>{word}</p>

        <form onChange={(e) => handleChange(e,letters)}>
         <input type="text" maxLength="1"></input>
        </form>

        <Trials
        missing = {missed}
        />

    </div>)
}

function Trials({ missing }){
let i = 0
let trials = missing.map((element) => {
    i++
    if(element === 1){
        return <button key={i} className="failed" style={{border: "2px solid red"}}></button>
    }
    else{
        return <button key={i}></button>
    }
})

 return (
    <div>
        {trials}
    </div>
 )
}