import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="text-2xl font-extrabold text-green-700">
          E-Bazar
        </Link>

        <input
          type="search"
          placeholder="Search for products..."
          className="hidden flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-green-600 focus:bg-white sm:block"
        />

        <nav className="ml-auto flex items-center gap-5 text-sm font-medium text-gray-700">
          <Link href="/login" className="hover:text-green-700">
            Login
          </Link>
          <Link
            href="/cart"
            className="rounded-full bg-green-700 px-4 py-2 text-white hover:bg-green-800"
          >
            🛒 Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}