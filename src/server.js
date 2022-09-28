const express = require("express")
const user = require("./routes/user")
var cors = require('cors')

const app = express()

app.use(express.json())
app.use(user)
app.use(cors())

app.get("/registro", (req, res) => {
    return res.json("Usuário registrado!")
})


app.listen(3333, () => {
    console.log("Server aberto na porta 3333")
})