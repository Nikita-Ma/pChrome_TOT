export default function ModalCategory() {
    return (
        <div>
            <h2>Create COLLECTION</h2>
            <input type="text" placeholder={'Collection name'}/>
            <button>Save</button>
            <button>Go back</button>
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