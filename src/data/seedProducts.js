export const products = [
  {
    name: "Classic White T-Shirt",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Black T-shirt",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  },
  {
    name: "Blue Denim Jeans",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800&auto=format&fit=crop",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
  },
  {
    name: "Running Sneakers",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Leather Jacket",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "Baseball Cap",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800&auto=format&fit=crop",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    name: "Backpack",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1509762774605-f07235a08f1f?q=80&w=800&auto=format&fit=crop",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.",
  },
  {
    name: "Sunglasses",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit.",
  },
  {
    name: "Wrist Watch",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident.",
  },
];

const now = new Date();

export const orders = [
  {
    amount: 59600,
    createdAt: new Date("2026-05-06T18:01:42+10:00"),
    createdBy: "guest",
    currency: "sek",
    customer: {
      email: "anna@test.se",
      name: "Anna Svensson",
      phone: null,
    },
    expiresAt: new Date("2026-05-06T18:31:42+10:00"),
    items: [
      {
        id: "p1",
        name: "Classic White T-Shirt",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
        price: 199,
        quantity: 2,
        total: 398,
      },
      {
        id: "p6",
        name: "Baseball Cap",
        image:
          "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800&auto=format&fit=crop",
        price: 149,
        quantity: 1,
        total: 149,
      },
    ],
    shippingAddress: {
      city: "Stockholm",
      country: "SE",
      line1: "Storgatan 1",
      line2: null,
      name: "Anna Svensson",
      postalCode: "11122",
      state: null,
    },
    status: "paid",
    stripeSessionId: "cs_test_anna123",
    totalAmount: 547,
  },

  {
    amount: 104600,
    createdAt: new Date("2026-05-05T14:20:00+10:00"),
    createdBy: "guest",
    currency: "sek",
    customer: {
      email: "erik@test.se",
      name: "Erik Larsson",
      phone: "0701234567",
    },
    expiresAt: new Date("2026-05-05T14:50:00+10:00"),
    items: [
      {
        id: "p2",
        name: "Black Hoodie",
        image:
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop",
        price: 499,
        quantity: 1,
        total: 499,
      },
      {
        id: "p8",
        name: "Sunglasses",
        image:
          "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
        price: 249,
        quantity: 2,
        total: 498,
      },
    ],
    shippingAddress: {
      city: "Göteborg",
      country: "SE",
      line1: "Kungsgatan 12",
      line2: null,
      name: "Erik Larsson",
      postalCode: "41115",
      state: null,
    },
    status: "processing",
    stripeSessionId: "cs_test_erik456",
    totalAmount: 997,
  },

  {
    amount: 154800,
    createdAt: new Date("2026-05-04T10:00:00+10:00"),
    createdBy: "guest",
    currency: "sek",
    customer: {
      email: "lisa@test.se",
      name: "Lisa Berg",
      phone: null,
    },
    expiresAt: new Date("2026-05-04T10:30:00+10:00"),
    items: [
      {
        id: "p5",
        name: "Leather Jacket",
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
        price: 1499,
        quantity: 1,
        total: 1499,
      },
    ],
    shippingAddress: {
      city: "Malmö",
      country: "SE",
      line1: "Bergsgatan 5",
      line2: null,
      name: "Lisa Berg",
      postalCode: "21422",
      state: null,
    },
    status: "shipped",
    stripeSessionId: "cs_test_lisa789",
    totalAmount: 1499,
  },

  {
    amount: null,
    createdAt: new Date("2026-05-03T09:00:00+10:00"),
    createdBy: "guest",
    currency: "sek",
    customer: {
      email: null,
      name: null,
      phone: null,
    },
    expiresAt: new Date("2026-05-03T09:30:00+10:00"),
    items: [
      {
        id: "p3",
        name: "Blue Denim Jeans",
        image:
          "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800&auto=format&fit=crop",
        price: 699,
        quantity: 2,
        total: 1398,
      },
    ],
    status: "pending",
    totalAmount: 1398,
  },

  {
    amount: 134700,
    createdAt: new Date("2026-05-02T16:00:00+10:00"),
    createdBy: "guest",
    currency: "sek",
    customer: {
      email: "jonas@test.se",
      name: "Jonas Nilsson",
      phone: "0705551111",
    },
    expiresAt: new Date("2026-05-02T16:30:00+10:00"),
    items: [
      {
        id: "p4",
        name: "Running Sneakers",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
        price: 899,
        quantity: 1,
        total: 899,
      },
      {
        id: "p7",
        name: "Backpack",
        image:
          "https://images.unsplash.com/photo-1509762774605-f07235a08f1f?q=80&w=800&auto=format&fit=crop",
        price: 399,
        quantity: 1,
        total: 399,
      },
    ],
    shippingAddress: {
      city: "Uppsala",
      country: "SE",
      line1: "Parkvägen 9",
      line2: null,
      name: "Jonas Nilsson",
      postalCode: "75320",
      state: null,
    },
    status: "paid",
    stripeSessionId: "cs_test_jonas111",
    totalAmount: 1298,
  },

  {
    amount: 129700,
    createdAt: new Date("2026-05-01T12:00:00+10:00"),
    createdBy: "guest",
    currency: "sek",
    customer: {
      email: "maria@test.se",
      name: "Maria Ek",
      phone: "0702223333",
    },
    expiresAt: new Date("2026-05-01T12:30:00+10:00"),
    items: [
      {
        id: "p9",
        name: "Wrist Watch",
        image:
          "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop",
        price: 999,
        quantity: 1,
        total: 999,
      },
      {
        id: "p8",
        name: "Sunglasses",
        image:
          "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
        price: 249,
        quantity: 1,
        total: 249,
      },
    ],
    shippingAddress: {
      city: "Västerås",
      country: "SE",
      line1: "Lindgatan 3",
      line2: null,
      name: "Maria Ek",
      postalCode: "72210",
      state: null,
    },
    status: "paid",
    stripeSessionId: "cs_test_maria222",
    totalAmount: 1248,
  },

  {
    amount: null,
    createdAt: new Date("2026-04-30T11:00:00+10:00"),
    createdBy: "guest",
    currency: "sek",
    customer: {
      email: "kalle@test.se",
      name: "Kalle Persson",
      phone: null,
    },
    expiresAt: new Date("2026-04-30T11:30:00+10:00"),
    items: [
      {
        id: "p2",
        name: "Black Hoodie",
        image:
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop",
        price: 499,
        quantity: 3,
        total: 1497,
      },
    ],
    status: "cancelled",
    totalAmount: 1497,
  },

  {
    amount: 114500,
    createdAt: new Date("2026-04-29T15:00:00+10:00"),
    createdBy: "guest",
    currency: "sek",
    customer: {
      email: "sofia@test.se",
      name: "Sofia Lund",
      phone: "0704445555",
    },
    expiresAt: new Date("2026-04-29T15:30:00+10:00"),
    items: [
      {
        id: "p7",
        name: "Backpack",
        image:
          "https://images.unsplash.com/photo-1509762774605-f07235a08f1f?q=80&w=800&auto=format&fit=crop",
        price: 399,
        quantity: 2,
        total: 798,
      },
      {
        id: "p6",
        name: "Baseball Cap",
        image:
          "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800&auto=format&fit=crop",
        price: 149,
        quantity: 2,
        total: 298,
      },
    ],
    shippingAddress: {
      city: "Örebro",
      country: "SE",
      line1: "Skolgatan 8",
      line2: null,
      name: "Sofia Lund",
      postalCode: "70212",
      state: null,
    },
    status: "delivered",
    stripeSessionId: "cs_test_sofia333",
    totalAmount: 1096,
  },
];
