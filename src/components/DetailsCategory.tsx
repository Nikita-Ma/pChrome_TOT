import {Link} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";

export default function CategoryPage() {
    const [auth, setAuth] = useState(false)
    const [inputValue, setInputValue] = useState({
        did: null,
        term: '',
        tip: '',
        answer: '',
    })
    const [inputActive, setInputActive] = useState(null)
    const [inputEditorValue, setInputEditorValue] = useState({
        id: null,
        did: null,
        termEditor: null,
        tipEditor: null,
        answerEditor: null
    })

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
    useEffect(() => {

        async function reqCollectionLettersData() {
            const collectionID = location.href.split("/")[5]
            const fetchCollectionData = await fetch('http://localhost:3001/collection/' + collectionID)
            const preparedJSON = await fetchCollectionData.json()
            setLetters({letters: preparedJSON.message})
            setInputEditorValue({
                did: collectionID
            })
            setInputValue({
                did: collectionID
            })
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

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.name === 'term') {
           setInputValue(prevState => {
               return {
                   ...prevState,
                   term: e.target.value
               }
           })
        }
        if (e.target.name === 'tip') {
            setInputValue(prevState => {
                return {
                    ...prevState,
                    tip: e.target.value
                }
            })
        }
        if (e.target.name === 'answer') {
            setInputValue(prevState => {
                return {
                    ...prevState,
                    answer: e.target.value
                }
            })
        }

    }
    const inputHandlerC = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value, e.target.name)
        const inputValue = e.target.value
        const idx = letters.letters.findIndex((el) => el.id == e.target.name)
        if (e.target.id === 'term') {
            // console.log('rr')
            setInputEditorValue((prevState) => {
                return {...prevState, id: e.target.name, termEditor: e.target.value}
            })
            setLetters(prevState => {
                const updatedCollection = [...prevState.letters];

                updatedCollection[idx].term = inputValue;
                return {...prevState, letters: updatedCollection};

            });


            setLetters(prevState => {
                const updatedCollection = [...prevState.letters];

                // TODO: Refactor! Bad practice!
                updatedCollection[idx].answer = updatedCollection[idx].answer;
                updatedCollection[idx].did = updatedCollection[idx].did;
                updatedCollection[idx].id = e.target.name;
                updatedCollection[idx].tip = updatedCollection[idx].tip;
                updatedCollection[idx].term = inputValue;
                return {...prevState, letters: updatedCollection};

            });


        }


        if (e.target.id === 'tip') {


            setInputEditorValue((prevState) => {
                return {...prevState, id: e.target.name, tipEditor: e.target.value}
            })


            setLetters(prevState => {
                const updatedCollection = [...prevState.letters];

                // TODO: Refactor! Bad practice!
                updatedCollection[idx].answer = updatedCollection[idx].answer;
                updatedCollection[idx].did = updatedCollection[idx].did;
                updatedCollection[idx].id = e.target.name;
                updatedCollection[idx].tip = e.target.value;
                updatedCollection[idx].term = updatedCollection[idx].term;
                return {...prevState, letters: updatedCollection};

            });
        }
        // TODO: Incorrect use <... name & id> in project MUST REFACTOR! AND FIX & SETTINGS PRETTIER & ESLINT & HUSKY & CI/CD/>
        if (e.target.id === 'answer') {
            setInputEditorValue((prevState) => {
                return {...prevState, id: e.target.name, answerEditor: e.target.value}
            })

            setLetters(prevState => {
                const updatedCollection = [...prevState.letters];

                // TODO: Refactor! Bad practice!
                updatedCollection[idx].answer = inputValue;
                updatedCollection[idx].did = updatedCollection[idx].did;
                updatedCollection[idx].id = e.target.name;
                updatedCollection[idx].tip = updatedCollection[idx].tip;
                updatedCollection[idx].term = updatedCollection[idx].term;
                return {...prevState, letters: updatedCollection};

            });


        }

        // console.log(letters)
    }
    const saveLetter = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (inputValue.term.trim().length || inputValue.answer.trim().length) {
            await fetch('http://localhost:3001/collection/letter', {
                method: 'POST',
                body: JSON.stringify({...inputValue, isAdmin: "admin", creatorid: userData.user.id}),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            alert('Запрос отправлен. Результат вы увидите после перезагрузки.')
        } else {
            alert('Заполните поле корректно')
        }
    }

    const updateCategory = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const idx = letters.letters.findIndex((el) => el.id == e.target.name)
        e.preventDefault()
        if (letters.letters[idx].term) {
            await fetch('http://localhost:3001/collection/letters', {
                method: 'PUT',
                body: JSON.stringify({
                    id: inputEditorValue.id,
                    did: inputEditorValue.did,
                    term: inputEditorValue.termEditor,
                    answer: inputEditorValue.answerEditor,
                    isAdmin: "admin",
                    creatorid: userData.user.id
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            alert('Запрос отправлен. Результат вы увидите после перезагрузки.')
        }
    }

    const deleteCategory = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const buttonElement = e.currentTarget as HTMLButtonElement;
        const inputValue = buttonElement.name;
        // console.log(inputValue)
        e.preventDefault()
        await fetch('http://localhost:3001/collection/letters', {
            method: 'DELETE',
            body: JSON.stringify({id: inputValue}),
            headers: {
                'Content-type': 'application/json'
            }
        })
        alert('Запрос отправлен. Результат вы увидите после перезагрузки.')
    }
    const activeCategory = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const buttonElement = e.currentTarget as HTMLButtonElement;
        const inputValue = buttonElement.name;
        console.log(inputValue)
        e.preventDefault()
        setInputActive(inputValue)
        console.log(inputActive)
    }

    return (
        <div>
            <h2>Letters</h2>
            <input name={'term'} type="text" placeholder={'Enter name term*'} onChange={inputHandler} required={true}/>
            <input name={'tip'} type="text" placeholder={'Enter name tip'} onChange={inputHandler}/>
            <input name={'answer'} type="text" placeholder={'Enter name answer*'} onChange={inputHandler}
                   required={true}/>
            <button onClick={saveLetter}>Save</button>
            <Link to={'/'}>
                <button>Go back</button>
            </Link>
            <h4>Collection list</h4>
            <ul>
                {
                    letters.letters.map((item) => {
                        return (<li key={item.id}>
                            <button name={item.id} onClick={updateCategory}>v</button>
                            <button name={item.id} onClick={activeCategory}>✏</button>
                            <button name={item.id} onClick={deleteCategory}>x</button>
                            <input id={'term'} name={item.id} type="text" onChange={inputHandlerC}
                                   placeholder={'Term type*'}
                                   value={item.term}
                                   disabled={inputActive == item.id ? false : true}/>
                            <input id={'tip'} name={item.id} type="text" onChange={inputHandlerC}
                                   placeholder={'Tip type'}
                                   value={item.tip}
                                   disabled={inputActive == item.id ? false : true}/>
                            <input id={'answer'} name={item.id} type="text" onChange={inputHandlerC}
                                   placeholder={'Answer type*'}
                                   value={item.answer}
                                   disabled={inputActive == item.id ? false : true}/>

                        </li>)
                    })
                }
            </ul>
        </div>
    )
}