import React from "react";

const Checkout = () => {
  const onCheckout = async () => {
    console.log("checkout");
  };

  return <form action={onCheckout}></form>;
};

export default Checkout;
