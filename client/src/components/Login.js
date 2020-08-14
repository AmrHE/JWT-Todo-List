import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = (props) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const body = { email, password }
        try {
            const response = await fetch("http://localhost:5000/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                });
            const parsedResponse = await response.json();
            if (parsedResponse.token) {
                localStorage.setItem("token", parsedResponse.token);
                props.setAuth(true);
                toast.success("Logged In Successfully");
            } else {
                props.setAuth(false);
                toast.error(parsedResponse);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center my-5">Login</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="form-control my-3"
                    value={email}
                    onChange={e => onChange(e)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control my-3"
                    value={password}
                    onChange={e => onChange(e)}
                />
                <button className="btn btn-success btn-block">Log In</button>
            </form>
            <p className="text-center my-3">New to Todo-App?
            <Link className="" to="/register"> Create an account</Link>
            </p>
            <p className="text-center my-3">Log in using
            <Link className="btn btn-outline-primary btn-sm" to="/facebook">Facebook</Link>
            or
            <Link className="btn btn-outline-danger btn-sm" to="/google">Google</Link>
            </p>
        </Fragment>
    )
}

export default Login;