import Header from "@/components/Header";
import FaceShapeDetector from "@/components/FaceShapeDetector";
import { Button } from "@/components/ui/button";
import { Camera, Zap, Shield, Award } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Camera,
      title: "AI-Powered Detection",
      description: "Advanced facial analysis technology to accurately identify your unique face shape"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get your face shape analysis in seconds with our fast and reliable detection system"
    },
    {
      icon: Shield,
      title: "Privacy Protected",
      description: "Your photos are processed locally and never stored or shared with third parties"
    },
    {
      icon: Award,
      title: "Professional Accuracy",
      description: "Trusted by beauty professionals and styling experts for precise face shape analysis"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Face Shape Detector
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Discover your unique face shape with our AI-powered detection tool. 
            Fast, accurate, and completely free online analysis.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 shadow-glow h-14 px-8 text-lg font-semibold"
            onClick={() => document.getElementById('detector')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Camera className="w-6 h-6 mr-2" />
            Detect Face Shape
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Face Shape Detector?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our advanced AI-powered face shape detector provides accurate, instant analysis 
              to help you discover your unique facial structure and styling recommendations.
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

      {/* Detector Section */}
      <section id="detector" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Analyze Your Face Shape
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload a photo or use your camera to get an instant analysis of your 
              face shape with personalized styling recommendations.
            </p>
          </div>
          
          <FaceShapeDetector />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">FSA</span>
            </div>
            <span className="text-lg font-semibold text-foreground">Face Shape Detector</span>
          </div>
          
          <p className="text-muted-foreground text-sm mb-4">
            Professional AI-powered face shape detection tool. 
            Free, accurate, and privacy-focused analysis for all face types.
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
              AI-Powered Face Shape Analysis
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
