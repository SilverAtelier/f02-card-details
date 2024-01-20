import React, { useState } from "react";
import Button from "../Button/Button";
import { UserDetails } from "../../constants";


type FormProps = {
    onSubmit: (formData: UserDetails) => void;
};

const Form: React.FC<FormProps> = ({ onSubmit }) => {

    const [errName, setErrName] = useState(false);
    const [errCardNumber, setErrCardNumber] = useState('');
    const [errExpMonth, setErrExpMonth] = useState('');
    const [errExpYear, setErrExpYear] = useState('');
    const [errCvc, setErrCvc] = useState('');

    const blank = "Can't be blank";
    const wrongFormat = "Wrong format, numbers only";
    const numbersOnly = "Numbers only";
    const wrongMonth = "Wrong month";
    const expired = "Expired";

    const [formData, setFormData] = useState<UserDetails>({
        cardHolder: "",
        cardNumber: "",
        cardExpMonth: "",
        cardExpYear: "",
        cardCvc: "",
    });

    const checkFields = () => {
        if (!formData.cardHolder) {
            setErrName(true);
        }
        if (formData.cardNumber) {

            const cardNumber = formData.cardNumber.toString().replace(/\s/g, "");
            const regex = /^[0-9]*$/;
            if (!regex.test(cardNumber)) {
                setErrCardNumber(wrongFormat);
                return;
            }
            formData.cardNumber = cardNumber;
            if (cardNumber.length !== 16) {
                setErrCardNumber('Sixteen digits only');
                return;
            }
        }else{
            setErrCardNumber(blank);
        }
        if (formData.cardExpMonth) {

            const cardExpMonth = formData.cardExpMonth;
            const regex = /^[0-9]*$/;
            if (!regex.test(cardExpMonth)) {
                setErrExpMonth(numbersOnly);
            }

            if (cardExpMonth.length < 1) {
                setErrExpMonth(wrongMonth);
            }

            if (parseInt(cardExpMonth) > 12) {
                setErrExpMonth(wrongMonth);
            }
        }else{
            setErrExpMonth(blank);
        }
        if (formData.cardExpYear) {

            const cardExpYear = formData.cardExpYear;
            const regex = /^[0-9]*$/;
            if (!regex.test(cardExpYear)) {
                setErrExpYear(numbersOnly);
            }

            const currentYear = new Date().getFullYear();
            const currentYearLastDigits = currentYear.toString().slice(-2);
            if (parseInt(cardExpYear) < parseInt(currentYearLastDigits)) {
                setErrExpYear(expired);
            }
        }else
        {
            setErrExpYear(blank);
        }
        if (formData.cardCvc) {

            const cardCvc = formData.cardCvc;
            const regex = /^[0-9]*$/;
            if (!regex.test(cardCvc)) {
                setErrCvc(numbersOnly);
            }

            if (cardCvc.length !== 3) {
                setErrCvc('Three digits only');
            }
        }else{
            setErrCvc(blank);
            return;
        }
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (checkFields()) {
            console.log(formData);
        }
        return;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let cardNumber = "";
        //formatting card number
        if (e.target.name === "cardNumber") {
            cardNumber = e.target.value;
            cardNumber = cardNumber.replace(/\s/g, "");
            cardNumber = cardNumber.replace(/(\d{4})/g, "$1 ");
            cardNumber = cardNumber.trim();
            e.target.value = cardNumber;
        }
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setFormData((updatedFormData) => {
            onSubmit(updatedFormData);
            cardNumber = "";
            return updatedFormData;
        });
        //resetting errors
        if (name === "cardHolder") {
            setErrName(false);
        }
        if (name === "cardNumber") {
            setErrCardNumber("");
        }
        if (name === "cardExpMonth") {
            setErrExpMonth("");
        }
        if (name === "cardExpYear") {
            setErrExpYear("");
        }
        if (name === "cardCvc") {
            setErrCvc("");
        }
    }


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
                    {errName && <p className="err-text">Can't be blank</p>}
                </div>
                <div className="form-card-number">
                    <label htmlFor="card-number">Card Number</label>
                    <input
                        type="text"
                        name="cardNumber"
                        id="card-number"
                        placeholder="e.g. 1234 5678 9123 0000"
                        onChange={handleChange}
                        maxLength={19}
                        required
                    />
                    {errCardNumber && <p className="err-text">{errCardNumber}</p>}
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
                        {( errExpMonth || errExpYear) && <p className="err-text">{errExpMonth || errExpYear}</p>}
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
                        {errCvc && <p className="err-text">{errCvc}</p>}
                    </div>
                </div>
                <div className="form-submit">
                    <Button classname="formBtn" text="Confirm" onClick={handleSubmit} />
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
