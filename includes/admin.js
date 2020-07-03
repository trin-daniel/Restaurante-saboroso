const conn = require('./database');

module.exports = {
  dahsboardCount() {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT
    (SELECT COUNT(*) FROM tb_contacts) AS nrcontacts,
    (SELECT COUNT(*) FROM tb_menus) AS nrmenus,
    (SELECT COUNT(*) FROM tb_reservations) AS nrreservations,
    (SELECT COUNT(*) FROM tb_users) AS nrusers;`,
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0]);
          }
        },
      );
    });
  },
  getMenus(req) {
    // eslint-disable-next-line prefer-const
    let menus = [
      {
        text: 'Tela inicial',
        href: '/admin/',
        icon: 'home',
        active: false,
      },

      {
        text: 'Menu',
        href: '/admin/menus',
        icon: 'cutlery',
        active: false,
      },

      {
        text: 'Reservas',
        href: '/admin/reservations',
        icon: 'calendar-check-o',
        active: false,
      },

      {
        text: 'Contatos',
        href: '/admin/contacts',
        icon: 'comments',
        active: false,
      },

      {
        text: 'Usuarios',
        href: '/admin/users',
        icon: 'users',
        active: false,
      },
      {
        text: 'Emails',
        href: '/admin/emails',
        icon: 'envelope',
        active: false,
      },
    ];
    menus.map((menu) => {
      if (menu.href === `/admin${req.url}`) menu.active = true;
    });
    return menus;
  },
};
