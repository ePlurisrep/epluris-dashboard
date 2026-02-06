import Image from "next/image";
import Link from "next/link";
import VintageClient from "@/components/vintage/VintageClient";
import AggregatedDashboard from "@/components/AggregatedDashboard";
import VintageStyles from "@/components/vintage/VintageStyles";

export const metadata = {
  title: "Vintage Dashboard",
};

export default function Page() {
  return (
    <>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Special+Elite&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Old+Standard+TT:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>

      <main className="vintage-root">
        <header className="lettering-header">
          <div className="header-main">
            <div className="logo-container">
              <div className="main-logo">
                <Link href="/" className="flex items-center gap-3">
                  <Image src="/ePluris-logo.png" alt="ePluris logo" width={64} height={64} />
                  <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>ePluris</div>
                </Link>
              </div>
              <div className="logo-subtitle">PRACTICAL ANALYTICS</div>
            </div>

            <nav className="lettering-nav">
              <a href="#" className="nav-letter">
                A. DASHBOARD
              </a>
              <a href="#" className="nav-letter">
                B. ANALYTICS
              </a>
              <a href="#" className="nav-letter">
                C. REPORTS
              </a>
              <a href="#" className="nav-letter">
                D. SETTINGS
              </a>
            </nav>
          </div>

          <div className="decorative-rule" />

          <div style={{ textAlign: "center", fontFamily: "Libre Baskerville, serif", fontStyle: "italic", color: "var(--vintage-brown)" }}>
            FOR THE OFFICE & WORKSHOP • CONTAINING 12 COMPLETE DATA VIEWS
          </div>
        </header>

        <main className="dashboard-container">
          <h1 className="dashboard-title">PRACTICAL DATA LETTERING GUIDE</h1>

          <div className="lettering-grid">
            {/* Aggregated data widget */}
            <div className="guide-widget">
              <div className="widget-header">
                <div className="widget-letter">X</div>
                <h3 className="widget-title">Merged Data</h3>
              </div>

              <div className="widget-content">
                <div style={{ marginBottom: 10 }}>
                  {/* Aggregated dashboard component */}
                  {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                  <div>
                    {/* Render AggregatedDashboard */}
                    {/* We'll import it as a client component below in the file */}
                    <div id="aggregated-root">
                      <AggregatedDashboard />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Widgets A-D (shortened for brevity) */}
            <div className="guide-widget">
              <div className="widget-header">
                <div className="widget-letter">A</div>
                <h3 className="widget-title">System Performance</h3>
                <div className="widget-controls">
                  <button className="guide-btn" title="Expand">
                    <i className="fas fa-expand-alt" />
                  </button>
                  <button className="guide-btn" title="Settings">
                    <i className="fas fa-sliders-h" />
                  </button>
                </div>
              </div>
              <div className="widget-content">
                <p className="data-label">CPU Utilization:</p>
                <div className="guide-meter">
                  <div className="meter-fill" style={{ width: "78%" }} />
                  <div className="meter-label">78%</div>
                </div>

                <p className="data-label">Memory Allocation:</p>
                <div className="guide-meter">
                  <div className="meter-fill" style={{ width: "64%" }} />
                  <div className="meter-label">64%</div>
                </div>

                <p className="data-label">Storage Capacity:</p>
                <div className="guide-meter">
                  <div className="meter-fill" style={{ width: "42%" }} />
                  <div className="meter-label">42%</div>
                </div>
              </div>
              <div className="page-number">Page 1</div>
            </div>

            {/* ...rest of widgets copied similarly (omitted for brevity) ... */}
          </div>

          <div className="decorative-rule" />

          <div style={{ textAlign: "center", fontFamily: "Libre Baskerville, serif", fontStyle: "italic", color: "var(--vintage-brown)", marginTop: 20 }}>
            Continued on following pages • See sections E through L for additional data views
          </div>
        </main>

        <footer className="lettering-footer">
          <div className="footer-content">
            <div className="attribution-title">Data Sources & Attribution</div>
            <div className="data-source">
              G.W. BACON & CO. LTD • 127 STRAND, LONDON • PRACTICAL ANALYTICS SERIES NO. 42
            </div>

            <div className="footer-rule" />

            <div className="data-source">ENTERPRISE DATABASE FEEDS • REAL-TIME API STREAMS • LEGACY SYSTEM INTEGRATIONS</div>

            <div className="copyright">© 2024 DATA VISION PUBLICATIONS • PRICE 2/6 • DESIGNED AND COMPILED FOR SCHOOLS, COLLEGES & WORKSHOPS</div>
          </div>
        </footer>

        <VintageStyles />
        <VintageClient />
      </main>
    </>
  );
}


