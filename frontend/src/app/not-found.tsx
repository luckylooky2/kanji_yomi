import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <div>
        <Image src="/404.jpg" width="350" height="225" alt="not found" />
        <h1>Page Not Found</h1>
      </div>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
