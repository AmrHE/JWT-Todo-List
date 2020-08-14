import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Google from './GoogleLogin';



const Register = (props) => {

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        name: ''
    });


    const { email, password, name } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = { email, password, name }

            const response = await fetch("http://localhost:5000/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                })

            const parsedResponse = await response.json();

            if (parsedResponse.token) {
                localStorage.setItem("token", parsedResponse.token);
                props.setAuth(true);
                toast.success("Registered Successfully")
            } else {
                props.setAuth(false);
                toast.error(parsedResponse)
            }

        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center my-5">Create a new account</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="form-control my-3"
                    value={email}
                    onChange={e => onChange(e)} />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control my-3"
                    value={password}
                    onChange={e => onChange(e)} />
                <input
                    type="text"
                    name="name"
                    placeholder="Username"
                    className="form-control my-3"
                    value={name}
                    onChange={e => onChange(e)} />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <p className="text-center my-3">Already have an account?
            <Link className="" to="/login"> Log in</Link>
            </p>
            
            <p className="text-center my-3">Sign up using
            <Link className="btn btn-outline-primary btn-sm" to="/facebook">Facebook</Link>
            or
            <Link className="btn btn-outline-danger btn-sm" to="/google"> Google</Link>
            </p>
        </Fragment>
    )
}

export default Register;