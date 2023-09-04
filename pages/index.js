import { useState } from 'react'

// const words1 = ["DOSER","BIBLE","SERUM","BANCS","PILON","CIBLE","PAGNE","SABLE","MAIRE","DOIGT"]
// const words2 = ["HOPITAL","RADICAL","EXCUSER","MEDICAL","PRODUIT","PORTAIL","BROMURE","PRALINE","ABRICOT","DRIBBLE"]
// const words3 = ["SUISSESSE","EMBARQUER","PLASTIQUE","ETUDIANTE","FLEMMARDE","ESCAPADES","VERRIERES","PESTICIDE","ACCOUDOIR","CHATELAIN"]


const words = ["SUISSESSE","EMBARQUER","PLASTIQUE","ETUDIANTE","FLEMMARDE","ESCAPADES","VERRIERES","PESTICIDE","ACCOUDOIR","CHATELAIN"]
const chosenword = words[parseInt(Math.random()*10)]

export default function Page(){
    const [letter,setLetter] = useState('')
    const [word,setWord] = useState(["_","_","_","_","_","_","_","_","_","_"])
    const [points, setPoints] = useState(10)
    const [letters, setLetters] = useState([])
    // let b = "bonjour"
    // b[2] = "s"
    // const [chosenword2,setChosenWord] = useState(chosenword)
    // setChosenWord([])
    let chosenword2 = []
    for(let element of chosenword){
        chosenword2.push(element)
    }
    function handleChangeLetter(lettre){
        let i = 0    
        let len = letters.length
        setWord(chosenword2.map(element => {
                    i++
                    if (element === lettre){
                       if(letters.includes(lettre)){                                             
                       }
                       else{
                        setLetters([...letters,
                        lettre])
                        setPoints(p => p + 10)
                       }
                       return lettre
                    }
                    else if(word[i-1] !== "_"){
                        return word[i-1]
                    }
                    else {
                        if(i === 9 && len === letters.length){                           
                            setPoints(p => p - 4)                           
                        }
                       return "_"
                    }
                }))
    }
    function onChange2(e){
        if (e.target.value){
        setLetter(e.target.value)
        handleChangeLetter(e.target.value)
        }
        else{

        }
    }
    return (
    <div>
        <p>{points} points</p>
        <p>{letters}</p>
        <p>{word}</p>
        <p>{chosenword}</p>
        <form onChange={(e) => onChange2(e)}>
         <input type="text" maxLength="1"></input>
        </form>
        {/* <ChangeLetter lettre={letter} /> */}
        {/* <p>{b.length}</p> */}
    </div>)
}