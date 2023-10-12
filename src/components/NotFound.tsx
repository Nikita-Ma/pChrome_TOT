import {Link} from "react-router-dom";

export default function NotFound() {
    return (<>
        <h1>o.o Not found</h1>
        <Link to={'/'} style={{color: 'white'}}>Main page</Link>
    </>)
}