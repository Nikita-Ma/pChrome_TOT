import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export default function CategoryPage() {
    const [auth, setAuth] = useState(false)

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
    return (
        <div>
            <h2>COLLECTION</h2>
            <input type="text" placeholder={'Collection name'}/>
            <button>Save</button>
            <Link to={'/'}>
                <button>Go back</button>
            </Link>
            <h4>Collection list</h4>
            <ul>
                {
                    collections.collection.map((item) => {
                        return (<li key={item.id}>
                            <button>v</button>
                            <button>✏</button>
                            <button>x</button>
                            <input type="text" value={item.label} disabled={true}/>
                        </li>)
                    })
                }
            </ul>
        </div>
    )
}