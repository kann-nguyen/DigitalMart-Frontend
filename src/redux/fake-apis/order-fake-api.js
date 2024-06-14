import { v4 as uuid } from "uuid";

const fake_order = {
  userId: uuid(),
  userName: "James Smith",
  items: [
    {
      product: {
        id: uuid(),
        name: "Laptop Asus Vivobook Go 15 E1504FA-NJ454W (AMD Ryzen 5-7520U) (Bạc)",
        images: [
          "https://res.cloudinary.com/dumhujhqd/image/upload/v1713612878/digitalmart/asus2_ctgl54.webp",
          "https://res.cloudinary.com/dumhujhqd/image/upload/v1713612881/digitalmart/asus3_adhhpi.webp",
          "https://res.cloudinary.com/dumhujhqd/image/upload/v1713612951/digitalmart/asus4_ykoqg9.webp",
        ],
        price: 12490000,
      },
      quantity: 3,
    },
    {
      product: {
        id: uuid(),
        name: "Laptop Asus Vivobook Go 15 E1504FA-NJ454W (AMD Ryzen 5-7520U) (Bạc)",
        images: [
          "https://res.cloudinary.com/dumhujhqd/image/upload/v1713612878/digitalmart/asus2_ctgl54.webp",
          "https://res.cloudinary.com/dumhujhqd/image/upload/v1713612881/digitalmart/asus3_adhhpi.webp",
          "https://res.cloudinary.com/dumhujhqd/image/upload/v1713612951/digitalmart/asus4_ykoqg9.webp",
        ],
        price: 12490000,
      },
      quantity: 2,
    },
  ],
  totalPrice: 5 * 12490000,
  createdAt: "01-01-2024",
  address: "600 Harrison St, San Francisco, US",
  paymentMethod: "Cash On Delivery",
  cardNumber: "XX-XXXX-XXXX",
};

const fake_all_order = [
  {
    orderId: "123456789",
    orderDetails: fake_order,
  },
  {
    orderId: "888888888",
    orderDetails: fake_order,
  },
];

export const getOrder = () => {
  return fake_order;
};

export const updateOrderFake = (newOrder) => {
  fake_order.userName = newOrder.userName;
  fake_order.items = newOrder.items;
  fake_order.totalPrice = newOrder.totalPrice;
  fake_order.createdAt = newOrder.createdAt;
  fake_order.address = newOrder.address;
  fake_order.paymentMethod = newOrder.paymentMethod;
  fake_order.cardNumber = newOrder.cardNumber;
  return fake_order;
};

export const getAllFakeOrder = () => {
  return fake_all_order;
};
