const supabase = require('../config/supabase');

module.exports = async (req, res, next) => {
    const { data } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', req.user.id)
        .eq('status', 'active')
        .single();

    if (!data) return res.status(403).json({ msg: 'No active subscription' });

    next();
};