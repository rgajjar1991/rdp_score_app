const express = require('express');
const supabase = require('../config/supabase');
const auth = require('../middleware/auth');

const router = express.Router();

// VERIFY WINNER
router.post('/verify/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.sendStatus(403);

    const { id } = req.params;

    const { data } = await supabase
        .from('winners')
        .update({ status: 'verified' })
        .eq('id', id);

    res.json(data);
});

// MARK PAID
router.post('/paid/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.sendStatus(403);

    const { id } = req.params;

    const { data } = await supabase
        .from('winners')
        .update({ status: 'paid' })
        .eq('id', id);

    res.json(data);
});

module.exports = router;