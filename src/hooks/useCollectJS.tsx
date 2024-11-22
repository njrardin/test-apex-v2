import React from "react";

type useCollectJSProps = {
    tokenizationKey: string;
    config: CollectJSConfig;
}
function useCollectJS({ tokenizationKey, config }: useCollectJSProps) {
    //? Used to prevent double load when in React.StrictMode
    //? (this is a hack but it's required due to the way Collect.js is loaded)
    const isLoadedRef = React.useRef(false);

    React.useEffect(() => {
        if (isLoadedRef.current) {
            return;
        }
        // Load the Collect.js script
        const script = document.createElement("script");
        script.src = "https://payments.go-afs.com/token/Collect.js";
        script.defer = true;
        script.setAttribute("data-tokenization-key", tokenizationKey);
        script.onload = () => {
            if (!window.CollectJS) {
                console.error(
                    "Sorry, there was an error reaching our payment processor. Please try again later."
                );
            }
            window.CollectJS.configure(config);    
        }
        document.head.appendChild(script);
        console.log("Script loaded");
        isLoadedRef.current = true;
    }, [config, isLoadedRef, tokenizationKey]);

    React.useEffect(() => {
        if (window.CollectJS) {
            window.CollectJS.configure(config);
        }
    }, [config]);

    return {
        CollectJS: isLoadedRef.current ? window.CollectJS : null,
    }
}

export default useCollectJS;