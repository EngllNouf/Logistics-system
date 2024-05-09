const express = require("express");
const router = express.Router(); 

router.post("/", (request, response) => {
    response.send({data: "Here is your confTruck"});

});

module.exports = router;