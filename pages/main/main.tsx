import React from 'react';
const SuperMarket = () =>{
   return(
       <div className="MarketTemplate">
           <div className="Market">
               <div className="products-wrapper">
                   <h2>판매상품</h2>
                   {/* ProductList */}
               </div>
               <div className="basket-wrapper">
                   <h2>장바구니</h2>
                   {/* BasketList */}
               </div>
           </div>
           <div className="AddProduct">
               <h4>add</h4>
               {/* addProduct */}
           </div>
       </div>
   )
}

export default SuperMarket;