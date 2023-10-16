import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function RepeatPage() {
    const [showAnswer, setShowAnswer] = useState(false)
    const [activeLetter, setActiveLetter] = useState(0)
    const [auth, setAuth] = useState(false)

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
            const fetchCollectionData = await fetch('http://localhost:3001/collection/' + collectionID)
            const preparedJSON = await fetchCollectionData.json()
            setLetters({letters: preparedJSON.message})
        }

        if (userData.user.email == '') {
            const allCookies = document.cookie;

            const cookieArray = allCookies.split('; ');

            for (let i = 0; i < cookieArray.length; i++) {
                const cookie = cookieArray[i].split('=');
                if (cookie[0] === "auth") {
                    setUserData(JSON.parse(cookie[1]))
                    setAuth(true)
                }
            }
        }


        if (auth) {
            reqCollectionLettersData()
        }
    }, [auth])


    const handlerRememberClicked = async () => {
        const fetchReq = await fetch('http://localhost:3001/collection/letters', {
            method: 'PATCH',
            body: JSON.stringify({
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
        const fetchReq = await fetch('http://localhost:3001/collection/letters', {
            method: 'PATCH',
            body: JSON.stringify({
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
            <span>{letters.letters[activeLetter].term}</span>
            <span>{letters.letters[activeLetter].tip}</span>
            <small onClick={() => setShowAnswer(!showAnswer)}>Show Answer!</small>
            {showAnswer ? <span>{letters.letters[activeLetter].answer}</span> : null}
            <button onClick={handlerRememberClicked}>Remember</button>
            <button onClick={handlerForgetClicked}>Forget</button>

        </div>
    )
}