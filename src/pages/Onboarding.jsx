import React from 'react'
import { defineStepper } from "@stepperize/react";
import { motion, AnimatePresence } from 'framer-motion';
export const Home = () => {
  const { useStepper, steps, utils } = defineStepper(
    { id: 'shipping', title: 'Shipping', description: 'Enter your shipping details' },
    { id: 'payment', title: 'Payment', description: 'Enter your payment details' },
    { id: 'complete', title: 'Complete', description: 'Checkout complete' }
  );

  const variants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

 const stepper = useStepper();
  const currentIndex = utils.getIndex(stepper.current.id);

  return (
    <div className="space-y-6 p-6 border rounded-lg w-96 mx-auto mt-10">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium">Checkout</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          Step {currentIndex + 1} of {steps.length}
        </div>
      </div>

      <nav aria-label="Checkout Steps" className="my-4">
        <ol className="flex items-center justify-between gap-2" aria-orientation="horizontal">
          {stepper.all.map((step, index, array) => (
            <React.Fragment key={step.id}>
              <li className="flex items-center gap-2">
                <button
                  type="button"
                  role="tab"
                  aria-current={stepper.current.id === step.id ? 'step' : undefined}
                  aria-posinset={index + 1}
                  aria-setsize={steps.length}
                  aria-selected={stepper.current.id === step.id}
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-colors duration-300 $
                    index <= currentIndex ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                  `}
                  onClick={() => stepper.goTo(step.id)}
                >
                  {index + 1}
                </button>
                <span className="text-sm font-medium">{step.title}</span>
              </li>
              {index < array.length - 1 && (
                <div className={`flex-1 h-1 rounded transition-colors duration-300 $
                  index < currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                `} />
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>

      <div className="relative h-64">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={stepper.current.id}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {stepper.switch({
              shipping: () => <ShippingComponent />, 
              payment: () => <PaymentComponent />, 
              complete: () => <CompleteComponent />
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-4">
        {!stepper.isLast ? (
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
              onClick={stepper.prev}
              disabled={stepper.isFirst}
            >
              Back
            </button>
            <button
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              onClick={stepper.next}
            >
              Next
            </button>
          </div>
        ) : (
          <button
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
            onClick={stepper.reset}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

const ShippingComponent = () => (
  <div className="grid gap-4">
    <div className="grid gap-2">
      <label htmlFor="name" className="text-sm font-medium">Name</label>
      <input id="name" placeholder="John Doe" className="w-full px-3 py-2 border rounded" />
    </div>
    <div className="grid gap-2">
      <label htmlFor="address" className="text-sm font-medium">Address</label>
      <textarea id="address" placeholder="123 Main St, Anytown USA" className="w-full px-3 py-2 border rounded" />
    </div>
  </div>
);

const PaymentComponent = () => (
  <div className="grid gap-4">
    <div className="grid gap-2">
      <label htmlFor="card-number" className="text-sm font-medium">Card Number</label>
      <input id="card-number" placeholder="4111 1111 1111 1111" className="w-full px-3 py-2 border rounded" />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="grid gap-2">
        <label htmlFor="expiry-date" className="text-sm font-medium">Expiry Date</label>
        <input id="expiry-date" placeholder="MM/YY" className="w-full px-3 py-2 border rounded" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="cvc" className="text-sm font-medium">CVC</label>
        <input id="cvc" placeholder="123" className="w-full px-3 py-2 border rounded" />
      </div>
    </div>
  </div>
);

const CompleteComponent = () => (
  <h3 className="text-lg py-4 font-medium">Stepper complete 🔥</h3>
);


