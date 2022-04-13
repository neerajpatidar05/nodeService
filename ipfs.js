const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')

const pinFileToIPFS = async (req, res) => {
  console.log('req.body', req.body)

  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
  let data = new FormData()

  // return res.json({
  //       success : 1,
  //       "message":"Upload Successfully",
  //       // data:IpfsHash

  //     })
  //  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  //  let data = new FormData();
  //   let nftpath = __dirname+`/${req.body.x}.png`;

  //   data.append("file", fs.createReadStream(nftpath));
  //  const result = await axios.post(url, data, { 
  //    maxContentLength: "Infinity",
  //    headers: {
  //      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
  //      pinata_api_key: process.env.PINATA_APIKEY,
  //       pinata_secret_api_key: process.env.PINATA_API_SECRETKEY,
  //     },
  //  });
  //   console.log(result.data.IpfsHash);
  const NFTMetadata = {  
    name: 'Rimulation',
    description: `X : ${req.body.tile.lat}     Y : ${req.body.tile.lng}    Z : ${req.body.tile.z}`,
    image: `https://tile.openstreetmap.org/${req.body.tile.z}/${req.body.tile.x}/${req.body.tile.y}.png`,
    external_link: 'www.rimulation.com/',
  }
  function shortNumber(val) {
    console.log('val', val)
    let ed = val.toString()
    console.log('esddddd', ed)
    let [first, second] = ed.split('.')
  

console.log('first',first)
console.log('second',second)
    if (second) {
      if (second.length > 8) {
        let final = first + 'D' + second.substring(0, 8)
        console.log(final,"finallllll+++");
        return final
      }
     else { 
      let final = first+'D' + second
      console.log(final,"finallllll");
      return final
    } }
    else{
      return first+'D'+second  
    }  
  } 
  console.log('lengthahahal', req.body.tile.lng)
   
  let fileName =
    'X' + await shortNumber(req.body.tile.lat) + 'Y' + await shortNumber(req.body.tile.lng)
  let jsonpath = __dirname + `/json/${fileName}.json`
  const metadata = JSON.stringify(NFTMetadata)
  fs.writeFile(`./json/${fileName}.json`, metadata, (err) => {
    if (err) {
      throw err 
    }
    console.log('created Metadata!')
    pinMetadata(req, res, jsonpath)
  })

  async function pinMetadata(req, res, jsonpath) {
    let metadata = new FormData()
    metadata.append('file', fs.createReadStream(jsonpath))
    const metafileresult = await axios.post(url, metadata, {
      maxContentLength: 'Infinity',

      headers: {
        'Content-Type': `multipart/form-data; boundary=${metadata._boundary}`,
        pinata_api_key: process.env.PINATA_APIKEY,
        pinata_secret_api_key: process.env.PINATA_API_SECRETKEY,
      },
    })
    console.log(metafileresult.data.IpfsHash)
    let IpfsHash = metafileresult.data.IpfsHash

    return res.json({
      success: 1, 
      message: 'Upload Successfully',
      ipfsHash:  IpfsHash,
    })
  } 
}
 
module.exports = {
  pinFileToIPFS,
}
 