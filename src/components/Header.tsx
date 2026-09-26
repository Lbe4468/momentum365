import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <div className="container nav">
        <Link href="/">
<Image
  className="nav-logo"
  src="/velorapartners-nav-logo.png"
  alt="Velora Partners"
  width={56}
  height={56}
  priority
/>
        </Link>
        <nav className="nav-links">
          <a href="/#membership">Membership</a>
          <a href="/#opportunities">Opportunities</a>
          <a href="/#about">About</a>
          <Link href="/login">Member Login</Link>
          <Link className="btn btn-primary" href="/apply">Apply For Membership</Link>
        </nav>
      </div>
    </header>
  );
}