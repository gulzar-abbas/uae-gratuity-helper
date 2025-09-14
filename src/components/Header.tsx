import { Button } from "@/components/ui/button";

const Header = () => {
  const navLinks = [
    { href: "https://sites.google.com/view/face-shape-detector-/home", text: "Face Shape Detector" },
    { href: "#", text: "Face Shape Detector Online Camera" },
    { href: "#", text: "Face Shape Detector Online Free" },
    { href: "#", text: "Find My Face Shape Online Free" },
    { href: "https://github.com/gulzar-abbas", text: "Developer Profile" },
  ];

  return (
    <header className="bg-card shadow-card border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">FSA</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">
              Face Shape Detector
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