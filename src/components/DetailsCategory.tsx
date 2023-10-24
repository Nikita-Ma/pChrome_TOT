import {Link} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import {getLocalStorage} from "../utils/localStorage/getLocalStorage.ts";


interface IUser {
    user: {
        nickname: null | string,
        email: null | string,
        password: null | string,
        status: null | string,
        id: null | string
    }
}


interface IInputValue {
    did: string | null,
    term: string,
    tip: string,
    answer: string,
}

interface IInputEditorValue {
    id: null | string,
    did: null | string,
    termEditor: null | string,
    tipEditor: null | string,
    answerEditor: null | string
}

interface ILetters {
    letters: {
        did: null | string,
        term: null | string,
        id: null | string,
        tip: null | string,
        answer: null | string
    }[]
}

export default function CategoryPage() {
    const [auth, setAuth] = useState<Boolean>(false)
    const [inputValue, setInputValue] = useState<IInputValue>({
        did: '',
        term: '',
        tip: '',
        answer: '',
    })
    const [inputActive, setInputActive] = useState<string | null>(null)
    const [inputEditorValue, setInputEditorValue] = useState<IInputEditorValue>({
        id: null,
        did: null,
        termEditor: null,
        tipEditor: null,
        answerEditor: null
    })

    const [userData, setUserData] = useState<IUser>({
        user: {
            nickname: null,
            email: null,
            password: null,
            status: null,
            id: null
        }
    })

    const [letters, setLetters] = useState<ILetters>({
        letters: []
    })
    useEffect(() => {

        async function reqCollectionLettersData() {
            const collectionID = await getLocalStorage('category')

            // @ts-ignore
            const fetchCollectionData = await fetch('http://localhost:3001/collection/' + collectionID.categoryDid)
            const preparedJSON = await fetchCollectionData.json()

            setInputEditorValue(prevState => {
                return {
                    ...prevState,
                }
            })
            setInputValue(prevState => {
                return {
                    ...prevState,
                }
            })
            setLetters({letters: preparedJSON.message})
        }

        async function verifyAuth(): Promise<void> {
            const authStatus = await getLocalStorage('user')
            if (authStatus && authStatus !== true) {
                setAuth(true)
                setUserData({user: authStatus} as IUser)
            }
        }

        verifyAuth().then(r => console.log('Verify completed', r))


        if (auth) {
            reqCollectionLettersData().then(r => console.log('Completed req. function', r))
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
        const inputValue = e.target.value
        const idx = letters.letters.findIndex((el) => el.id == e.target.name)
        if (e.target.id === 'term') {
            setInputEditorValue((prevState) => {
                return {
                    ...prevState,
                    id: e.target.name,
                    termEditor: e.target.value,
                    answerEditor: letters.letters[idx].answer,
                    tipEditor: letters.letters[idx].answer
                }
            })


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
                return {
                    ...prevState,
                    id: e.target.name,
                    tipEditor: e.target.value,
                    termEditor: letters.letters[idx].term,
                    answerEditor: letters.letters[idx].answer
                }
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
                return {
                    ...prevState,
                    id: e.target.name,
                    answerEditor: e.target.value,
                    tipEditor: e.target.value,
                    termEditor: letters.letters[idx].term,
                }
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

    }
    const saveLetter = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        console.log('...inputValue', {...inputValue})
        if (inputValue.term.trim().length || inputValue.answer.trim().length) {
            // @ts-ignore
            const categ = await getLocalStorage('category')
            // @ts-ignore
            alert(categ)
            console.log(categ)
            // @ts-ignore
            console.log(categ.categoryDid)
            // @ts-ignore
            alert(categ.categoryDid)
            await fetch('http://localhost:3001/collection/letter', {
                method: 'POST',
            // @ts-ignore
                body: JSON.stringify({...inputValue, isAdmin: "admin", creatorid: userData.user.id, did: categ.categoryDid}),
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
        const buttonElement = e.target as HTMLButtonElement;

        const idx = letters.letters.findIndex((el) => el.id == buttonElement.name)
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
        e.preventDefault()
        setInputActive(inputValue)
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
                {letters.letters.length ?
                    letters.letters.map((item) => {

                        return (<li key={item.id}>
                            <button name={item.id || ''} onClick={updateCategory}>v</button>
                            <button name={item.id || ''} onClick={activeCategory}>✏</button>
                            <button name={item.id || ''} onClick={deleteCategory}>x</button>
                            <input disabled={inputActive == item.id ? false : true} id={'term'} name={item.id || ''}
                                   type="text" onChange={inputHandlerC} value={item.term || ''}
                                   placeholder={'Term type*'}
                            />
                            <input disabled={inputActive == item.id ? false : true} id={'tip'} name={item.id || ''}
                                   type="text" onChange={inputHandlerC} value={item.tip || ''}
                                   placeholder={'Tip type'}
                            />
                            <input disabled={inputActive == item.id ? false : true} id={'answer'} name={item.id || ''}
                                   type="text" onChange={inputHandlerC} value={item.answer || ''}
                                   placeholder={'Answer type*'}
                            />

                        </li>)
                    }) : null
                }
            </ul>
        </div>
    )
}