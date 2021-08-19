const express = require('express');
const router = express.Router();
const CotizacionController = require('../controllers/cotizacionController');

module.exports = () => {
    router.get('/cotizacion', CotizacionController.listarCotizacion);
    router.post('/cotizacion', CotizacionController.cotizar);

    return router;
}