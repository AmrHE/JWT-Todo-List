import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import InputTodo from './todolist/InputTodo';
import ListTodo from './todolist/ListTodos';


const DashBoard = (props) => {
    const [name, setName] = useState("");
    const [allTodos, setAllTodos] = useState([]);
    const [todoChanges, setTodoChanges] = useState(false);


    async function getProfileInfo() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: 'GET',
                headers: { token: localStorage.token },
            });

            const parsedResponse = await response.json();
            setAllTodos(parsedResponse);
            setName(parsedResponse[0].user_name)

        } catch (err) {
            console.error(err.message);
        }
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        props.setAuth(false);
        toast.success("Logged Out successfully")
    }

    useEffect(() => {
        getProfileInfo();
        setTodoChanges(false);
    }, [todoChanges])

    return (
        <Fragment>
            <div className="d-flex mt-5 justify-content-around"></div>
            <h2 className="text-center">{name} 's To-Do List</h2>
            <InputTodo setTodoChanges={setTodoChanges}></InputTodo>
            <ListTodo allTodos={allTodos} setTodoChanges={setTodoChanges}></ListTodo>
            <button className="btn btn-primary mt-3" onClick={(e) => logout(e)} >Logout</button>
        </Fragment>
    )
}


export default DashBoard;

