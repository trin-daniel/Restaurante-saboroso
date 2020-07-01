const express = require('express');

const router = express.Router();
const menus = require('../includes/menus');
const reservations = require('../includes/reservations');
const contacts = require('../includes/contacts');

router.get('/', (req, res) => {
  menus.getMenus().then((results) => {
    res.render('index', {
      title: 'Restaurante Saboroso',
      menus: results,
      background: 'images/img_bg_1.jpg',
    });
  });
});

router.get('/contacts', (req, res) => {
  res.render('contacts', {
    title: 'contacts',
    background: 'images/img_bg_3.jpg',
    h1: 'Diga um oi',
    body: '',
  });
});

router.post('/contacts', (req, res) => {
  if (!req.body.name) {
    res.render('contacts', {
      title: 'contacts',
      background: 'images/img_bg_3.jpg',
      h1: 'Diga um oi',
      err: 'Nome é obrigatório',
      body: req.body,
    });
  } else if (!req.body.email) {
    res.render('contacts', {
      title: 'contacts',
      background: 'images/img_bg_3.jpg',
      h1: 'Diga um oi',
      err: 'E-mail é obrigatório',
      body: req.body,
    });
  } else if (!req.body.message) {
    res.render('contacts', {
      title: 'contacts',
      background: 'images/img_bg_3.jpg',
      h1: 'Diga um oi',
      err: 'Messagem é obrigatória',
      body: req.body,
    });
  } else {
    contacts
      .save(req.body)
      .then((response) => {
        res.render('contacts', {
          title: 'contacts',
          background: 'images/img_bg_3.jpg',
          h1: 'Diga um oi',
          success: response,
          body: '',
        });
      })
      .catch((err) => {
        res.render('contacts', {
          title: 'contacts',
          background: 'images/img_bg_3.jpg',
          h1: 'Diga um oi',
          err,
          success: '',
          body: '',
        });
      });
  }
});

router.get('/menus', (req, res) => {
  menus.getMenus().then((results) => {
    res.render('menus', {
      title: 'Menus',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!',
      menus: results,
    });
  });
});

router.get('/reservations', (req, res) => {
  res.render('reservations', {
    title: 'Reservations',
    background: 'images/img_bg_2.jpg',
    h1: 'Reserve uma mesa',
    body: '',
  });
});

router.post(
  '/reservations',

  (req, res) => {
    if (!req.body.name) {
      res.render('reservations', {
        title: 'Reservations',
        background: 'images/img_bg_2.jpg',
        h1: 'Reserve uma mesa',
        err: 'Nome é obrigatório',
        body: req.body,
      });
    } else if (!req.body.email) {
      res.render('reservations', {
        title: 'Reservations',
        background: 'images/img_bg_2.jpg',
        h1: 'Reserve uma mesa',
        err: 'E-mail é obrigatório',
        body: req.body,
      });
    } else if (!req.body.people) {
      res.render('reservations', {
        title: 'Reservations',
        background: 'images/img_bg_2.jpg',
        h1: 'Reserve uma mesa',
        err: 'Quantidade de pessoas é obrigatório',
        body: req.body,
      });
    } else if (!req.body.date) {
      res.render('reservations', {
        title: 'Reservations',
        background: 'images/img_bg_2.jpg',
        h1: 'Reserve uma mesa',
        err: 'Date é obrigatório',
        body: req.body,
      });
    } else if (!req.body.time) {
      res.render('reservations', {
        title: 'Reservations',
        background: 'images/img_bg_2.jpg',
        h1: 'Reserve uma mesa',
        err: 'Horário da reserva é obrigatório',
        body: req.body,
      });
    } else {
      reservations
        .save(req.body)
        .then(() => {
          res.render('reservations', {
            title: 'Reservations',
            background: 'images/img_bg_2.jpg',
            h1: 'Reserve uma mesa',
            success: 'Sucesso no envio',
            body: {},
          });
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  },
);

router.get('/services', (req, res) => {
  res.render('services', {
    title: 'Services',
    background: 'images/img_5.jpg',
    h1: 'É um prazer poder servir',
  });
});

module.exports = router;
