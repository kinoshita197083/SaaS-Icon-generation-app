import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from 'stripe';
import { env } from '~/env.mjs';
import { buffer } from 'micro';
import { prisma } from "~/server/db";
import { TRPCError } from "@trpc/server";


// Note: `npm run stripe:listen` to connect webhook to localhost

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15"
});


// calculate product price and corresponded increment credits
let incrementCredit: number;
let pricePaid: number;

const handleCredits = () => {
    if (pricePaid === 700) {
        incrementCredit = 55
    }
    if (pricePaid === 1300) {
        incrementCredit = 120
    }
    if (pricePaid === 2700) {
        incrementCredit = 250
    }
}


export const config = {
    api: {
        bodyParser: false,
    },
};


// stripe code docs to create a web hook: https://dashboard.stripe.com/test/webhooks/create
const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {

        const buf = await buffer(req);
        const sig = req.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, env.STRIPE_WEB_HOOK_SECRET);
        } catch (err) {
            let message = "Unknow Error";
            if (err instanceof Error) message = err.message;
            res.status(400).send(`Webhook Error: ${message}`);
            return;
        }

        // Handle the checkout complete event
        // stripe webhook checkout session complete docs code: https://dashboard.stripe.com/test/webhooks/create?events=checkout.session.completed
        switch (event.type) {

            case 'checkout.session.completed':

                const completedEvent = event.data.object as {
                    id: string,
                    metadata: {
                        userId: string
                    };
                    amount_total: number;
                }

                pricePaid = completedEvent.amount_total;
                handleCredits();

                // increment credits to user once payment is successful completed
                try {
                    await prisma.user.update({
                        where: {
                            id: completedEvent.metadata.userId,
                        },
                        data: {
                            credits: {
                                increment: incrementCredit,
                            }
                        }
                    })
                } catch (err) {
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: 'Payment Unsuccessful'
                    })
                }

                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        res.json({ received: true });
    } else {
        res.setHeader('Alliow', 'POST');
        res.status(405).end("Method Not Allowed");
    }
}

export default webhook;