const express = require('express');
const supabase = require('../config/supabase');
const auth = require('../middleware/auth');

const router = express.Router();

// RANDOM DRAW
function generateRandomNumbers() {
    const nums = new Set();
    while (nums.size < 5) {
        nums.add(Math.floor(Math.random() * 45) + 1);
    }
    return [...nums];
}

// ALGORITHMIC DRAW
async function generateAlgorithmicNumbers() {
    const { data: scores } = await supabase.from('scores').select('score');

    const freq = {};
    scores.forEach(s => {
        freq[s.score] = (freq[s.score] || 0) + 1;
    });

    return Object.keys(freq)
        .sort((a, b) => freq[b] - freq[a])
        .slice(0, 5)
        .map(Number);
}

// CREATE DRAW
router.post('/create', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.sendStatus(403);

    const { type, month, year } = req.body;

    let numbers =
        type === 'random'
            ? generateRandomNumbers()
            : await generateAlgorithmicNumbers();

    const { data, error } = await supabase
        .from('draws')
        .insert([{ type, month, year, draw_numbers: numbers, status: 'draft' }])
        .select();

    res.json(data);
});

module.exports = router;