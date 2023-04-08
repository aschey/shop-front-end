import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CartContext from "../../contexts/cart/CartContext";

enum CheckoutStatus {
  Success = "success",
  Cancel = "cancel",
}
const Checkout = () => {
  const { clearCart } = useContext(CartContext);
  const [sysMsgHeader, setsysMsgHeader] = useState<React.ReactNode | undefined>(
    undefined
  );
  const [bodyContent, setBodyContent] = useState<React.ReactNode | undefined>(
    undefined
  );

  const { checkoutStatus } = useParams<{
    checkoutStatus: CheckoutStatus;
  }>();

  useEffect(() => {
    let sysMsgHeader: React.ReactNode | undefined;
    let bodyContent: React.ReactNode | undefined;
    if (checkoutStatus === "success") {
      sysMsgHeader = (
        <>
          <p>Nazdrave!🥂</p>
          <p>Thank You For Your Purchase</p>
        </>
      );

      bodyContent = (
        <div className="flex flex-col items-center py-10">
          <p>
            Your order is being prepared and will be shipped as soon as
            possible!
          </p>
          <p>Be on the lookout for a confirmation email for your purchase</p>
          <Link to="/shop" className="rounded-md px-3 py-2 text-lg font-medium">
            Click Here to Continue Shopping
          </Link>
        </div>
      );
      //clear cart
      clearCart();
    } else if (checkoutStatus === "cancel") {
      sysMsgHeader = (
        <>
          <p>Checkout Session Unsuccessful</p>
          <p>Please try again!</p>
        </>
      );
      bodyContent = (
        <div className="flex flex-col items-center">
          <p>Click below to return to cart</p>
          <Link to="/cart" className="rounded-md px-3 py-2 text-lg font-medium">
            Go To Cart 🛒
          </Link>
        </div>
      );
    }
    setsysMsgHeader(sysMsgHeader);
    setBodyContent(bodyContent);
  }, [checkoutStatus]);

  return (
    <>
      <section className="w-full bg-secondary-900 pt-48 pb-28 dark:bg-gray-900 lg:pt-14">
        <div className="mx-auto max-w-screen-md py-8 px-4 sm:py-16 lg:px-6">
          <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-200 dark:text-white">
            {sysMsgHeader}
          </h2>
        </div>
      </section>
      <section className="w-full bg-secondary-50 dark:bg-gray-900">
        <div className="container mx-auto flex h-auto min-h-[70vh] max-w-screen-xl justify-center p-4 lg:p-6">
          {bodyContent}
        </div>
      </section>
    </>
  );
};

export default Checkout;
