import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { toast } from 'react-toastify';


class Facebook extends Component {

    state = {
        isLoggedIn: false,
        email: '',
        accessToken: '',
        name: '',
        password: ''
    }

    responseFacebook = async (resultFacebookLogin) => {
        const response = await resultFacebookLogin;
        try {
            this.setState({
                isLoggedIn: true,
                name: response.name,
                email: response.email,
                accessToken: response.accessToken,
                password: response.id
            });



            const body = {
                email: this.state.email,
                accessToken: this.state.accessToken,
                name: this.state.name,
                password: this.state.password
            }

            const res = await fetch("http://localhost:5000/auth/facebook",
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
            console.error(console.err);
        }
    };


    render() {
        let fbContent;

        if (this.state.isLoggedIn) {
            fbContent = null;
        } else {
            fbContent = (<FacebookLogin
                appId="701552600394619"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />
            )
        }
        return (
            <div>{fbContent}</div>
        );
    }
};


export default Facebook;