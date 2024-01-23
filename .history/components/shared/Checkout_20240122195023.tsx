import React from "react";

const Checkout = () => {
  const onCheckout = async () => {
    console.log("checkout");
  };

  return <form action={onCheckout} method="post"></form>;
};

export default Checkout;
