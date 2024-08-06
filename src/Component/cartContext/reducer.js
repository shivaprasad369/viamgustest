
export default function CartReducer(state,action) {
    if(action.type==='ADD_TO_CART'){
        let {product,amt,id}=action.payload;
        // console.log(product,amt,id)
        let cartProduct;
     
        cartProduct={
            id:id,
            productId:product[0].productId,
            name:product[0].heading,
            price:product[0].price,
            image:product[0].image1,
            quantity:amt,
            total:Number(product[0].price)*Number(amt),
            max:10,
        }

        // console.log(cartProduct)
        return{
            ...state,
            // cart:[...state.cart,cartProduct]
            cart:[cartProduct]
        }
    }
    if(action.type==='REMOVE')
    {
        let {id}=action.payload;
        let newCart=state.cart.filter((item)=>item.id!==id)
        console.log(newCart)
        localStorage.setItem('cart',[])
        return{
           ...state,
            cart:[]
        }
    }
  return state;
}
