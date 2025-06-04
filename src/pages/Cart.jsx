import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  deleteFromCart,
  clearCart,
} from "../redux/slices/productSlice";
import {
  Box,
  Text,
  Heading,
  Button,
  Stack,
  Image,
  Badge,
} from "@chakra-ui/react";

const Cart = () => {
  const { cart } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <Heading as="h1" size="xl" mb="6">
        Your Shopping Cart
      </Heading>

      {cart.length === 0 ? (
        <Box textAlign="center" py="10">
          <Text fontSize="xl">Your cart is empty</Text>
        </Box>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            {cart.map((item) => (
              <Box
                key={item.id}
                borderWidth="1px"
                borderRadius="lg"
                p="4"
                className="flex flex-col sm:flex-row gap-4"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  boxSize="100px"
                  objectFit="contain"
                />
                <div className="flex-1">
                  <Heading size="md">{item.title}</Heading>
                  <Text>
                    ${item.price} x {item.quantity}
                  </Text>
                  <Text fontWeight="bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </div>
                <Stack direction="row" spacing="2">
                  <Button
                    size="sm"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    -
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => dispatch(deleteFromCart(item.id))}
                    colorScheme="red"
                    variant="ghost"
                  >
                    Remove
                  </Button>
                  <Button size="sm" onClick={() => dispatch(addToCart(item))}>
                    +
                  </Button>
                </Stack>
              </Box>
            ))}
          </div>

          <Box borderWidth="1px" borderRadius="lg" p="4" className="bg-gray-50">
            <Heading size="md" mb="4">
              Order Summary
            </Heading>
            <div className="flex justify-between mb-2">
              <Text>Subtotal</Text>
              <Text>${totalPrice.toFixed(2)}</Text>
            </div>
            <div className="flex justify-between mb-4">
              <Text>Shipping</Text>
              <Text>Free</Text>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <Text>Total</Text>
              <Text>${totalPrice.toFixed(2)}</Text>
            </div>

            <Stack direction="row" spacing="4" mt="6">
              <Button
                colorScheme="red"
                variant="outline"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </Button>
              <Button colorScheme="teal" flex="1">
                Checkout
              </Button>
            </Stack>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Cart;
