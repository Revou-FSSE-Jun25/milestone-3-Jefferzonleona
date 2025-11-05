// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

type Product = {
  id: string;
  title: string;
  price: number;
  category?: string;
  description?: string;
  image?: string;
};

// in-memory store (dev only)
let products: Product[] = [
  { id: "1", title: "Kaos Revo", price: 25, category: "Fashion", description: "Kaos keren", image: "" },
  { id: "2", title: "Topi Coding", price: 15, category: "Aksesoris", description: "Topi", image: "" },
];

const productSchema = z.object({
  title: z.string().min(1),
  price: z.number().positive(),
  category: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
});

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  // only admin
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const payload = productSchema.parse(body);
    const newProduct: Product = { id: Date.now().toString(), ...payload };
    products.push(newProduct);
    // trigger ISR revalidate for home page
    try { revalidatePath("/"); } catch {}
    return NextResponse.json(newProduct, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Invalid payload" }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const id = body.id as string;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const payload = productSchema.parse(body);
    products = products.map((p) => (p.id === id ? { ...p, ...payload } : p));
    try { revalidatePath("/"); } catch {}
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Invalid" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id } = await req.json();
    products = products.filter((p) => p.id !== id);
    try { revalidatePath("/"); } catch {}
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Invalid" }, { status: 400 });
  }
}
