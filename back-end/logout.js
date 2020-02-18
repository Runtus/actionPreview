const express = require("express");
const router = express.Router();

//path : delete
router.get("/",(req,res) => {
    console.log(req.session.teacherName);
    if(req.session.teacherName === undefined)
    {
        res.json({"status":"session-empty","code":"200"});
    }
    else
    {
        delete req.session.teacherName;
        res.json({"status":"success","code":"200"})
    }
});


module.exports = router;