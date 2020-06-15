const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const auth = require('../../middlewares/auth');

const Transaction = require('../../models/Transaction');

router.post(
  '/',
  [
    auth,
    check('title', 'Please enter a title for the transaction').not().isEmpty(),
    check('amount', 'Please enter a number').not().isEmpty().isNumeric(),
    check('type', 'Please select an option').not().isEmpty(),
    check('description', 'Please add a small description').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, amount, type, description } = req.body;

    try {
      const transaction = new Transaction({
        title,
        amount,
        type,
        description,
        user: req.user.id,
      });

      await transaction.save();

      res.json(transaction);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/:userid', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.params.userid,
    }).sort({ date: -1 });

    if (!transactions) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'No transactions found' }] });
    }

    res.send(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/unique/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: 'no transaction found' });
    }

    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

router.post(
  '/edit/:id',
  [
    auth,
    [
      check('title', 'title is required').not().isEmpty(),
      check('amount', 'amount is required').not().isEmpty(),
      check('type', 'Please select an option').not().isEmpty(),
      check('description', 'description is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const transactionId = req.params.id.toString();

      const body = req.body;

      const transaction = await Transaction.findByIdAndUpdate(
        { _id: transactionId },
        body
      );

      res.send(transaction);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: 'transaction not found' });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'user not authorized' });
    }

    await transaction.remove();

    res.json({ msg: 'post removed' });
  } catch (err) {
    // logs the message from the error object
    console.error(err.message);

    // if we have an error of kind object id, returns a 404 error with a custom message
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'post not found' });
    }

    // returns a 500 status with a custom error message
    res.status(500).send('server error');
  }
});

module.exports = router;
