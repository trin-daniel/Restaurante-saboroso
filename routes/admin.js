const express = require('express');
const moment = require('moment-js/moment');
const users = require('../includes/users');
const admin = require('../includes/admin');
const menus = require('../includes/menus');
const contacts = require('../includes/contacts');
const reservations = require('../includes/reservations');

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
  admin
    .dahsboardCount()
    .then((response) => {
      res.render('admin/index', {
        menus: req.menus,
        user: req.session.user,
        data: response,
      });
    })
    .catch((err) => {
      console.log(err);
    });
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
  contacts
    .getContacts()
    .then((data) => {
      res.render('admin/contacts', {
        menus: req.menus,
        user: req.session.user,
        data,
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete('/contacts/:id', (req, res) => {
  contacts
    .delete(req.params.id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/menus', (req, res) => {
  menus.getMenus().then((data) => {
    res.render('admin/menus', {
      menus: req.menus,
      user: req.session.user,
      data,
    });
  });
});

router.post('/menus', (req, res, next) => {
  const { fields } = req;
  const { files } = req;
  menus
    .save(fields, files)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete('/menus/:id', (req, res, next) => {
  menus
    .delete(req.params.id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/reservations', (req, res) => {
  reservations.getReservations().then((data) => {
    res.render('admin/reservations', {
      date: {},
      data,
      menus: req.menus,
      user: req.session.user,
      moment,
    });
  });
});

router.post('/reservations', (req, res, next) => {
  const { fields } = req;
  const { files } = req;
  reservations
    .save(fields, files)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete('/reservations/:id', (req, res, next) => {
  reservations
    .delete(req.params.id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/users', (req, res) => {
  users.getUsers().then((data) => {
    res.render('admin/users', {
      menus: req.menus,
      user: req.session.user,
      data,
    });
  });
});

router.post('/users', (req, res) => {
  users
    .save(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.delete('/users/:id', (req, res) => {
  users
    .delete(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
  // res.render('admin/users', { menus: req.menus, user: req.session.user });
});
module.exports = router;
