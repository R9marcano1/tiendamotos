"use client";
import Link from "next/link";
import { useStore } from "../context/StoreProvider";

export default function CartWidget() {
  const { cart } = useStore();
  const totalItems = cart.reduce((s, p) => s + (p.qty || 1), 0);

  return (
    <Link href="/checkout" className="relative inline-block">
      <span className="text-xl">🛒</span>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-500 text-xs rounded-full px-2">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
