const Cotizacion = require('../models/Cotizacion');
const enviarMail = require('./mailController');

exports.cotizar = (req, res) => {
    const data = req.body;
    const emailExprReg = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (!data.numberPhone || !data.fullName ||
        !data.email || !data.social ||
        !data.businessName || !data.interested) res.status(400).send({ message: 'Todos los campos son necesarios', code: 400, error: true });
    else if (!emailExprReg.test(data.email)) res.status(400).send({ message: 'Correo no válido', code: 400, error: true });
    else if (String(data.numberPhone).length !== 9) res.status(400).send({ message: 'Numero de celular no válido', code: 400, error: true });
    else if (!req.body.verified) res.status(403).send({ message: 'Acepte compartir sus datos personales con la empresa', code: 403, error: true });

    Cotizacion.create(data)
        .then((data) => {
            enviarMail.enviar({
                filename: 'email',
                requestNumber: data.requestNumber,
                user: data,
                fullName: data.fullName,
                subject: 'Solicitud de Cotización'
            });
            Cotizacion.update({ requestNumber: data.requestNumber }, { where: { id: data.id } });
            res.status(201).send({ message: 'Se envió la cotización a su correo', data });
    })
        .catch(error => {
            res.status(500).send({ message: 'Error en los servidores', code: error.status, error: true })
    })
}

exports.listarCotizacion = (req, res) => {
    Cotizacion.findAll()
        .then(response => {
            if (response.length === 0) res.status(200).send({ message: 'No se encontro registro de cotizaciónes' });
            res.status(200).send(response);
    })
        .catch(error => {
            res.status(500).send({ message: 'Error en los servidores', code: error.status, error: true })
    })
}