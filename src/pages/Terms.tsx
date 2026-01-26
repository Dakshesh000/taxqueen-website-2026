import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import usePageMeta from "@/hooks/usePageMeta";

const Terms = () => {
  usePageMeta(
    "Terms of Service | Tax Queen",
    "Terms of Service for Tax Queen tax preparation and consulting services."
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground uppercase mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p className="text-sm text-muted-foreground">
              Last updated: January 2025
            </p>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Tax Queen's services, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">2. Services</h2>
              <p>
                Tax Queen provides tax preparation, tax planning, and tax consulting services for digital nomads, 
                RV travelers, and US citizens living abroad. Our services include but are not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Federal and state tax return preparation</li>
                <li>Tax strategy and planning consultations</li>
                <li>Business structure consulting</li>
                <li>FBAR and FATCA compliance assistance</li>
                <li>IRS representation</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">3. Client Responsibilities</h2>
              <p>
                As a client, you are responsible for providing accurate, complete, and timely information 
                necessary for the preparation of your tax returns. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide all requested documents in a timely manner</li>
                <li>Review all prepared documents before signing</li>
                <li>Inform us of any changes to your financial situation</li>
                <li>Respond to our communications promptly</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">4. Fees and Payment</h2>
              <p>
                All fees are quoted as flat fees and are due upon completion of services unless otherwise agreed. 
                Payment terms will be outlined in your engagement letter.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">5. Confidentiality</h2>
              <p>
                We maintain strict confidentiality of all client information in accordance with professional 
                standards and applicable laws. We will not disclose your information to third parties without 
                your consent, except as required by law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">6. Limitation of Liability</h2>
              <p>
                Tax Queen's liability is limited to the fees paid for services. We are not responsible for 
                penalties, interest, or additional taxes resulting from incorrect information provided by clients 
                or changes in tax law after the preparation of returns.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">7. Contact</h2>
              <p>
                For questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:hello@taxqueen.com" className="text-primary hover:underline">
                  hello@taxqueen.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
