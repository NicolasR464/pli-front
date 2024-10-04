/* eslint-disable unicorn/numeric-separators-style */
export const articles = [
    {
        id: {
            $oid: '66c89c196777c169ce469991',
        },
        version: 1,
        owner: {
            $oid: '66c89c196777c169ce469998', // Référence à l'utilisateur propriétaire
        },
        adTitle: 'iPhone 12 Pro',
        brand: 'Apple',
        model: 'A2341',
        description: 'iPhone 12 Pro, 128GB, Graphite',
        price: 950,
        manufactureDate: {
            $date: '2021-01-01T00:00:00Z',
        },
        purchaseDate: {
            $date: '2021-02-15T00:00:00Z',
        },
        state: 'Used',
        status: 'Available',
        imageUrls: [
            'https://example.com/images/iphone12pro-front.png',
            'https://example.com/images/iphone12pro-back.png',
        ],
        createdAt: {
            $date: '2023-10-01T10:00:00Z',
        },
        lastModified: {
            $date: '2023-10-03T12:00:00Z',
        },
        category: 'Electronics',
        subCategory: 'Smartphones',
        deliveryType: ['Shipping', 'Pickup'],
        dimensions: {
            length: 14.67,
            width: 7.15,
            height: 0.74,
            weight: 0.189,
        },
    },
    {
        id: {
            $oid: '66c89c196777c169ce469992',
        },
        version: 1,
        owner: {
            $oid: '66c89c196777c169ce469997', // Référence à un autre utilisateur propriétaire
        },
        adTitle: 'Samsung QLED TV',
        brand: 'Samsung',
        model: 'Q80T',
        description: '65-inch QLED 4K TV with HDR10+ support',
        price: 1200,
        manufactureDate: {
            $date: '2020-07-01T00:00:00Z',
        },
        purchaseDate: {
            $date: '2020-08-20T00:00:00Z',
        },
        state: 'New',
        status: 'Sold',
        imageUrls: [
            'https://example.com/images/samsung-qled-front.png',
            'https://example.com/images/samsung-qled-back.png',
        ],
        createdAt: {
            $date: '2023-09-25T10:00:00Z',
        },
        lastModified: {
            $date: '2023-09-30T12:00:00Z',
        },
        category: 'Home Appliances',
        subCategory: 'Television',
        deliveryType: ['Shipping'],
        dimensions: {
            length: 144.3,
            width: 83.2,
            height: 5.6,
            weight: 28.5,
        },
    },
    {
        id: {
            $oid: '66c89c196777c169ce469993',
        },
        version: 1,
        owner: {
            $oid: '66c89c196777c169ce469996', // Propriétaire différent
        },
        adTitle: 'Nike Air Max 270',
        brand: 'Nike',
        model: 'AR0344',
        description: 'Comfortable running shoes, black and white',
        price: 120,
        manufactureDate: {
            $date: '2022-03-15T00:00:00Z',
        },
        purchaseDate: {
            $date: '2022-05-05T00:00:00Z',
        },
        state: 'Used',
        status: 'Available',
        imageUrls: [
            'https://example.com/images/nike-airmax-front.png',
            'https://example.com/images/nike-airmax-back.png',
        ],
        createdAt: {
            $date: '2023-07-20T10:00:00Z',
        },
        lastModified: {
            $date: '2023-07-25T12:00:00Z',
        },
        category: 'Clothing',
        subCategory: 'Shoes',
        deliveryType: ['Pickup'],
        dimensions: {
            length: 29.0,
            width: 11.0,
            height: 13.0,
            weight: 0.5,
        },
    },
    {
        id: {
            $oid: '66c89c196777c169ce469994',
        },
        version: 1,
        owner: {
            $oid: '66c89c196777c169ce469995', // Propriétaire différent
        },
        adTitle: 'MacBook Pro 16"',
        brand: 'Apple',
        model: 'A2141',
        description: 'MacBook Pro 16-inch, 2.6GHz 6-core i7, 16GB RAM, 512GB SSD',
        price: 2400,
        manufactureDate: {
            $date: '2021-04-10T00:00:00Z',
        },
        purchaseDate: {
            $date: '2021-06-01T00:00:00Z',
        },
        state: 'Like New',
        status: 'Available',
        imageUrls: [
            'https://example.com/images/macbook-pro-front.png',
            'https://example.com/images/macbook-pro-back.png',
        ],
        createdAt: {
            $date: '2023-10-01T10:00:00Z',
        },
        lastModified: {
            $date: '2023-10-03T12:00:00Z',
        },
        category: 'Electronics',
        subCategory: 'Computers',
        deliveryType: ['Shipping', 'Pickup'],
        dimensions: {
            length: 35.79,
            width: 24.59,
            height: 1.62,
            weight: 2.0,
        },
    },
    {
        id: {
            $oid: '66c89c196777c169ce469995',
        },
        version: 1,
        owner: {
            $oid: '66c89c196777c169ce469994', // Propriétaire différent
        },
        adTitle: 'Couch Sofa 3-Seater',
        brand: 'IKEA',
        model: 'EKTORP',
        description: 'Comfortable 3-seater couch with removable covers',
        price: 350,
        manufactureDate: {
            $date: '2020-11-01T00:00:00Z',
        },
        purchaseDate: {
            $date: '2020-12-15T00:00:00Z',
        },
        state: 'Good',
        status: 'Available',
        imageUrls: [
            'https://example.com/images/sofa-front.png',
            'https://example.com/images/sofa-back.png',
        ],
        createdAt: {
            $date: '2023-09-15T10:00:00Z',
        },
        lastModified: {
            $date: '2023-09-20T12:00:00Z',
        },
        category: 'Furniture',
        subCategory: 'Sofas',
        deliveryType: ['Shipping', 'Pickup'],
        dimensions: {
            length: 220.0,
            width: 90.0,
            height: 75.0,
            weight: 35.0,
        },
    },
];
