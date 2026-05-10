import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
