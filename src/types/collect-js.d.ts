export type CollectJS = {
    configure: (config: CollectJSConfig) => void;
    startPaymentRequest: (event: Event) => void;
    clearInputs: () => void;
}

export type CollectJSConfig = {
    paymentSelector?: string;
    variant?: CollectJSVariant;
    fields?: {
        ccnumber: BaseField;
        ccexp: BaseField;
        cvv: BaseField;
    };
    validationCallback?: (field: unknown, status: unknown, message: string) => void
    timeoutDuration?: number;
    timeoutCallback?: () => void;
    fieldsAvailableCallback?: () => void;
    callback?: (response: unknown) => void;
}

type BaseField = {
    selector: string;
    placeholder?: string;
}

type CollectJSVariant = "inline" | "lightbox";