const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//REGISTERING ROUTE
router.post("/register", validInfo, async (req, res) => {
    try {
        //1. destructure the req.body (name, email, password)
        const { name, email, password } = req.body;

        //2.check if the user exists (if the user existsthen throw error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if (user.rows.length !== 0) {
            return res.status(401).json("User Already Exist!");
        };

        //3. bcrypt yhe user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        //4. enter the user inside our database
        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]
        );

        //5.generating our JWT token
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});


//LOGIN ROUTE
router.post("/login", validInfo, async (req, res) => {
    try {
        //1. destructuring the req.body
        const { email, password } = req.body;

        //2. check if the user exists (if not then throw error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json("User Doesn't Exist!");
        };

        //3.check if incomming password is the same as the recoded password in the database
        const ValidPassword = await bcrypt.compare(password, user.rows[0].user_password);
        if (!ValidPassword) {
            return res.status(401).json('Incorrect E-mail or Password');
        };

        //4.give them a jwt token
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});



module.exports = router;