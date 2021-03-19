import React from 'react';
import { Typography, TextField, Grid } from '@material-ui/core';
import orderModel from '../../Models/orderModel';
import { useForm } from 'react-hook-form';

interface addressFormProps {
    handleAddressChange: any,
    addressState: orderModel
}

export default function AddressForm(props: addressFormProps) {

    const { register } = useForm<orderModel>({ defaultValues: props.addressState });

    return (
        <form>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        inputRef={register}
                        onChange={props.handleAddressChange("firstName")}
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        inputRef={register}
                        onChange={props.handleAddressChange("lastName")}
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        inputRef={register}
                        id="address"
                        onChange={props.handleAddressChange("address")}
                        name="address"
                        label="Address"
                        fullWidth
                        autoComplete="shipping address-line1"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        inputRef={register}
                        onChange={props.handleAddressChange("city")}
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        inputRef={register}
                        onChange={props.handleAddressChange("zip")}
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        inputRef={register}
                        onChange={props.handleAddressChange("country")}
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                    />
                </Grid>
            </Grid>
        </form>
    );
}