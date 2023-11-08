import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {HOST, METHOD, PORT_COLLECTION} from "../../CONSTANTS.ts";

export default function RepeatPage() {
    const [showAnswer, setShowAnswer] = useState(false)
    const [activeLetter, setActiveLetter] = useState(0)
    const [auth, setAuth] = useState(false)

    // @ts-ignore
    const [userData, setUserData] = useState({
        user: {
            nikname: '',
            email: '',
            password: '',
            status: '', id: ""

        }
    })
    const [letters, setLetters] = useState({
        letters: [{}]
    })

    const navigate = useNavigate()

    useEffect(() => {

        async function reqCollectionLettersData() {
            const collectionID = location.href.split("/")[4]
            const fetchCollectionData = await fetch(`${METHOD}${HOST}${PORT_COLLECTION}/collection/` + collectionID)
            const preparedJSON = await fetchCollectionData.json()
            console.log('СООБЩЕНИЕ ПРЕПАРЕД ', preparedJSON)
            setLetters({letters: preparedJSON.message})
        }

        if (true) {

                    setAuth(true)
        }


        if (auth) {
            reqCollectionLettersData()
        }
    }, [auth])


    const handlerRememberClicked = async () => {
        const fetchReq = await fetch(`${METHOD}${HOST}${PORT_COLLECTION}/collection/letters`, {
            method: 'PATCH',
            body: JSON.stringify({
                // @ts-ignore

                id: letters.letters[activeLetter].id,
                verify: true
            }), headers: {
                'Content-Type': 'application/json'
            }
        })
        const answerReq = await fetchReq.json()
        if (letters.letters.length !== activeLetter + 1) {
            setActiveLetter(activeLetter + 1)
        } else {
            // TODO: View Modal view SUCCESS REPEATED! AND GO TO MAIN IN FUTURE
            navigate('/')
        }
        console.log(answerReq.message)
    }

    // TODO: Refactor on one method but use param id='verify' 'incorrect'
    const handlerForgetClicked = async () => {
        const fetchReq = await fetch(`${METHOD}${HOST}${PORT_COLLECTION}/collection/letters`, {
            method: 'PATCH',
            body: JSON.stringify({
                // @ts-ignore
                id: letters.letters[activeLetter].id,
                verify: false
            }), headers: {
                'Content-Type': 'application/json'
            }
        })
        const answerReq = await fetchReq.json()
        if (letters.letters.length !== activeLetter + 1) {
            setActiveLetter(activeLetter + 1)
        } else {
            // TODO: View Modal view SUCCESS REPEATED! AND GO TO MAIN IN FUTURE
            navigate('/')
        }
        console.log(answerReq.message)
    }

    return (
        <div className={'container'} style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>

            <h2>Repeat</h2>
               {/*// @ts-ignore*/}
            <span>{letters.letters[activeLetter].term}</span>
               {/*// @ts-ignore*/}
            <span>{letters.letters[activeLetter].tip}</span>
            <small onClick={() => setShowAnswer(!showAnswer)}>Show Answer!</small>
               {/*// @ts-ignore*/}
            {showAnswer ? <span>{letters.letters[activeLetter].answer}</span> : null}
            <button onClick={handlerRememberClicked}>Remember</button>
            <button onClick={handlerForgetClicked}>Forget</button>

        </div>
    )
}