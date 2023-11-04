import {Link, useNavigate} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import {getLocalStorage} from "../utils/localStorage/getLocalStorage.ts";
import {setLocalStorage} from "../utils/localStorage/setLocalStorage.ts";
import {HOST, METHOD, PORT_AUTH} from "../../CONSTANTS.ts";




export default function RegisterPage() {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })


    const navigate = useNavigate();


    useEffect(() => {

        async function verifyAuth(): Promise<void> {
            const authStatus = await getLocalStorage('user')
            if (authStatus && authStatus !== true) {
                navigate('/')
            }
        }

        verifyAuth().then(r => {
            console.log('Request completed' + r)
        })


    }, [])


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;
        if (e.target.name === 'email') {
            setUserData((prevState) => {
                return {
                    ...prevState,
                    email: value,
                };
            });
        }
        if (e.target.name === 'password') {
            setUserData((prevState) => {
                return {
                    ...prevState,
                    password: value,
                };
            });
        }
        if (e.target.name === 'confirmPassword') {
            setUserData((prevState) => {
                return {
                    ...prevState,
                    confirmPassword: value,
                };
            });
        }

    }

    const sendData = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()


        if (userData.password === userData.confirmPassword) {
            const fetchUserData = await fetch(`${METHOD}${HOST}${PORT_AUTH}/auth/register`, {
                method: 'POST',
                body: JSON.stringify({email: userData.email, password: userData.confirmPassword}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const preparedJSON = await fetchUserData.json()

            console.log(preparedJSON)
            alert(fetchUserData.status)
            if (fetchUserData.status == 201) {
                setLocalStorage('user', {email: userData.email, password: userData.confirmPassword})
            }
        } else {
            alert('Incorrect data')
        }
    }


    return (
        <div className={'container'} style={{display: 'flex', flexDirection: 'column'}}>
            <h2>Register</h2>
            <label htmlFor="email">
                Email
            </label>
            <input onChange={handleChange}
                   value={userData.email}
                   name={'email'}
                   id={'email'}
                   type="email"
                   placeholder={'Enter your email'}/>


            <label htmlFor="password">
                Password
            </label>
            <input
                onChange={handleChange}
                value={userData.password}
                name={'password'}
                id={'password'}
                type="password"
                placeholder={'Enter your password'}/>


            <label htmlFor="confirmPassword">
                Confirm password
            </label>
            <input
                onChange={handleChange}
                value={userData.confirmPassword}
                name={'confirmPassword'}
                id={'confirmPassword'}
                type="password"
                placeholder={'Enter your password'}/>

            <button onClick={sendData}>Register</button>
            <Link to={'/auth/login'}>I have account!</Link>
        </div>
    )
}