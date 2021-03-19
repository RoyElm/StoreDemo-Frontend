import React from 'react';
import { Typography, Grid, TextField } from '@material-ui/core';
import { CreditCard } from '@material-ui/icons';
import creditCardModel from '../../Models/creditCardModel';
import { useForm } from 'react-hook-form';

interface addressFormProps {
    handlePaymentChange: any,
    paymentState: creditCardModel
}

function PaymentForm(props: addressFormProps) {
    const { register } = useForm<creditCardModel>({ defaultValues: props.paymentState })

    function changeDateFormat() {
        const fullYear = new Date().getFullYear();
        let fullMonth = (new Date().getMonth() + 1).toString();
        if (fullMonth < "10") fullMonth = '0' + fullMonth;
        return `${fullYear}-0${fullMonth}`;
    }

    return (
        <form>
            <Typography variant="h6" gutterBottom>
                Credit Card DEMO!!: <CreditCard />
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cardName"
                        name="nameOnCard"
                        inputRef={register}
                        onChange={props.handlePaymentChange("nameOnCard")}
                        label="Name on card"
                        fullWidth
                        autoComplete="cc-name" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        name="cardNumber"
                        id="cardNumber"
                        inputRef={register}
                        onChange={props.handlePaymentChange("cardNumber")}
                        label="Card number"
                        fullWidth
                        autoComplete="cc-number"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="expDate"
                        name="expiryDate"
                        label="Expiry date"
                        inputRef={register}
                        type="month"
                        InputLabelProps={{ shrink: true }}
                        onChange={props.handlePaymentChange("expiryDate")}
                        inputProps={{ min: changeDateFormat() }}
                        fullWidth
                        autoComplete="cc-exp" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cvv"
                        name="cvv"
                        label="CVV"
                        inputRef={register}
                        onChange={props.handlePaymentChange("cvv")}
                        helperText="Last three digits on signature strip"
                        fullWidth
                        autoComplete="cc-csc"
                    />
                </Grid>
            </Grid>
        </form>
    );
}

export default PaymentForm;