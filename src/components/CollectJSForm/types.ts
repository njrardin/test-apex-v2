import React from "react";

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

// Props for the main CollectJsForm component
export type CollectJsFormProps = {
    tokenizationKey: string;
    config: CollectJSConfig;
    children: React.ReactNode;
    className?: string;
};

// Props for the CollectJsFormWrapper component
export type CollectJsFormWrapperProps = Pick<CollectJsFormProps, "tokenizationKey"> & { 
    children: React.ReactNode 
};

// Props for the CollectJsFormConfigInitializer component
export type CollectJsFormConfigInitializerProps = Pick<CollectJsFormProps, "config"> & { 
    children: React.ReactNode 
};
