const express = require('express');
const supabase = require('../config/supabase');
const auth = require('../middleware/auth');
const subCheck = require('../middleware/subscription');

const router = express.Router();

// ADD SCORE
router.post('/', auth, subCheck, async (req, res) => {
    const { score, played_at } = req.body;

    const { data, error } = await supabase
        .from('scores')
        .insert([{ user_id: req.user.id, score, played_at }])
        .select();

    if (error) return res.status(400).json(error);

    res.json(data);
});

// GET SCORES
router.get('/', auth, async (req, res) => {
    const { data } = await supabase
        .from('scores')
        .select('*')
        .eq('user_id', req.user.id)
        .order('played_at', { ascending: false });

    res.json(data);
});

module.exports = router;