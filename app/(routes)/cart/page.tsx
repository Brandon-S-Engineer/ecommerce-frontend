'use client';

import { Suspense } from 'react';
import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';

import CarItem from './components/cart-item';
import Summary from './components/summary';

const CartPageContent = () => {
  const cart = useCart();

  return (
    <div className='bg-white'>
      <Container>
        <div className='px-4 py-16 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-black'>Shopping Cart</h1>
          <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12'>
            <div className='lg:col-span-7'>
              {cart.items.length === 0 && <p className='text-neutral-500 font-bold'>Your cart is empty.</p>}
              <ul>
                {cart.items.map((item) => (
                  <CarItem
                    key={item.id}
                    data={item}
                  />
                ))}
              </ul>
            </div>

            <Suspense fallback={<div>Loading summary...</div>}>
              <Summary />
            </Suspense>
          </div>
        </div>
      </Container>
    </div>
  );
};

const CartPage = () => (
  <Suspense fallback={<div>Loading cart...</div>}>
    <CartPageContent />
  </Suspense>
);

export default CartPage;

// 'use client';

// import Container from '@/components/ui/container';
// import useCart from '@/hooks/use-cart';

// import CarItem from './components/cart-item';
// import Summary from './components/summary';

// const CartPage = () => {
//   const cart = useCart();

//   return (
//     <div className='bg-white'>
//       <Container>
//         <div className='px-4 py-16 sm:px-6 lg:px-8'>
//           <h1 className='text-3xl font-bold text-black'>Shopping Cart</h1>

//           <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12'>
//             <div className='lg:col-span-7'>
//               {cart.items.length === 0 && <p className='text-neutral-500 font-bold'>Your cart is empty.</p>}
//               <ul>
//                 {cart.items.map((item) => (
//                   <CarItem
//                     key={item.id}
//                     data={item}
//                   />
//                 ))}
//               </ul>
//             </div>

//             <Summary />
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default CartPage;
