
export const isServer = typeof window === "undefined";

export const clientLocalStorage = (): any | undefined => {
    if (isServer) return;
    return localStorage;
};