const express = require('express');
const users = require('../includes/users');
const admin = require('../includes/admin');

const router = express.Router();
router.use((req, res, next) => {
  if (['/login'].indexOf(req.url) === -1 && !req.session.user) {
    res.redirect('/admin/login');
  } else {
    next();
  }
});

router.use((req, res, next) => {
  req.menus = admin.getMenus(req);
  next();
});

router.get('/logout', (req, res, next) => {
  delete req.session.user;
  res.redirect('/admin/login');
});

router.get('/', (req, res) => {
  res.render('admin/index', { menus: req.menus });
});

router.post('/login', (req, res) => {
  if (!req.body.email) {
    res.render('admin/login', {
      err: 'Preencha o campo e-mail',
      body: req.body,
    });
  } else if (!req.body.password) {
    res.render('admin/login', {
      err: 'Preencha o campo password',
      body: req.body,
    });
  } else {
    const { email, password } = req.body;
    users
      .login(email, password)
      .then((response) => {
        // resposta
        req.session.user = response;
        res.redirect('/admin');
      })
      .catch((err) => {
        res.render('admin/login', {
          err: err.message || err,
          body: '',
        });
      });
  }
});

router.get('/login', (req, res) => {
  res.render('admin/login', {
    err: null,
    success: null,
    body: {},
    menus: req.menus,
  });
});

router.get('/contacts', (req, res) => {
  res.render('admin/contacts', { menus: req.menus });
});

router.get('/emails', (req, res) => {
  res.render('admin/emails', { menus: req.menus });
});
router.get('/menus', (req, res) => {
  res.render('admin/menus', { menus: req.menus });
});
router.get('/reservations', (req, res) => {
  res.render('admin/reservations', { date: {}, menus: req.menus });
});
router.get('/users', (req, res) => {
  res.render('admin/users', { menus: req.menus });
});

module.exports = router;
