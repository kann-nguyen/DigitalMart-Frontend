import {v4 as uuid} from "uuid"
import {faker} from "@faker-js/faker";
import {categories} from './category-fake-api';

export const getProducts = () => {
    const products = [];
    for(let i = 1; i <= 20; i++){
        products.push({
            id: uuid(),
            name: "Laptop Asus Vivobook Go 15 E1504FA-NJ454W (AMD Ryzen 5-7520U) (Bạc)",
            description: faker.commerce.productDescription(),
            price: 12490000,
            images: [
                "https://res.cloudinary.com/dumhujhqd/image/upload/v1713612878/digitalmart/asus2_ctgl54.webp",
                "https://res.cloudinary.com/dumhujhqd/image/upload/v1713612881/digitalmart/asus3_adhhpi.webp",
                "https://res.cloudinary.com/dumhujhqd/image/upload/v1713612951/digitalmart/asus4_ykoqg9.webp"
            ],
            brand: "Asus",
            stock: 1000, 
            category: categories[Math.floor(Math.random() * categories.length)],
            metadata: {
                "Bảo hành": "24 tháng",
                "Mô tả bảo hành": "Bảo hành Pin 12 tháng",
                "Series laptop": "Vivo Book",
                "Màu sắc": "Bạc",
                "Nhu cầu": "Văn phòng",
                "Thế hệ CPU": "Ryzen 5, AMD",
                "CPU": "AMD Ryzen 5 7520U (2,8 GHz - 4,3 GHz / 4MB/4 nhân, 8 luồng)",
                "Chip đồ họa": "Onboard AMD Radeon 610M",
                "RAM": "16GB Onboard LPDDR5 5500MHz",
                "Màn hình": `15.6 ( 1920 x 1080 ) Full HD không cảm ứng , HD webcam`,
                "Lưu trữ": "512GB SSD M.2 NVMe",
                "Kích thước": "36.03 x 23.25 x 1.79 cm"
            }
        });
    }
    return products;
};
