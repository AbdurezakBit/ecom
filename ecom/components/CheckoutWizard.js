import React from 'react'

function CheckoutWizard({activeStep = 0}) {
  return (
    <div className='mb-5 flex flex-wrap'>
        {
            ['User Login', 'Shipping Address', 'Payment Method', 'Place Order' ].map((step,index)=>(
                <div key={step} className = {`flex-1 border-b-2
                ${index <= activeStep ? 'border-indigo-200' : 'border-gray-300 text-gray-300'}`}>{step}</div>
            ))
        }
    </div>
  )
}

export default CheckoutWizard