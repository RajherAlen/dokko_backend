import { useCallback, useEffect, useRef, useState } from "react";

export const useHttpClient = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const activeHttpRequest = useRef([]);

    const sendRequest = useCallback(
        async (url, method = "GET", body = null, headers = {}) => {
            setLoading(true);
            const httpAbortConroller = new AbortController();
            activeHttpRequest.current.push(httpAbortConroller);

            try {
                const res = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortConroller.signal,
                });

                const resData = await res.json();

                if (!res.ok) {
                    throw new Error(resData.message);
                }

                return resData;
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        },
        []
    );

    const clearEror = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            activeHttpRequest.current.forEach((abortControl) =>
                abortControl.abort()
            );
        };
    }, []);

    return {
        isLoading: loading,
        error,
        sendRequest,
        clearEror,
    };
};

export default useHttpClient;
