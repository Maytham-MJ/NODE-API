const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");




const app = express();

app.use(express.json());


app.get("/outfit", (req, res) => {
    const Tops =  ["Black T-Shirt", "White T-Shirt", "Blue Shirt", "White Shirt"];
    const Jeans = ["Black Jeans", "Blue Jeans", "Black Shorts", "Blue Shorts"];
    const Shoes = ["Black Shoes", "White Shoes", "Brown Shoes", "Red Shoes"];

    res.json ({ 
        Tops: _.sample(Tops),
        Jeans: _.sample(Jeans),
        Shoes: _.sample(Shoes)  


    });


});



app.put("/outfit", async(req, res) => {

    const tops = req.body.tops; 
    const jeans = req.body.jeans;
    const shoes = req.body.shoes;




    if (!tops || !jeans || !shoes) {
        return res.status(400).json({ error: "Please provide a Tops, Jeans and Shoes" });
    }
    

    await fs.mkdir("data/outfit", { recursive: true });
    await fs.writeFile(`data/outfit/${tops, jeans, shoes}.txt`, tops, jeans, shoes);

    res.status(201);



});



  

app.get("/comments/:id", async (req, res) => {
    const id = req.params.id;
    let imput;

    try {
      imput = await fs.readFile(`data/comments/${id}.txt`, "utf-8");
    } catch (error){ 
        return res.status(404).json({ error: " not found"});
}
 
    res.json({
        imput: imput
    });
});

app.post("/comments", async(req, res) => {
    const id = uuid();
    const imput = req.body.imput;


    if (!imput) {
        return res.status(400).json({ error: "Please provide a comment" });
        
    }

    await fs.mkdir("data/comments", { recursive: true });
    await fs.writeFile(`data/comments/${id}.txt`, imput);

    res.status(201);

});


    

app.listen(3000, () => console.log("Server is running on port 3000"));


