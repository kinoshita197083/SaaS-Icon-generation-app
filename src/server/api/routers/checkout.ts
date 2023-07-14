import { z } from "zod";

import { createTRPCRouter, protectedProcedure, } from "~/server/api/trpc";
import { env } from '~/env.mjs';
import Stripe from 'stripe';

// code documentation from stripe: 
// https://stripe.com/docs/api/checkout/sessions/create?lang=node


const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
});

export const checkoutRouter = createTRPCRouter({
    createCheckout: protectedProcedure.mutation(async ({ ctx }) => {

        return stripe.checkout.sessions.create({
            payment_method_types: ['card', 'au_becs_debit'],
            metadata: {
                // keep tracking user id per payment, so that credits can apply to the user
                userId: ctx.session.user.id,
            },
            line_items: [
                { price: env.PRICE_ID_1, quantity: 1 },
            ],
            mode: 'payment',
            success_url: `${env.HOST_NAME}`,
            cancel_url: `${env.HOST_NAME}`,
        });
    }),
});
