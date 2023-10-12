import {Link} from "react-router-dom";

export default function CategoryPage() {
    return (
        <div>
            <h2>Create COLLECTION</h2>
            <input type="text" placeholder={'Collection name'}/>
            <button>Save</button>
            <Link to={'/'}>
                <button>Go back</button>
            </Link>
            <h4>Collection list</h4>
            <ul>
                <li>
                    <button>v</button>
                    <button>✏</button>
                    <button>x</button>
                    <input type="text" value={'Example 3'} disabled={true}/>
                </li>
                <li>
                    <button>v</button>
                    <button>✏</button>
                    <button>x</button>
                    <input type="text" value={'Example 3'} disabled={true}/>
                </li>
                <li>
                    <button>v</button>
                    <button>✏</button>
                    <button>x</button>
                    <input type="text" value={'Example 3'} disabled={true}/>
                </li>
            </ul>
        </div>
    )
}