import { useFetchProductsQuery } from "../store/services/productAPI";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, removeFromCart, addToCart } from "../store/slices/productSlice";
import { useEffect } from "react";

export default function Products() {
  const dispatch = useDispatch();
  const { isLoading, error, data } = useFetchProductsQuery();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (data) dispatch(setProducts(data.products));
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      {products?.map((product) => {
        return( 
        <div>
            {product.title}
            <button onClick={() => dispatch(removeFromCart(product))}>-</button>
            <button onClick={() => dispatch(addToCart(product))}>+</button>
        </div>
    );
      })}
    </div>
  );
}
