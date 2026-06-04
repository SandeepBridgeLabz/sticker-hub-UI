import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings";
import apiClient from "../apiClient";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

// With Loader
// Hooks
export default function Home() {
  const products = useLoaderData();
  return (
    <div className="max-w-[1152px] mx-auto px-6 py-8">
      <PageHeading title="Explore Eazy Stickers!">
        Add a touch of creativity to your space with our wide range of fun and
        unique stickers. Perfect for any occasion!
      </PageHeading>
      <ProductListings products={products} />
    </div>
  );
}

export async function productsLoader() {
  try {
    const response = await apiClient.get("/products"); // Axios GET Request
    return response.data;
  } catch (error) {
    throw new Response(
      error.message || "Failed to fetch products. Please try again.",
      { status: error.status || 500 }
    );
  }
}

// Without using loader || Normal way of showing data like error or loading
// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   //Run once when the component mounts
//   //Mounting is the process of creating and adding the component into DOM
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await apiClient.get("/products"); //Axios Get Request
//       setProducts(response.data); // set the products
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//           "Failed to fetch products. Please try again...",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center">
//         <span className="text-xl font-semibold">Loading products...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <span className="text-xl text-red-500">Error: {error}</span>
//       </div>
//     );
//   }
//   return (
//     <div className="home-container">
//       <PageHeading title="Explore Eazy Stickers">
//         Add a touch of creativity to your space with our wide range of fun and
//         unique stickers.Perfect for any occasions.
//       </PageHeading>

//       <ProductListings products={products} />
//     </div>
//   );
// }


