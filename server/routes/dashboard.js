const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");


//Get all todos and name
router.get("/", authorization, async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
            [req.user.id]
        );

        res.json(user.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

//Create a todo route
router.post("/todos", authorization, async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *",
            [req.user.id, description]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});


//Update a todo route
router.put("/todos/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
            [description, id, req.user.id]
        );
        if (updateTodo.rows.length === 0) {
            return res.json("This To-Do is not yours")
        }
        res.json("The Todo was UPDATED!");

        // (updateTodo.rows.length === 0) ? 
        // res.json("This To-Do is not yours") : 
        // res.json("The Todo was UPDATED!");

    } catch (err) {
        console.error(err.message);
    }

});

//Delete a todo route
router.delete("/todos/:id", authorization, async (req, res) => {
    try {
        
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",
            [id, req.user.id]
        );
    
        if (deleteTodo.rows.length === 0) {
            return res.json("This To-Do is not yours")
        }
        res.json("To-do item was DELETED")
    } catch (err) {
        console.error(err.message)
    }

    // (deleteTodo.rows.length === 0) ? 
    //     res.json("This To-Do is not yours") : 
    //     res.json("To-do item was DELETED");
})


module.exports = router;