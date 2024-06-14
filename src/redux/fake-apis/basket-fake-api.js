import { v4 as uuid } from "uuid";

const fake_data = {
  userId: "663a699dd33ee70c56568ab2",
  items: [
    {
      product: {
        id: uuid(),
        name: "Laptop Asus Vivobook Go 15 E1504FA-NJ454W (AMD Ryzen 5-7520U) (Bạc)",
        description: "Best laptop 2021",
        images: [
          "https://res.cloudinary.com/dumhujhqd/image/upload/v1713612878/digitalmart/asus2_ctgl54.webp",
          "https://res.cloudinary.com/dumhujhqd/image/upload/v1713612881/digitalmart/asus3_adhhpi.webp",
          "https://res.cloudinary.com/dumhujhqd/image/upload/v1713612951/digitalmart/asus4_ykoqg9.webp",
        ],
        brand: "Asus",
        category: "6618b84bcd5cd09ccb5cf52a",
        metadata: {
          key1: "value1",
          key2: "value2",
        },
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
        description: "Best laptop 2021",
        brand: "Asus",
        category: "6618b84bcd5cd09ccb5cf52a",
        metadata: {
          key1: "value1",
          key2: "value2",
        },
        price: 12490000,
      },
      quantity: 2,
    },
  ],
  totalPrice: 5 * 12490000,
};
export const getBasketFake = () => {
  return fake_data;
};

export const updateBasketFake = (newItems) => {
  fake_data.items = newItems;
  fake_data.totalPrice = fake_data.items.reduce(
    (total, item) => (total += item.product.price * item.quantity),
    0
  );
  return fake_data;
};
