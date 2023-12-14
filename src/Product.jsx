import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

const Product = () => {
  const params = useParams();

  // useMutation
  const mutation = useMutation(
    // Instead of an object, pass a function that returns the promise
    (newProduct) =>
      axios.put(
        `https://dummyjson.com/products/${params.productId}`,
        newProduct
      )
  );

  const fetchProducts = async () => {
    const response = await fetch(
      `https://dummyjson.com/products/${params.productId}`
    );
    const data = await response.json();
    return data;
  };

  const {
    isLoading,
    error,
    data: product,
  } = useQuery(["products", params.productId], fetchProducts);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>Error: {error.message}</h3>;
  }

  return (
    <div>
      <div>Product: {product.title}</div>
      <div>
        {mutation.isLoading ? (
          "Updating product..."
        ) : (
          <>
            {mutation.isError ? (
              <div>An error occurred: {mutation.error.message}</div>
            ) : null}

            {mutation.isSuccess ? <div>Product updated!</div> : null}
            <button
              onClick={() => {
                mutation.mutate({ title: "Updated Product" });
              }}
            >
              Update Product
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Product;
