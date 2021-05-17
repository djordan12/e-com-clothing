import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const onToken = token => {
    console.log(token);
    alert('Payment Successful');
}

const StripeCheckoutButton = ({ price }) => {
    // https://stripe.com/docs/stripe-js/react
    // Stripe wants the price in cents
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IqlJ9FI605fj7KzQNXKgcou7OlfYuXH4KBHUQ0J1PY9MgbjckKBsDi1MKn3dfmXisBeEpJZBIfnhMeaauU7MxuV00MHY1JdXw';

    return (
        <StripeCheckout
            label='Pay Now'
            name='King Clothing'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;