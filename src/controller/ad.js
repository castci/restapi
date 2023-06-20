const express = require('express');
const router = express.Router();

const { getAds, insertAd, deleteAd, updateAd } = require('../model/ads');
const authMiddleware = require('../middleware/authorization');

router.get('/', authMiddleware, async (req, res) => {
  console.log('this is the user which access', req.user);
  res.send(await getAds());
})
  .post('/', async (req, res) => {
    const newAd = req.body;

    const insertedAd = await insertAd(newAd);

    res.send({
      message: `Ad inserted id: ${insertedAd}`
    });
  })
  .delete('/:id', async(req, res) => {
    const id = req.params.id;

    await deleteAd(id);

    res.send({
      message: `id: ${id} deleted`
    });
  })
  .put('/:id', async(req, res) => {
    const id = req.params.id;
    const newAd = req.body;

    await updateAd(id, newAd);

    res.send({
      message: `id: ${id} updated`
    });
  });

module.exports = router;
