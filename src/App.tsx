import './normalize.css'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {VERSION} from "../CONSTANTS.ts";


function App() {

    const [auth, setAuth] = useState(false)
    const [userData, setUserData] = useState({
        user: {
            nikname: '',
            email: '',
            password: '',
            status: '', id: ""

        }
    })
    const [collectionData, setCollectionData] = useState({
        collections: []
    })
    const [activeOption, setActiveOption] = useState()


    useEffect(() => {


        async function reqCollectionData() {
            console.log(userData)
            const fetchCollectionData = await fetch('http://localhost:3001/collection?creatorid=' + userData.user.id)
            const preparedJSON = await fetchCollectionData.json()
            setCollectionData({collections: preparedJSON.message})
            setActiveOption(preparedJSON.message[0].id)
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


    const handlerOptions = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setActiveOption(e.target.value)
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
                        auth ? <div className={"profile-info"}>
                            <span className={'profile-info-name'}>ID</span>&nbsp;
                            <span>{userData.user.nikname ?? userData.user.email}</span>
                            <br/>
                            <span className={'profile-info-status'}>status:</span>&nbsp;
                            <span>{userData.user.status}</span>
                        </div> : <h3>Hello, Guest! <Link to={'auth/register'}>Register</Link> or <Link
                            to={'auth/login'}>Login</Link> please.. </h3>
                    }

                </div>

                {/*Info yourself*/}

                <div className="statistics">
                    <ul>
                        <li>Количество слов:</li>
                        <li>Количество выученных слов:</li>
                        <li>Количество колод:</li>
                    </ul>
                </div>

                {/*Btn utils*/}

                <div className="editors-buttons">
                    <button className={'btn btn-settings'}>Settings</button>
                    <button className={'btn btn-import'}>Import</button>
                    <button className={'btn btn-any'}>Any</button>
                </div>

                {/*category*/}
                <div className={'category category__mainscreen'}>

                    <select onChange={handlerOptions}>
                        {collectionData?.collections.map((item) => {
                                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                    {/*// @ts-ignore*/}
                            return <option key={item.id} value={item.id}>{item.label}</option>
                        })}
                    </select>

                    <Link to={'/repeat/'+activeOption}><button>🔁</button></Link>
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
