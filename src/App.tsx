import React from "react";
import "./App.css";

function App() {
    return (
        <>
            <h1>Apex V2 + React</h1>
            <PaymentForm />
        </>
    );
}
export default App;

type CollectJsConfig = unknown;
type CollectJsFormProps = {
    tokenizationKey: string;
    config: CollectJsConfig;
    children: React.ReactNode;
};
const CollectJsForm: React.FC<CollectJsFormProps> = ({ tokenizationKey, config, children }) => {
    return (
        <CollectJsFormWrapper tokenizationKey={tokenizationKey}>
            <CollectJsFormConfigInitializer config={config}>
                {children}
            </CollectJsFormConfigInitializer>
        </CollectJsFormWrapper>
    );    
};

type CollectJsFormWrapper = React.FC<Pick<CollectJsFormProps, "tokenizationKey" | "children">>;
const CollectJsFormWrapper: CollectJsFormWrapper = ({ tokenizationKey, children }) => {
    const [scriptLoaded, setScriptLoaded] = React.useState(false);
    React.useEffect(() => {
        const existingScript = document.querySelector("#collect-js-script");
        if (existingScript) {
            setScriptLoaded(true);
            return ;
        }
        else {
            const script = document.createElement("script");
            script.id = "collect-js-script";
            script.src = "https://payments.go-afs.com/token/Collect.js";
            script.async = true;
            script.setAttribute(
                "data-tokenization-key",
                tokenizationKey
            );
            script.onload = () => {
                setScriptLoaded(true);
            };
            document.head.appendChild(script);

            return () => {
                script.onload = null;
                setScriptLoaded(false);
                document.head.removeChild(script);
            };
        }
    }, [tokenizationKey]);

    if (!scriptLoaded) {
        return <></>
    }
    return <>{children}</>;
}

type CollectJsFormConfigInitializer = React.FC<Pick<CollectJsFormProps, "config" | "children">>;
const CollectJsFormConfigInitializer: CollectJsFormConfigInitializer  = ({ config, children }) => {
    React.useEffect(() => {
        if (!window.CollectJS) {
            console.error(
                "Sorry, there was an error reaching our payment processor. Please try again later."
            );
        }
        window.CollectJS.configure(config);
    }, [config]);

    return <>{children}</>;
}

const PaymentForm: React.FC = () => {

    const collectJsConfig = {
        paymentSelector: "#payButton",
        variant: "inline",
        fields: {
            ccnumber: {
                selector: "#ccnumber",
                placeholder: "0000 0000 0000 0000",
            },
            ccexp: { selector: "#ccexp", placeholder: "MM / YY" },
            cvv: { selector: "#cvv", placeholder: "***" },
        },
        fieldsAvailableCallback: () => {
            console.log("fieldsAvailableCallback");
        },
        callback: (response: unknown) => {
            console.log("callback", response);
        },
    };

    return (
        // Dynamically provide the tokenization key and Collect.js configuration
        <CollectJsForm tokenizationKey="Udt4Wn-N2J4nM-VSTsFK-J6y3QN" config={collectJsConfig}>
            <div className="card">
                <h2>Payment Form Example</h2>
                <form
                    className="payment-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <div className="form-input">
                        <span>Amount</span>
                        <input type="text" name="amount" defaultValue="10.00" />
                    </div>
                    <div className="form-input">
                        <span>First Name</span>
                        <input
                            type="text"
                            name="firstname"
                            defaultValue="Example"
                        />
                    </div>
                    <div className="form-input">
                        <span>Last Name</span>
                        <input
                            type="text"
                            name="lastname"
                            defaultValue="User"
                        />
                    </div>
                    <div className="form-input">
                        <span>Email Address</span>
                        <input
                            type="text"
                            name="email"
                            defaultValue="someone@example.com"
                        />
                    </div>
                    <div className="form-input">
                        <span>Postal Code</span>
                        <input type="text" name="zip" defaultValue="12345" />
                    </div>
                    {/* Collect.js will replace these divs with its iframes */}
                    <div id="ccnumber">
                        <span>Credit Card Number</span>
                    </div>
                    <div id="ccexp">
                        <span>Expiration Date</span>
                    </div>
                    <div id="cvv">
                        <span>CVV</span>
                    </div>
                    <button id="payButton" type="submit">
                        Pay
                    </button>
                </form>
            </div>
        </CollectJsForm>
    );
};