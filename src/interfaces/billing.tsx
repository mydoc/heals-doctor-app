export interface IInvoice {
    id: number,
    isTaxIncluded: boolean,
    taxRate: number,
    taxLabel: string
}

export interface IInvoiceLineItem {
    id: number,
    invoiceId: number,
    description: string,
    amount: number,
    quantity: number,
    feeSystemType: FeeSystemType,
    feeType: FeeType,
    scheme: BenefitScheme,
    rate: number,
    copay: number,
    code: string,
    max: number
}


export enum IInvoiceStatus {
    New, // no payment method
    Pending, // has payment method, waiting to be executeced
    Void, // invoice is cancelled
    Paid, // invoice payment is successful
    FailedPayment // payment is not successful; Failed Payment may have another payment method applied and status becomes pending.
}

export enum FeeType {
    Payment = "Payment",
    Consult = "Consultation",
    Prescription = "Prescription",
    Delivery = "Delivery",
    Applicable = "Applicable Fees",
    DrugsInjections = "Drugs and Injections",
    MedicalProcedure = "Medical Procedure",
    Consumables = "Consumables",
    Others = "Others",
}

export enum FeeSystemType {
    Default = 0,
    Voucher = 1,
    Benefit = 2
}

export enum BenefitScheme {
    // default line items
    NOT_APPLICABLE = 0,
    APPLICABLE = 1,

    // benefit line items
    LIMIT = 2,
    POOL = 3,
    DEDUCTIBLE_RATE = 4,
    DEDUCTIBLE_AMOUNT = 5,
    COPAY_RATE = 6,
    COPAY_AMOUNT = 7
}
