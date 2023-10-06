import './normalize.css'
import './App.css'

function App() {

    return (
        <>
            <div className={'container'}>

                {/*Header*/}

                <div className="header" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <small style={{fontSize: '10px', marginLeft: '2em'}}>build id</small>
                    <img src="vite.svg" alt={'logotype-app'}/>
                </div>

                {/*Profile*/}

                <div className="profile">
                    <img src="vite.svg" alt={'users-avatar'}/>
                    <div className={"profile-info"}>
                        <span className={'profile-info-name'}>Name</span>&nbsp;<span>Nik</span>
                        <br/>
                        <span className={'profile-info-status'}>status:</span>&nbsp;<span>Developer</span>
                    </div>
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
                    <select>
                        <option value="option1">Категория 1</option>
                        <option value="option2">Категория 2</option>
                    </select>
                    <button>repeat</button>
                    <button>+</button>
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
