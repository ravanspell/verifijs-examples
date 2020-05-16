const router = require('express').Router();
let mysqldb = require('../mysqldb');
const validation = require('../validation');

router.post('/save', async (req, res) => {
  try {
    const { barcode, itemName, amount, tonPrice, wholePrice, retailPrice, company, gotPrice } = req.body;
    //custom validation messages
    const messages = {
      barcode_unique: "Barcode is alredy exsist try another one"
    }
    //setup validation rules
    const validate = await validation.check(req.body, {
      barcode: 'required|integer',
      amount: 'required|integer',
      tonPrice: 'required|integer',
      gotPrice: 'required|integer',
      wholePrice: 'required|integer',
      retailPrice: 'required|integer',
      company: 'required|string|max:25',
      itemName: 'required|string|max:25',
    }, messages);
    //exit if validation fails
    if (!validate.validation)
      return res.status(201).json({ status: false, message: validate.error });

    const itemSaveQuery = `INSERT INTO items (barcode,name,stock,t,w,r,company,got_price) 
                           VALUES(${barcode},"${itemName}",${amount},${tonPrice},${wholePrice},${retailPrice},"${company}",${gotPrice})`;
    await mysqldb.query(itemSaveQuery);
    return res.status(201).json({ status: true, message: "Item has been saved" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;