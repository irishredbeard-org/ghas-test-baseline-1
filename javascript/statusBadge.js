const express = require('express');

const router = express.Router();

const BADGES = {
  paid: '<span class="badge badge-green">Paid</span>',
  pending: '<span class="badge badge-amber">Pending</span>',
  overdue: '<span class="badge badge-red">Overdue</span>',
  refunded: '<span class="badge badge-grey">Refunded</span>'
};

router.get('/invoices/:id/badge', (req, res) => {
  const state = req.query.state;
  const markup = BADGES[state];

  if (!markup) {
    return res.status(400).send('unknown state');
  }

  res.type('html').send('<div class="invoice-status">' + markup + '</div>');
});

module.exports = router;
