import Header from "@/components/Header";
import GratuityCalculator from "@/components/GratuityCalculator";
import { Button } from "@/components/ui/button";
import { Shield, Calculator, Clock, Award } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "MOHRE Compliant",
      description: "Calculations based on official UAE Ministry of Human Resources and Emiratisation regulations"
    },
    {
      icon: Calculator,
      title: "Accurate Results",
      description: "Precise gratuity calculations for both limited and unlimited employment contracts"
    },
    {
      icon: Clock,
      title: "Instant Calculation",
      description: "Get your end-of-service gratuity amount in seconds with our easy-to-use calculator"
    },
    {
      icon: Award,
      title: "Professional Tool",
      description: "Trusted by HR professionals and employees across the United Arab Emirates"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            UAE Gratuity Calculator
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Calculate your end-of-service gratuity according to UAE MOHRE regulations. 
            Fast, accurate, and compliant with UAE labor law.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 shadow-glow h-14 px-8 text-lg font-semibold"
            onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Calculator className="w-6 h-6 mr-2" />
            Start Calculating
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Calculator?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our UAE gratuity calculator is designed to provide accurate, MOHRE-compliant calculations 
              for all types of employment contracts in the United Arab Emirates.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-card p-6 rounded-lg shadow-card text-center hover:shadow-elegant transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Calculate Your Gratuity
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter your employment details below to get an accurate calculation of your 
              end-of-service gratuity according to UAE labor law.
            </p>
          </div>
          
          <GratuityCalculator />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">UAE</span>
            </div>
            <span className="text-lg font-semibold text-foreground">UAE Gratuity Calculator</span>
          </div>
          
          <p className="text-muted-foreground text-sm mb-4">
            Professional gratuity calculation tool for UAE employees. 
            Compliant with MOHRE regulations and UAE labor law.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a 
              href="https://github.com/gulzar-abbas" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-glow transition-colors"
            >
              Developer: Gulzar Abbas
            </a>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              Based on UAE MOHRE Guidelines
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
