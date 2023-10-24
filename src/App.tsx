import './normalize.css'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {VERSION} from "../CONSTANTS.ts";
import {getLocalStorage} from "./utils/localStorage/getLocalStorage.ts";
import {deleteChromeStorage} from "./utils/localStorage/deleteChromeStorage.ts";
import {setLocalStorage} from "./utils/localStorage/setLocalStorage.ts";

interface IUser {
    user: {
        nickname: null | string,
        email: null | string,
        password: null | string,
        status: null | string,
        id: null | number,
        secret_word: null | string,
        banned: null | boolean,
        date: null | string
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

function App() {

    const [auth, setAuth] = useState<Boolean>(false)
    const [userData, setUserData] = useState<IUser>({
        user: {
            nickname: null,
            email: null,
            password: null,
            status: null,
            id: null,
            secret_word: null,
            banned: null,
            date: null
        }
    })
    const [collectionData, setCollectionData] = useState<ICollection | undefined>()
    const [activeOption, setActiveOption] = useState<string | null>()


    useEffect(() => {


        async function reqCollectionData() {
            try {
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
                setLocalStorage('category', {categoryDid:  preparedJSON.message[0]?.id})

                if (collectionData?.collections !== undefined) {
                    setActiveOption(collectionData?.collections[0]?.id || null);
                }
            } catch (error) {
                console.error('Error fetching collection data:', error);
            }
        }


        async function verifyAuth(): Promise<void> {
            const authStatusRaw = await getLocalStorage('user');


            if (typeof authStatusRaw === 'object' && authStatusRaw !== null) {
                const authStatus: IUser = authStatusRaw as IUser;

                if (Object.keys(authStatus).length == 2) {
                    const fetchOBJ: any = {
                        // @ts-ignore TODO
                        email: authStatus.email,
                        // @ts-ignore  TODO
                        password: authStatus.password,
                        isAdmin: 'admin',
                    };
                    // TODO: Refactor bad practice setState (in this situation)
                    const allUserData = await fetch('http://localhost:3002/auth/login', {
                        method: "POST",
                        body: JSON.stringify(fetchOBJ),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    const allUserDataJSON = await allUserData.json()
                    if (allUserData.ok) {
                        deleteChromeStorage('user')
                        setUserData({user: allUserDataJSON.message})
                        setLocalStorage('user', allUserDataJSON.message)
                        setAuth(true)
                    }
                }


                if (authStatusRaw && authStatusRaw !== true) {
                    setAuth(true)
                    // @ts-ignore TODO
                    setUserData({user: authStatus})
                    console.log('113 str| after set', userData)
                }



            } else {
                console.log('Invalid data in storage')
            }
        }

        verifyAuth().then(r => console.log('Verify completed', r))

        if (auth) {
            reqCollectionData().then(r => {
                console.log('Request completed', r)
            } )
        }
    }, [auth])


    const handlerOptions = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
        deleteChromeStorage('category')
        if (collectionData?.collections === undefined || collectionData?.collections[0].id === undefined) {
            return false
        }
        setLocalStorage('category', {categoryDid: e.target.value ?? collectionData?.collections[0].id})
        setActiveOption(e.target.value ?? collectionData?.collections[0].id)
    }

    return (
        <>
            <div className={'container'}>

                {/*Header*/}

                <div className="header" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <small style={{fontSize: '10px', marginLeft: '2em'}}>build {VERSION} </small>
                    <img src="vite.svg" alt={'logotype-app'}/>
                </div>

                {/*Profile*/}

                <div className="profile">
                    <img src="vite.svg" alt={'users-avatar'}/>
                    {
                        userData.user.id ? <div className={"profile-info"}>
                            <span className={'profile-info-name'}>ID</span>&nbsp;
                            <span>{userData.user.nickname == null ? userData.user.email : userData.user.nickname}</span>
                            <br/>
                            <span className={'profile-info-status'}>status:</span>&nbsp;
                            <span>{userData.user.status ?? 'guest'}</span>
                        </div> : <h3>Hello, Guest! <Link to={'auth/register'}>Register</Link> or <Link
                            to={'auth/login'}>Login</Link> please.. </h3>
                    }

                </div>

                {/*Info yourself*/}

                {/*<div className="statistics">*/}
                {/*    <ul>*/}
                {/*        <li>Количество слов:</li>*/}
                {/*        <li>Количество выученных слов:</li>*/}
                {/*        <li>Количество колод:</li>*/}
                {/*    </ul>*/}
                {/*</div>*/}

                {/*Btn utils*/}

                <div className="editors-buttons">
                    <button className={'btn btn-settings'}>Settings</button>
                    <button className={'btn btn-import'}>Import</button>
                    <button className={'btn btn-any'}>Any</button>
                </div>

                {/*category*/}
                <div className={'category category__mainscreen'}>

                    <select onChange={handlerOptions}>
                        {collectionData?.collections && collectionData?.collections[0]?.id ? collectionData?.collections.map((item) => {
                            return <option key={item.id} value={item.id || ''}>{item.label}</option>
                        }) : null}
                    </select>

                    <Link to={'/repeat/' + activeOption}>
                        <button>🔁</button>
                    </Link>
                    <Link to={'/collection'}>
                        <button>+</button>
                    </Link>
                    <Link to={'/collection/letters/' + activeOption}>
                        <button>▷</button>
                    </Link>
                </div>

                {/*Footer*/}

                <div className='footer'>
                    <ul style={{
                        padding: 0,
                        listStyle: "none",
                        display: 'flex',
                        justifyContent: "space-around",
                        fontSize: '12px'
                    }}>
                        <li><a href="#">
                            created by Nik
                        </a></li>
                        <li><a href="#">
                            Privacy and Politics
                        </a></li>
                        <li><a href="#">
                            Bug report
                        </a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default App
