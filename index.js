// console.log("Random Jokes");
const express = require("express");
const axios = require('axios');

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;


app.get("/api/v1/jokes/random", async (req,res) =>{
    try{
        const response = await axios.get("https://api.api-ninjas.com/v1/dadjokes" , {
            headers : {
                "X-Api-Key": process.env.API_KEY,
            }
        })

            if(response.data && response.data.length > 0){
                res.json({
                    success:true,
                    joke : response.data[0].joke,
                })
            } else{
                res.status(404).json({
                    success: false,
                    message : "Joke not found",
                })
            }

    } catch(err){
        res.status(500).json({
         success:false,
         message :"Internal Server Error",
        })
    }
})


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})