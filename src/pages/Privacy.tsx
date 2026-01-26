import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import usePageMeta from "@/hooks/usePageMeta";

const Privacy = () => {
  usePageMeta(
    "Privacy Policy | Tax Queen",
    "Privacy Policy for Tax Queen - how we collect, use, and protect your personal information."
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground uppercase mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p className="text-sm text-muted-foreground">
              Last updated: January 2025
            </p>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact information (name, email, phone number)</li>
                <li>Financial information necessary for tax preparation</li>
                <li>Social Security numbers and tax identification numbers</li>
                <li>Employment and income information</li>
                <li>Business information for business owners</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Prepare and file your tax returns</li>
                <li>Provide tax consulting and planning services</li>
                <li>Communicate with you about your taxes</li>
                <li>Send newsletters and updates (with your consent)</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">3. Information Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encrypted client portals for document sharing</li>
                <li>Secure storage of financial records</li>
                <li>Limited access to sensitive information</li>
                <li>Regular security assessments</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">4. Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. 
                We may share your information only:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With the IRS and state tax authorities as necessary for filing</li>
                <li>With service providers who assist in our operations</li>
                <li>When required by law or legal process</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">5. Data Retention</h2>
              <p>
                We retain client records for a minimum of seven years as required by professional 
                standards and IRS regulations. After this period, records may be securely destroyed.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">6. Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Request corrections to your information</li>
                <li>Opt out of marketing communications</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">7. Cookies and Tracking</h2>
              <p>
                Our website may use cookies and similar technologies to enhance your experience. 
                You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">8. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, please contact us at{" "}
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

export default Privacy;
