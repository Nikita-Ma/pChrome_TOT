import {Link} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'

export default function LoginPage() {

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })


    const navigate = useNavigate();


    useEffect(() => {

        const allCookies = document.cookie;

        const cookieArray = allCookies.split('; ');

        for (let i = 0; i < cookieArray.length; i++) {
            const cookie = cookieArray[i].split('=');
            if (cookie[0] === "auth") {
                navigate('/')
            }
        }

    })


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

    }

    const sendData = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()


        if (userData.password.length && userData.email.length) {
            const fetchUserData = await fetch('http://localhost:3002/auth/login', {
                method: 'POST',
                body: JSON.stringify({email: userData.email, password: userData.password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const preparedJSON = await fetchUserData.json()
            document.cookie = `auth=${JSON.stringify(preparedJSON)}; Secure; Max-Age=864000;`
            alert('OK')
        } else {
            alert('Incorrect data')
        }
    }


    return (
        <div className={'container'} style={{display: 'flex', flexDirection: 'column'}}>
            <h2>Login</h2>
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


            <button onClick={sendData}>Login</button>
            <Link to={'/auth/register'}>I haven't account!</Link>

        </div>
    )
}