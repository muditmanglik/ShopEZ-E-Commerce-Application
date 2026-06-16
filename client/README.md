# 🛍️ Shop.EZ – Fashion-First E-commerce App

Shop.EZ is a fully responsive React-based e-commerce web app that offers a sleek and intuitive shopping experience. Built with a modern stack and clean UI, it fetches product data from the DummyJSON API and allows users to browse, filter, and manage a shopping cart in real-time.

🔗 Live Site: [shopping-cart-two-sooty.vercel.app](https://shopping-cart-two-sooty.vercel.app)  
📦 GitHub: [github.com/Soham-Powar/Shopping-Cart](https://github.com/Soham-Powar/Shopping-Cart)

---

## ✨ Features

- 🔍 Browse products across multiple categories
- 🛒 Add, remove, or update items in the cart
- 🧮 Live quantity adjustments and price calculations
- 📱 Fully responsive design  
- 🔁 Cart state is persisted using `localStorage`
- 🔄 Smooth navigation using `react-router-dom`
- ✅ Unit testing with `vitest` and `@testing-library/react`
- 💅 Styled with Tailwind CSS and custom fonts

---

## 📸 Preview

- [🖼️ Home Page](src/assets/home.png)
- [🛍️ Shop Page](src/assets/shop.png)
- [🛒 Cart Page](src/assets/cart.png)


## 🛠️ Tech Stack

| Tool                | Use                       |
|---------------------|---------------------------|
| **React**           | Frontend framework        |
| **Tailwind CSS**    | Styling                   |
| **React Router DOM**| Routing                   |
| **Lucide Icons**    | Icon set                  |
| **DummyJSON API**   | Fake product data         |
| **Vitest**          | Unit testing              |

---

## 🗂️ Folder Structure (Simplified)

```
Shopping-Cart/
├── src/
│   ├── assets/        # Images and media
│   ├── components/    # Reusable UI components
│   ├── pages/         # Route-level pages
│   ├── routes/        # React Router config
│   ├── styles/        # Global styles
│   ├── App.jsx        # Root component
│   └── main.jsx       # Entry point
├── tests/             # Unit tests
└── index.html
```


---

## 🧪 Testing

Tests are written using `vitest` and `@testing-library/react`.  
To run tests:

```bash
npm run test
````

---

## 🧾 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/Soham-Powar/Shopping-Cart.git
cd Shopping-Cart
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the dev server**

```bash
npm run dev
```

4. **Build for production**

```bash
npm run build
```

---

## 📦 API Used

**DummyJSON API**
URL: [https://dummyjson.com](https://dummyjson.com)

* `/products` for product listings
* `/products/categories` for dynamic filters
* `/products/:id` for product details

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---