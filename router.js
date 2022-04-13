
const {pinFileToIPFS} =require("./ipfs")
const router= require("express").Router();

router.post("/ipfs",pinFileToIPFS); 
 
module.exports = router 