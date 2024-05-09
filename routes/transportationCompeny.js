const express = require("express");
const router = express.Router(); 

router.post("/", (request, response) => {
    response.send({data: "Here is your transCompany"});

});

module.exports = router;