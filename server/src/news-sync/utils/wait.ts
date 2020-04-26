/**
 * Returns a promise that completes after the specified
 * amount of time.
 * @param timeMs The amount of time to wait
 */
export function wait(timeMs: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeMs);
    });
}