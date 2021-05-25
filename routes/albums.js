var express = require('express');
var router = express.Router();
const albumr =require("../controller/albums");
router.post("/Createalbums",albumr.albumscreate);
router.get("/GetAllalbums",albumr.getallalbums);
router.get("/Getalbum/:id",albumr.getalbum);
router.put("/Updatealbum/:id",albumr.updatealbum);;
router.delete("/Deletealbum/:id",albumr.deletealbum);
module.exports=router;
