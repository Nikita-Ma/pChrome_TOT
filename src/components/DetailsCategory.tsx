import {Link} from "react-router-dom";

export default function DetailsCategory() {
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
                <li>
                    <button>v</button>
                    <button>✏</button>
                    <button>x</button>
                    <input type="text" value={'letter 3'} disabled={true}/>
                </li>
                <li>
                    <button>v</button>
                    <button>✏</button>
                    <button>x</button>
                    <input type="text" value={'letter 2'} disabled={true}/>
                </li>
                <li>
                    <button>v</button>
                    <button>✏</button>
                    <button>x</button>
                    <input type="text" value={'letter 1'} disabled={true}/>
                </li>
            </ul>
        </div>
    )
}