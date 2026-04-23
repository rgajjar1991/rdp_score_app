const express = require('express');
const router = express.Router();
const stripe = require('../config/stripe');
const auth = require('../middleware/auth');

router.post('/create-session', auth, async (req, res) => {
    const { plan } = req.body;

    const priceId =
        plan === 'yearly'
            ? 'price_1TPK5fSJPN49sqhAJIdyyg9n'
            : 'price_1TPK54SJPN49sqhAIVow0b3z';

    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        customer_email: req.user.email, // optional
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],

        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',

        client_reference_id: req.user.id
    });

    res.json({ url: session.url });
});



router.post('/webhook', async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // 🎯 HANDLE EVENTS
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        const userId = session.client_reference_id;

        await supabase.from('subscriptions').insert({
            user_id: userId,
            status: 'active',
            plan: session.mode === 'subscription' ? 'monthly' : 'yearly',
            start_date: new Date(),
            end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            stripe_subscription_id: session.subscription
        });
    }

    // ❗ handle cancellation
    if (event.type === 'customer.subscription.deleted') {
        const subId = event.data.object.id;

        await supabase
            .from('subscriptions')
            .update({ status: 'cancelled' })
            .eq('stripe_subscription_id', subId);
    }

    res.json({ received: true });
});

module.exports = router;