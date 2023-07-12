import { getSession } from "next-auth/react"

export const requireAuth = async (context: any, callback: any) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/unauthenticated',
                permanent: false,
            },
        }
    }

    return callback({ session });
}