interface Window {
    CollectJS: {
        configure: (config: unknown) => void;
    };
}

type CollectJSConfig =  {
    paymentSelector: string;
    variant: string;
    fields: {
        ccnumber: {
            selector: string;
            placeholder: string;
            enableCardBrandPreviews: boolean;
        };
        ccexp: {
            selector: string;
            placeholder: string;
        };
        cvv: {
            selector: string;
            placeholder: string;
        };
        checkaba: {
            selector: string;
            placeholder: string;
        };
        checkaccount: {
            selector: string;
            placeholder: string;
        };
        checkname: {
            selector: string;
            placeholder: string;
        };
    };
    fieldsAvailableCallback: () => void;
    callback: (response: CallbackResponse) => void;
}

type CallbackResponse = {
    token: string;
}