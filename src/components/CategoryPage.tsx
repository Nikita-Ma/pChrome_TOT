import {Link} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";

export default function CategoryPage() {
    const [auth, setAuth] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [inputActive, setInputActive] = useState(null)
    {/*// @ts-ignore*/}
    const [inputEditorValue, setInputEditorValue] = useState(null)

    const [userData, setUserData] = useState({
        user: {
            nikname: '',
            email: '',
            password: '',
            status: '', id: ""

        }
    })
    const [collections, setCollections] = useState({collection: [{}]})
    useEffect(() => {

        async function reqCollectionData() {

            const fetchCollectionData = await fetch('http://localhost:3001/collection?creatorid=' + userData.user.id)
            const preparedJSON = await fetchCollectionData.json()
            setCollections({collection: preparedJSON.message})
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
            reqCollectionData()
        }
    }, [auth])

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    const inputHandlerC = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value, e.target.name)
        const inputValue = e.target.value
        // @ts-ignore
        const idx = collections.collection.findIndex((el) => el.id == e.target.name)
        setCollections(prevState => {
            const updatedCollection = [...prevState.collection];
            // @ts-ignore
            updatedCollection[idx].label = inputValue;
            return {...prevState, collection: updatedCollection};
        });
        console.log(collections)
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
        // @ts-ignore
        const idx = collections.collection.findIndex((el) => el.id == e.target.name)
        e.preventDefault()
        {/*// @ts-ignore*/}
        if (collections.collection[idx].label) {
            await fetch('http://localhost:3001/collection', {
                method: 'PUT',
                // @ts-ignore

                body: JSON.stringify({
                    //  @ts-ignore*
                    id: e.target.name,
                    //  @ts-ignore*
                    label: collections.collection[idx].label,
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

        // @ts-ignore
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
                    collections.collection.map((item) => {
                        // @ts-ignore
                        // @ts-ignore
                        return (<li key={item.id}>
                            {/*// @ts-ignore*/}
                            <button name={item.id} onClick={updateCategory}>v</button>
                            {/*// @ts-ignore*/}
                            <button name={item.id} onClick={activeCategory}>✏</button>
                            {/*// @ts-ignore*/}
                            <button name={item.id} onClick={deleteCategory}>x</button>
                            {/*// @ts-ignore*/}

                            <input name={item.id} type="text" onChange={inputHandlerC}  value={inputEditorValue ?? item.label}  disabled={inputActive == item.id ? false : true}/>
                        </li>)
                    })
                }
            </ul>
        </div>
    )
}