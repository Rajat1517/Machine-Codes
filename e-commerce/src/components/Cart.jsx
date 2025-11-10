import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/slices/productSlice";

function Cart() {
  const { cart } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const total = Object.values(cart).reduce((acc, item) => {
    return acc += item?.product?.price* item?.count;
  }, 0);

  return (
    <div>
      <p>{total} Cart Balance</p>
      {Object.values(cart)?.map(({product}) => {
        return (
          <div>
            {product?.title}
            <button onClick={() => dispatch(removeFromCart(product))}>-</button>
            <button onClick={() => dispatch(addToCart(product))}>+</button>
          </div>
        );
      })}
    </div>
  );
}

export default Cart;
