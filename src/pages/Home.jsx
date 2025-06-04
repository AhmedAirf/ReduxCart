/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, addToCart } from "../redux/slices/productSlice";
import {
  Box,
  Image,
  Text,
  Heading,
  Stack,
  Button,
  Badge,
} from "@chakra-ui/react";

const Home = () => {
  const { products, productsLoading, cart } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (productsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 w-full">
      <div className="w-full mb-12">
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-8 rounded-xl shadow-xl mb-8 text-4xl md:text-5xl">
          <h1 className="text-center text-white  font-bold">Our Products</h1>
          <p className="text-center text-teal-100 mt-2 text-2xl">
            {cart.length} items in your cart
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <Box
            key={product.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            className="bg-white hover:shadow-xl transition-shadow"
          >
            <div className="relative aspect-square">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center">
                  ⭐ {product.rating?.rate || "4.5"}
                </span>
              </div>
            </div>

            <Box p="6">
              <Stack spacing="3">
                <Heading size="md" noOfLines={1}>
                  {product.title}
                </Heading>
                <Text noOfLines={2} color="gray.600">
                  {product.description}
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="teal.600">
                  ${product.price}
                </Text>
              </Stack>

              <Button
                colorScheme="teal"
                variant="solid"
                width="full"
                mt="4"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default Home;
