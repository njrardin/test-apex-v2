import React from "react";
import {
    CollectJsFormConfigInitializerProps,
    CollectJsFormProps,
    CollectJsFormWrapperProps,
} from "./types";

const CollectJsForm: React.FC<CollectJsFormProps> = ({ tokenizationKey, config, className, children }) => {
    return (
        <CollectJsFormWrapper tokenizationKey={tokenizationKey}>
            <CollectJsFormConfigInitializer config={config}>
                <form onSubmit={(e) => e.preventDefault()} className={className}>
                    {children}
                </form>
            </CollectJsFormConfigInitializer>
        </CollectJsFormWrapper>
    );    
};

const CollectJsFormWrapper: React.FC<CollectJsFormWrapperProps> = ({ tokenizationKey, children }) => {
    const [scriptLoaded, setScriptLoaded] = React.useState(false);

    React.useEffect(() => {
        const existingScript = document.querySelector("#collect-js-script");
        if (existingScript) {
            setScriptLoaded(true);
            return;
        }

        const script = document.createElement("script");
        script.id = "collect-js-script";
        script.src = "https://payments.go-afs.com/token/Collect.js";
        script.async = true;
        script.setAttribute("data-tokenization-key", tokenizationKey);
        script.onload = () => setScriptLoaded(true);
        document.head.appendChild(script);

        return () => {
            script.onload = null;
            setScriptLoaded(false);
            document.head.removeChild(script);
        };
    }, [tokenizationKey]);

    if (!scriptLoaded) {
        return <></>;
    }

    return <>{children}</>;
};

const CollectJsFormConfigInitializer: React.FC<CollectJsFormConfigInitializerProps> = ({ config, children }) => {
    React.useEffect(() => {
        if (!window.CollectJS) {
            console.error(
                "Sorry, there was an error reaching our payment processor. Please try again later."
            );
        } else {
            window.CollectJS.configure(config);
        }
    }, [config]);

    return <>{children}</>;
};

export default CollectJsForm;
