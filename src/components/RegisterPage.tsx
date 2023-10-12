import {Link} from "react-router-dom";
import {ChangeEvent, useState} from "react";

export default function RegisterPage() {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {

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

    const sendData = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()


        if (userData.password === userData.confirmPassword) {
            const fetchUserData = await fetch('http://localhost:3002/auth/register', {
                method: 'POST',
                body: JSON.stringify({email: userData.email, password: userData.confirmPassword}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const preparedJSON = await fetchUserData.json()

            console.log(preparedJSON)
            alert('OK')
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
            <Link to={'auth/login'}>I have account!</Link>
        </div>
    )
}