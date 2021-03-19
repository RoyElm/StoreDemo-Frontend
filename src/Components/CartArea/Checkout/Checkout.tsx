import React, { ChangeEvent, Component } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Button, Typography } from '@material-ui/core';
import AddressForm from '../AddressForm/AddressForm';
import PaymentForm from '../PaymentForm/PaymentForm';
import FinalReview from '../FinalReview/FinalReview';
import "./Checkout.css";
import orderModel from '../../Models/orderModel';
import creditCardModel from '../../Models/creditCardModel';

interface CheckoutState {
    activeStep: number,
    addressState: orderModel,
    paymentState: creditCardModel,
    addressComplete: boolean,
    paymentComplete: boolean
}


class Checkout extends Component<{}, CheckoutState> {
    public steps = ['Shipping address', 'Payment details', 'Review your order'];

    public constructor(props: {}) {
        super(props);
        this.state = {
            activeStep: 0,
            addressState: new orderModel(),
            paymentState: new creditCardModel(),
            addressComplete: false,
            paymentComplete: false
        }
    }

    private handleAddressChange = (input: string) => (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            addressState: {
                ...this.state.addressState,
                [input]: e.target.value !== "" ? e.target.value : undefined
            }
        }, () => {
            for (const item in this.state.addressState) {
                if (this.state.addressState[item] === undefined)
                    return this.setState({ addressComplete: false });
            }
            this.setState({ addressComplete: true });
        });
    };

    private handlePaymentChange = (input: string) => (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            paymentState: {
                ...this.state.paymentState,
                [input]: e.target.value !== "" ? e.target.value : undefined
            }
        }, () => {
            for (const item in this.state.paymentState) {
                if (this.state.paymentState[item] === undefined)
                    return this.setState({ paymentComplete: false });
            }
            this.setState({ paymentComplete: true });
        });
    };

    private handleNext = () => {
        const activeStep = this.state.activeStep + 1;
        this.setState({ activeStep })
    };

    private handleBack = () => {
        const activeStep = this.state.activeStep - 1;
        this.setState({ activeStep })
    };

    private getStepContent = step => {
        switch (step) {
            case 0:
                return <AddressForm
                    handleAddressChange={this.handleAddressChange}
                    addressState={this.state.addressState}
                />;
            case 1:
                return <PaymentForm
                    handlePaymentChange={this.handlePaymentChange}
                    paymentState={this.state.paymentState}
                />;
            case 2:
                return <FinalReview
                    addressState={this.state.addressState}
                    paymentState={this.state.paymentState}
                />;
            default:
                throw new Error('Unknown step');
        }
    }

    render() {
        return (
            <div className="Checkout">
                <CssBaseline />
                <Paper className="paperTag">
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={this.state.activeStep} className="stepperTag">
                        {this.steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {this.state.activeStep === this.steps.length ? (
                        <>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                        </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #2001539. We have emailed your order confirmation, and will
                                send you an update when your order has shipped.
                                ty for checking our web :D,
                            <br />
                            Build By Roy Elmakies
                        </Typography>
                        </>
                    ) : (
                        <>
                            {this.getStepContent(this.state.activeStep)}
                            <div className="buttonsTag">
                                {this.state.activeStep !== 0 ?
                                    <>
                                        <Button onClick={this.handleBack} className="buttonTag">
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                            className="buttonTag"
                                            disabled={!this.state.paymentComplete}
                                        >
                                            {this.state.activeStep === this.steps.length - 1 ? 'Order!' : 'Next'}
                                        </Button>
                                    </> :
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleNext}
                                        className="buttonTag"
                                        disabled={!this.state.addressComplete}
                                    >
                                        {this.state.activeStep === this.steps.length - 1 ? 'Order!' : 'Next'}
                                    </Button>
                                }
                            </div>
                        </>
                    )}
                </Paper>
            </div>
        );
    }
}

export default Checkout;