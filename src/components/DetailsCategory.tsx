import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export default function DetailsCategory() {
    const [collection, setCollection] = useState('')
    const [letters, setLetters] = useState({
        letters: [{}]
    })
    useEffect(() => {

        async function reqCollectionLettersData() {
            const collectionID = location.href.split("/")[5]
            const fetchCollectionData = await fetch('http://localhost:3001/collection/' + collectionID)
            const preparedJSON = await fetchCollectionData.json()
            setLetters({letters: preparedJSON.message})
        }

        console.log(letters)
        reqCollectionLettersData()
    }, [])
    return (
        <div>
            <h2>COLLCTION NAME</h2>
            <input type="text" placeholder={'add letter'}/>
            <button>Save</button>
            {/*TODO: Create COMPONENT GO BACK AND ETC!!*/}
            <Link to={'/'}>
                <button>Go back</button>
            </Link>
            <h4>Collection list</h4>
            <ul>
                {
                    letters.letters.map((item) => {
                        return (<li key={item.id}>
                            <button>v</button>
                            <button>✏</button>
                            <button>x</button>
                            <input type="text" value={item.term} disabled={true}/>
                            <input type="text" value={item.tip} disabled={true}/>
                            <input type="text" value={item.answer} disabled={true}/>
                        </li>)
                    })
                }

            </ul>
        </div>
    )
}