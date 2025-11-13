import express from "express";
import cors from "cors";



 const app = express();
 app.use(cors({
    origin:"http://localhost:5173/",
    credentials: true
}))

app.use(express.json());

app.get("/api/users" , (req, res) => {
    res.status(200).json([
        {name: 'tanish'},
        {name:"saurabh"}
    ])
})

 app.listen(process.env.PORT, () => {
    console.log('server is running on http://localhost:3000')
 })