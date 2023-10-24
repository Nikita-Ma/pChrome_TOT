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

interface ICollection {
    collections: {
        id: null | string,
        label: null | string,
        creatorid: null | string,
        repeated: null | string,
        date: null | string
    }[] | undefined
}

interface IJSONCollection {
    message: {
        id: null | string,
        label: null | string,
        creatorid: null | string,
        repeated: null | string,
        date: null | string
    }[]
}

export default function CategoryPage() {
    const [inputValue, setInputValue] = useState('')
    const [inputActive, setInputActive] = useState<string | null>(null)
    // const [inputEditorValue, setInputEditorValue] = useState(null)

    const [auth, setAuth] = useState<Boolean>(false)
    const [userData, setUserData] = useState<IUser>({
        user: {
            nickname: null,
            email: null,
            password: null,
            status: null,
            id: null
        }
    })
    const [collectionData, setCollectionData] = useState<ICollection | undefined>()

    useEffect(() => {


        async function reqCollectionData() {
            try {
                console.log(userData);
                const fetchCollectionData = await fetch('http://localhost:3001/collection?creatorid=' + userData.user.id);
                if (!fetchCollectionData.ok) {
                    alert('Network response was not ok');
                    return;
                }

                const preparedJSON: IJSONCollection = await fetchCollectionData.json();


                if (!preparedJSON.message) {
                    setCollectionData({collections: undefined});
                }

                setCollectionData({collections: preparedJSON.message})
            } catch (error) {
                console.error('Error fetching collection data:', error);
            }
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
            reqCollectionData().then(r => console.log('Request completed', r))
        }
    }, [auth])

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    const inputHandlerC = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value, e.target.name)
        const inputValue = e.target.value
        const idx = collectionData?.collections?.findIndex((el) => el.id == e.target.name)
        setCollectionData(prevState => {
            if (prevState === undefined || idx === undefined || prevState.collections === undefined) {
                return;
            }
            const updatedCollection = [...prevState.collections];
            updatedCollection[idx].label = inputValue;
            return {...prevState, collection: updatedCollection};
        });
        console.log(collectionData)
    }
    const saveCategory = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (inputValue.trim().length) {
            await fetch('http://localhost:3001/collection', {
                method: 'POST',
                body: JSON.stringify({label: inputValue, isAdmin: "admin", creatorid: userData.user.id}),
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
        const buttonElement = e.currentTarget as HTMLButtonElement;
        const inputValue = buttonElement.name;
        const idx = collectionData?.collections?.findIndex((el) => el.id == inputValue)
        e.preventDefault()

        if (collectionData === undefined || idx === undefined || collectionData.collections === undefined) {
            return;
        }

        if (collectionData.collections[idx].label) {
            await fetch('http://localhost:3001/collection', {
                method: 'PUT',

                body: JSON.stringify({
                    label: collectionData.collections[idx].label,
                    id: inputValue,
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
        console.log(inputValue)
        e.preventDefault()
        await fetch('http://localhost:3001/collection', {
            method: 'DELETE',
            body: JSON.stringify({id: inputValue, isAdmin: "admin", creatorid: userData.user.id}),
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
    }

    return (
        <div>
            <h2>COLLECTION</h2>
            <input type="text" placeholder={'Enter name new collection'} onChange={inputHandler}/>
            <button onClick={saveCategory}>Save</button>
            <Link to={'/'}>
                <button>Go back</button>
            </Link>
            <h4>Collection list</h4>
            <ul>
                {
                    collectionData !== undefined && collectionData.collections !== undefined ?
                        collectionData?.collections.map((item) => {
                            return (<li key={item.id}>
                                <button name={item.id || ''} onClick={updateCategory}>v</button>
                                <button name={item.id || ''} onClick={activeCategory}>✏</button>
                                <button name={item.id || ''} onClick={deleteCategory}>x</button>

                                <input name={item.id || ''} type="text" onChange={inputHandlerC}
                                       value={item.label || ''}
                                       disabled={inputActive != item.id}/>
                            </li>)
                        }) : null
                }
            </ul>
        </div>
    )
}