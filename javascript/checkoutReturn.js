const express = require('express');

const router = express.Router();

const RETURN_TARGETS = {
  cart: '/cart',
  orders: '/account/orders',
  home: '/',
  support: '/help/contact'
};

router.get('/checkout/return', (req, res) => {
  const dest = req.query.to;
  const path = RETURN_TARGETS[dest];

  if (!path) {
    return res.redirect('/');
  }

  res.redirect(path);
});

module.exports = router;
