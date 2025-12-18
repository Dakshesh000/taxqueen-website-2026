import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface SubPageLayoutProps {
  bannerImage: string;
  bannerAlt: string;
  pageTitle: string;
  children: ReactNode;
}

const SubPageLayout = ({ bannerImage, bannerAlt, pageTitle, children }: SubPageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Banner Section - matches hero video locked state margins */}
      <section className="pt-20">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="relative w-full h-[150px] sm:h-[180px] lg:h-[200px] rounded-lg overflow-hidden">
            <img
              src={bannerImage}
              alt={bannerAlt}
              className="w-full h-full object-cover"
            />
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Page Title - Below banner */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-wide">
            {pageTitle}
          </h1>
        </div>
      </section>

      {/* Main Content - Single column centered */}
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubPageLayout;
