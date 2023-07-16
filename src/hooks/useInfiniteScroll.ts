import { RefObject, useEffect } from "react";

export function useInfiniteScroll(
    ref: RefObject<any>,
    hasNextPage: boolean | undefined,
    isFetching: boolean,
    fetchNextPage: any
) {

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        };

        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target!.isIntersecting && hasNextPage && !isFetching) {
                fetchNextPage();
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [fetchNextPage, hasNextPage, isFetching]);

}