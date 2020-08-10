import React, { Fragment, useState } from "react";

const InputTodo = ({ setTodoChanges }) => {
    const [description, setDescription] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const myHeaders = new Headers();

            myHeaders.append("Content-type", "application/json");
            myHeaders.append("token", localStorage.token);

            const body = { description };
            const response = await fetch("http://localhost:5000/dashboard/todos", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            });

            await response.json();
            setTodoChanges(true);
            setDescription("");
            // window.location = "/";
        } catch (err) {
            console.error(err.message);
        }

    };
    return (
        <Fragment>
            <h3 className="text-center my-5">Input Todo</h3>
            <form className="d-flex" onSubmit={onSubmitForm}>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Add Todo"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button className="btn btn-success ml-1" >Add</button>
            </form>
        </Fragment>
    );
};

export default InputTodo;