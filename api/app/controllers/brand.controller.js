const axios = require('axios');
const db = require("../models");
const Brand = db.brands;
const Op = db.Sequelize.Op;

// Fetch brands from scaping api and Save all of them
exports.fetchAndSave = async (req, res) => {
  const apiUrl = process.env.API_URL;
  const arrays = req.body;
  console.log(req.body)
  let results = [];
  try {
    const responses = await Promise.all(arrays.map(arr => {
      if(arr.website)
        return axios.post(apiUrl, {startUrls: [{url: arr.website}]});
      else
        return 0;
    }));
    if(responses[0])
      results.push({title: arrays[0].title, company: arrays[0].company, brand: arrays[0].brand, brandLists: responses[0].data});
    if(responses[1])
      results.push({title: arrays[1].title, company: arrays[1].company, brand: arrays[1].brand, brandLists: responses[1].data});
    if(responses[2])
      results.push({title: arrays[2].title, company: arrays[2].company, brand: arrays[2].brand, brandLists: responses[2].data});
  } catch(err) {
    console.log(err)
  }
  // Create a Brands
  for (const result of results) {
    await Promise.all(result.brandLists.map(async (item)=> {
      const brand = {
        termShort: item.term,
        termLong: item.term,
        hits: item.count,
        type: "Primary"
      }
      await Brand.create(brand)
        .then(() => console.log('DB saved'))
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating brand"
          })
        })
    }));
  }
  res.send(results);
};
