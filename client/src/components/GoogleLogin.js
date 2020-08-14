import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { toast } from 'react-toastify';

class Google extends Component {

    state = {
        isLoggedIn: false,
        email: '',
        accessToken: '',
        name: '',
    }

    responseGoogle = async (resultGoogleLogin) => {
        const response = await resultGoogleLogin;

        try {
            this.setState({
                isLoggedIn: true,
                name: response.profileObj.name,
                email: response.profileObj.name,
                accessToken: response.accessToken,
                password: response.googleId
            })

            const body = {
                email: this.state.email,
                accessToken: this.state.accessToken,
                name: this.state.name,
                password: this.state.password
            }

            const res = await fetch("http://localhost:5000/auth/google",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                })
            const parsedResponse = await res.json();

            if (parsedResponse.token) {
                localStorage.setItem("token", parsedResponse.token);
                this.props.setAuth(true);
                toast.success("Registered Successfully")
            } else {
                this.props.setAuth(false);
                toast.error(parsedResponse)
            }
        } catch (err) {
            console.error(err.message)
        }
    }

    render() {
        let GoogleContent;

        if (this.state.isLoggedIn) {
            GoogleContent = null;
        } else {
            GoogleContent = (<GoogleLogin
                clientId="434338496963-7lt78fg4gkudn4l59cn4kbgbef6gmq4m.apps.googleusercontent.com"
                buttonText="Login"
                autoLoad={true}
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
            />)
        }
        return (
            <div>{GoogleContent}</div>
        )
    }
}
export default Google;