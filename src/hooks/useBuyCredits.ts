import { loadStripe } from '@stripe/stripe-js';
import { env } from '~/env.mjs';
import { api } from '~/utils/api';

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_KEY);

export function useBuyCredits() {

    const checkout = api.checkout.createCheckout.useMutation();

    const buyCredits = async (priceId: number) => {
        const response = await checkout.mutateAsync({
            priceId: priceId,
        });
        const stripe = await stripePromise;
        await stripe?.redirectToCheckout({
            sessionId: response.id,
        })
    }

    return {
        // buyCredits: async (priceId: number) => {
        //     const response = await checkout.mutateAsync({
        //         priceId: priceId,
        //     });
        //     const stripe = await stripePromise;
        //     await stripe?.redirectToCheckout({
        //         sessionId: response.id,
        //     })
        // },

        handleBuyCredits: (priceId: number) => {
            try {
                buyCredits(priceId);
            } catch (err) {
                console.log(err);
            }
        }
    }
}