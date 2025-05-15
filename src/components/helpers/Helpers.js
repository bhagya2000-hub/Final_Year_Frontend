export const getPriceQueryParams=(searchParams,key,value)=>{

    const hasValueParams=searchParams.has(key);

    if (value && hasValueParams){
        searchParams.set(key,value)

    }else if(value){
        searchParams.append(key,value)
    }else if(hasValueParams){
        searchParams.delete(key)
    }
    return searchParams;
};

export const caluculateOrderCost=(cartItems)=>{
    const itemPrice= cartItems?.reduce(
        (acc, item) => acc + item.quantity * item.price, 0);
    
    const shippingPrice=itemPrice > 200 ? 0 : 10;

    const taxtPrice=Number((0.15 * itemPrice).toFixed(2));

    const totalPrice=(itemPrice + shippingPrice + taxtPrice).toFixed(2);
    return {itemPrice:Number(itemPrice.toFixed(2))
        ,shippingPrice,
        taxtPrice,
        totalPrice};

}