import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
               <div className="mobile-header-365"><span>Momentum </span><span className="header-365">365</span></div>
              <div className="eyebrow-private"><span>Private Membership</span> • <span>Curated Opportunities</span></div>
              <h1 className="h1-mobile">Build today.<br /><span>Grow tomorrow.</span></h1>
              <p>
                Momentum 365 is a private member&apos;s association designed to give members
                access to curated financial opportunities and a more intentional path toward growth.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/apply">Apply For Membership</Link>
                <a className="btn btn-ghost" href="#membership">Explore Membership</a>
              </div>
            </div>
            <div className="hero-card">
<Image
  className="hero-logo"
  src="/momentum365-hero.png"
  alt="Momentum 365 logo"
  width={1134}
  height={1093}
  priority
/>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">Momentum 365</div>
              <h2>A more deliberate approach to opportunity.</h2>
              <p>
                Membership is built around access, curation, and relationships. The experience is
                designed to give members a focused environment in which financial opportunities can be evaluated.
              </p>
            </div>
          </div>
        </section>

        <section className="section section-alt" id="membership">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">The Membership</div>
              <h2>Access with intention.</h2>
              <p>
                Momentum 365 brings together a private membership experience with curated opportunities,
                information, and resources.
              </p>
            </div>
            <div className="cards">
              <article className="card">
                <div className="card-number">01 / CURATION</div>
                <h3>Curated Opportunities</h3>
                <p>Members can explore opportunities selected for consideration through the Momentum 365 network.</p>
              </article>
              <article className="card">
                <div className="card-number">02 / ACCESS</div>
                <h3>Private Access</h3>
                <p>A member-focused environment designed around thoughtful access rather than a public marketplace.</p>
              </article>
              <article className="card">
                <div className="card-number">03 / GROWTH</div>
                <h3>Long-Term Momentum</h3>
                <p>A platform intended to evolve with its members as new opportunities and resources are introduced.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="opportunities">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">Opportunities</div>
              <h2>Discover what comes next.</h2>
              <p>
                The member portal will ultimately provide a secure destination for reviewing available
                opportunities, member resources, documents, and future membership services.
              </p>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container cta-inner">
            <div>
              <h2>Request membership.</h2>
              <p>Anyone may apply. Applications are reviewed before membership is granted.</p>
            </div>
            <Link className="btn btn-primary" href="/apply">Apply For Membership</Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Momentum 365. All rights reserved.</span>
          <span>Private Member&apos;s Association</span>
        </div>
      </footer>
    </>
  );
}