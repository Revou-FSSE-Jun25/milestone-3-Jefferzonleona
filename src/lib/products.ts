// src/lib/products.ts
export type Product = {
  id: number | string;
  title: string;
  price: number;
  description?: string;
  image?: string;
  category?: string;
};

let products: Product[] = [
  { id: 1, title: "Kaos Revo", price: 25, description: "Kaos keren", image: "" },
  { id: 2, title: "Topi Coding", price: 15, description: "Topi", image: "" },
];

export function resetProducts() {
  products = [
    { id: 1, title: "Kaos Revo", price: 25, description: "Kaos keren", image: "" },
    { id: 2, title: "Topi Coding", price: 15, description: "Topi", image: "" },
  ];
}

export function getAll() {
  return [...products];
}

export function getById(id: number | string) {
  return products.find((p) => String(p.id) === String(id)) || null;
}

export function createProduct(payload: Omit<Product, "id">) {
  const newProduct: Product = { id: Date.now().toString(), ...payload };
  products.push(newProduct);
  return newProduct;
}

export function updateProduct(id: number | string, payload: Partial<Product>) {
  const idx = products.findIndex((p) => String(p.id) === String(id));
  if (idx === -1) return null;
  products[idx] = { ...products[idx], ...payload };
  return products[idx];
}

export function deleteProduct(id: number | string) {
  const before = products.length;
  products = products.filter((p) => String(p.id) !== String(id));
  return products.length < before;
}
