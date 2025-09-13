import { Button } from "@/components/ui/button";

const Header = () => {
  const navLinks = [
    { href: "https://sites.google.com/view/uae-gratuity-calculator-mohre/home", text: "MOHRE Gratuity Calculator" },
    { href: "https://sites.google.com/view/uae-gratuity-calculator/", text: "UAE Gratuity Calculator" },
    { href: "https://sites.google.com/view/mohre-gratuity-calculator-uae/", text: "Gratuity Calculator Dubai" },
    { href: "https://github.com/gulzar-abbas", text: "Developer Profile" },
  ];

  return (
    <header className="bg-card shadow-card border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">UAE</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">
              UAE Gratuity Calculator
            </h1>
          </div>
          
          <nav className="flex flex-wrap gap-2">
            {navLinks.map((link, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                asChild
                className="text-sm hover:bg-muted"
              >
                <a 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="whitespace-nowrap"
                >
                  {link.text}
                </a>
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;