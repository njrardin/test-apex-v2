import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import './App.css';
import useCollectJS from './hooks/useCollectJS';

function App() {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      amount: "10.00",
      first_name: "Jane",
      last_name: "Doe",
      email: "someone@example.com",
      zip: "12345",
      payment: "creditcard",
      account_type: "checking",
    },
  });

  const paymentMethod = watch("payment");

  useCollectJS({
    tokenizationKey: "Udt4Wn-N2J4nM-VSTsFK-J6y3QN",
    config: {
      paymentSelector: "#payButton",
      variant: "inline",
      fields: {
        ccnumber: {
          selector: "#ccnumber",
          placeholder: "0000 0000 0000 0000",
          enableCardBrandPreviews: true,
        },
        ccexp: {
          selector: "#ccexp",
          placeholder: "MM / YY",
        },
        cvv: {
          selector: "#cvv",
          placeholder: "***",
        },
        checkaba: {
          selector: "#checkaba",
          placeholder: "000000000",
        },
        checkaccount: {
          selector: "#checkaccount",
          placeholder: "0000000000",
        },
        checkname: {
          selector: "#checkname",
          placeholder: "Jane Doe",
        },
      },
      fieldsAvailableCallback: () => {
        console.log("fieldsAvailableCallback");
      },
      callback: (response) => {
        if (response.token) {
          handleSubmit(submitWithToken(response?.token))();
        } else {
          console.error("No token in response");
        }
      },
    },
  });

  function submitWithToken(token: string) {
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      const payload = {
        ...data,
        payment_token: token,
      };
      console.log("submitWithToken payload:", payload);
    };
    return onSubmit;
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
            <label>
              First Name
              <input type="text" {...register("first_name")} />
            </label>
          </div>
          <div className="form-input">
            <label>
              Last Name
              <input type="text" {...register("last_name")} />
            </label>
          </div>
          <div className="form-input">
            <label>
              Email Address
              <input type="text" {...register("email")} />
            </label>
          </div>
          <div className="form-input">
            <label>
              Postal Code
              <input type="text" {...register("zip")} />
            </label>
          </div>
          <div className="form-input">
            <label>
              <input type="radio" value="creditcard" {...register("payment")} />
              Credit Card
            </label>
            <label>
              <input type="radio" value="check" {...register("payment")} />
              E-Check
            </label>
          </div>
          {paymentMethod === "creditcard" && (
            <>
              <div id="ccnumber">
                <span>Credit Card Number</span>
              </div>
              <div id="ccexp">
                <span>Expiration Date</span>
              </div>
              <div id="cvv">
                <span>CVV</span>
              </div>
            </>
          )}
          {paymentMethod === "check" && (
            <>
              <div id="checkaba">
                <span>Routing Number</span>
              </div>
              <div id="checkaccount">
                <span>Account Number</span>
              </div>
              <div id="checkname">
                <span>Account Holder Name</span>
              </div>
            </>
          )}
          <button id="payButton" type="submit">
            Pay
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
