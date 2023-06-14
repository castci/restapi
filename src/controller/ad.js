const express = require('express');
const router = express.Router();

const { getAds, insertAd, deleteAd, updateAd } = require('../model/ads');

router.get('/', async (req, res) => {
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
