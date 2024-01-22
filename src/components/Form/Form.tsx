import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import { UserDetails } from "../../constants";

type FormProps = {
    onUpdate: (formData: UserDetails) => void;
    onSub: () => void;
};

const Form: React.FC<FormProps> = ({ onUpdate, onSub }) => {
    const [formData, setFormData] = useState<UserDetails>({
        cardHolder: "",
        cardNumber: "",
        cardExpMonth: "",
        cardExpYear: "",
        cardCvc: "",
    });
    const [cardNumber, setCardNumber] = useState<string>("");
    const [errors, setErrors] = useState<Partial<UserDetails>>({});

    const checkFields = () => {
        const newErrors: Partial<UserDetails> = {};

        if (!formData.cardHolder.trim()) {
            newErrors.cardHolder = "Can't be blank";
        }

        const cardNumber = formData.cardNumber.replace(/\s/g, "");
        const regex = /^[0-9]*$/;
        if (!cardNumber) {
            newErrors.cardNumber = "Can't be blank";
        }else if (!regex.test(cardNumber)) {
            newErrors.cardNumber = "Wrong format, only numbers allowed";
        }
        const cardExpMonth = formData.cardExpMonth;
        if (!cardExpMonth ) {
            newErrors.cardExpMonth = "Can't be blank";
        } else if (!regex.test(cardExpMonth)) {
            newErrors.cardExpMonth = "Numbers Only";
        }else if (parseInt(cardExpMonth) > 12 || parseInt(cardExpMonth) < 1) {
            newErrors.cardExpMonth = "Invalid Month";
        }

        const cardExpYear = formData.cardExpYear;
        const currentYear = new Date().getFullYear();
        const currentYearLastDigits = currentYear.toString().slice(-2);
        if (!cardExpYear) {
            newErrors.cardExpYear = "Can't be blank";
        }else if (!regex.test(cardExpYear)) {
            newErrors.cardExpYear = "Numbers Only";
        }else if (parseInt(cardExpYear) < parseInt(currentYearLastDigits)) {
            newErrors.cardExpYear = "Expired";
        }

        const cardCvc = formData.cardCvc;
        if (!cardCvc) {
            newErrors.cardCvc = "Can't be blank";
        }else if (!regex.test(cardCvc)) {
            newErrors.cardCvc = "Numbers Only";
        }else if (cardCvc.length < 3) {
            newErrors.cardCvc = "Invalid CVC";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (checkFields()) {
            onUpdate(formData);
            onSub();
            // console.log(formData);
        }
    };
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cardNumber = e.target.value.replace(/\s/g, "");
        const name = e.target.name;
        setCardNumber(cardNumber);
        setFormData({
            ...formData,
            [name]: cardNumber,
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "cardNumber") {
            handleCardNumberChange(e);
            return;
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        onUpdate(formData);
    }, [formData, onUpdate]);

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <div className="form-card-name">
                    <label htmlFor="card-holder">Cardholder Name</label>
                    <input
                        type="text"
                        name="cardHolder"
                        id="card-holder"
                        placeholder="e.g. Jane Appleseed"
                        onChange={handleChange}
                        required
                    />
                    {errors.cardHolder && <p className="err-text">{errors.cardHolder}</p>}
                </div>
                <div className="form-card-number">
                    <label htmlFor="card-number">Card Number</label>
                    <input
                        type="text"
                        name="cardNumber"
                        id="card-number"
                        placeholder="e.g. 1234 5678 9123 0000"
                        onChange={handleChange}
                        value={cardNumber}
                        maxLength={16}
                        required
                    />
                    {errors.cardNumber && <p className="err-text">{errors.cardNumber}</p>}
                </div>
                <div className="form-card-exp-cvc">
                    <div className="form-card-exp">
                        <label>Exp. Date (MM/YY)</label>
                        <div className="form-card-exp-inputs">
                            <input
                                type="text"
                                name="cardExpMonth"
                                id="card-exp-month"
                                placeholder="MM"
                                onChange={handleChange}
                                maxLength={2}
                                required
                            />
                            <input
                                type="text"
                                name="cardExpYear"
                                id="card-exp-year"
                                placeholder="YY"
                                onChange={handleChange}
                                maxLength={2}
                                required
                            />
                        </div>
                        {(errors.cardExpMonth || errors.cardExpYear) && (
                            <p className="err-text">{errors.cardExpMonth || errors.cardExpYear}</p>
                        )}
                    </div>
                    <div className="form-card-cvc">
                        <label htmlFor="card-cvc">CVC</label>
                        <input
                            type="text"
                            name="cardCvc"
                            id="card-cvc"
                            placeholder="e.g. 123"
                            onChange={handleChange}
                            maxLength={3}
                            required
                        />
                        {errors.cardCvc && <p className="err-text">{errors.cardCvc}</p>}
                    </div>
                </div>
                <div className="form-submit">
                    <Button classname="formBtn" text="Confirm" type="submit" onClick={checkFields}/>
                </div>
            </form>
            <div className="attribution">
                Challenge by
                <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
                    Frontend Mentor
                </a>
                . Coded by
                <a href="https://x.com/silver_atelier">SilverAtelier</a>.
            </div>
        </div>
    );
};

export default Form;
