import React from 'react';
import './App.css'

function App() {

    React.useEffect(() => {
        // Step 1: Add the script tag to the head of the document
        

        configureCollectJS();
    }, []);

    function configureCollectJS() {
        if (!window.CollectJS) {
            console.error(
                "Sorry, there was an error reaching our payment processor. Please try again later."
            );
        }
        window.CollectJS.configure({
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
        });
    }

    return (
        <div>
            <h1>Apex V2 + React Demo</h1>
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
        </div>
    );
}

export default App