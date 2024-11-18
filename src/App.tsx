import "./App.css";
import CollectJsForm from "./components/CollectJSForm";
import { CollectJSConfig } from "./components/CollectJSForm/types";

function App() {
    const collectJsConfig: CollectJSConfig = {
        paymentSelector: "#payButton",
        variant: "inline",
        fields: {
            ccnumber: {
                selector: "#ccnumber",
                placeholder: "0000 0000 0000 0000",
                enableCardBrandPreviews: true,
            },
            ccexp: { selector: "#ccexp", placeholder: "MM / YY" },
            cvv: { selector: "#cvv", placeholder: "***" },
        },
        fieldsAvailableCallback: () => {
            console.log("fieldsAvailableCallback");
        },
        callback: (response) => {
            console.log(response);
        },
    };

    return (
        <>
            <h1>Apex V2 + React</h1>
            {/* Dynamically provide the tokenization key and Collect.js configuration */}
            <CollectJsForm
                tokenizationKey="Udt4Wn-N2J4nM-VSTsFK-J6y3QN"
                config={collectJsConfig}
                className="payment-form"
            >
                <h2>Payment Form Example</h2>
                <div className="fields">
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
                </div>{" "}
                <button id="payButton" type="submit">
                    Pay
                </button>
            </CollectJsForm>
        </>
    );
}
export default App;