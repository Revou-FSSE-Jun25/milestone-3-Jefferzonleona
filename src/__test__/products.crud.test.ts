import { resetProducts, getAll, getById, createProduct, updateProduct, deleteProduct } from "../lib/products";

describe("products lib CRUD", () => {
  beforeEach(() => resetProducts());

  test("getAll returns initial list", () => {
    const all = getAll();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThan(0);
  });

  test("createProduct adds product", () => {
    const before = getAll().length;
    const created = createProduct({ title: "New", price: 99, description: "desc", image: "" });
    expect(created.id).toBeDefined();
    const after = getAll().length;
    expect(after).toBe(before + 1);
  });

  test("updateProduct modifies correct item", () => {
    const p = createProduct({ title: "U", price: 1, description: "x", image: "" });
    const updated = updateProduct(p.id, { price: 5, title: "U2" });
    expect(updated).not.toBeNull();
    expect(updated?.price).toBe(5);
    expect(getById(p.id)?.title).toBe("U2");
  });

  test("deleteProduct removes item", () => {
    const p = createProduct({ title: "ToDelete", price: 1, description: "", image: "" });
    const ok = deleteProduct(p.id);
    expect(ok).toBe(true);
    expect(getById(p.id)).toBeNull();
  });
});
