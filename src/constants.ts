
export const CARD_DEFAULTS = {
    cardHolder: "Jane Appleseed",
    cardNumber: "0000 0000 0000 0000",
    cardExpMonth: "00",
    cardExpYear: "00",
    cardCvc: "000",
};

export type UserDetails = {
    cardHolder: string;
    cardNumber: string;
    cardExpMonth: string;
    cardExpYear: string;
    cardCvc: string;
};
