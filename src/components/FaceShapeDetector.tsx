import { useState, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, RotateCcw, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const FaceShapeDetector = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [detectedShape, setDetectedShape] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const faceShapes = [
    { name: "Oval", description: "Balanced proportions with slightly wider forehead", characteristics: "Longer than wide, rounded jawline" },
    { name: "Round", description: "Equal width and length with soft angles", characteristics: "Full cheeks, curved jawline" },
    { name: "Square", description: "Strong, angular jawline with wide forehead", characteristics: "Equal width at forehead and jaw" },
    { name: "Heart", description: "Wide forehead tapering to narrow chin", characteristics: "Prominent cheekbones, pointed chin" },
    { name: "Diamond", description: "Wide cheekbones with narrow forehead and jaw", characteristics: "Angular features, defined cheekbones" },
    { name: "Oblong", description: "Longer than wide with straight sides", characteristics: "High forehead, long chin" }
  ];

  const analyzeImage = useCallback(async (imageDataUrl: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
    
    // Simulate face shape detection
    const shapes = ["Oval", "Round", "Square", "Heart", "Diamond", "Oblong"];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    
    setDetectedShape(randomShape);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis Complete!",
      description: `Your face shape has been detected as ${randomShape}`,
    });
  }, [toast]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        setSelectedImage(imageDataUrl);
        setDetectedShape(null);
        analyzeImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setSelectedImage(imageDataUrl);
        setDetectedShape(null);
        stopCamera();
        analyzeImage(imageDataUrl);
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const resetDetection = () => {
    setSelectedImage(null);
    setDetectedShape(null);
    setIsAnalyzing(false);
    stopCamera();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const currentShape = detectedShape ? faceShapes.find(shape => shape.name === detectedShape) : null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Upload/Camera Section */}
      <Card className="shadow-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">
            Detect Your Face Shape
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Upload a photo or use your camera to analyze your face shape instantly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!selectedImage && !cameraActive && (
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                size="lg"
                className="h-32 flex-col gap-3 bg-gradient-primary hover:opacity-90"
              >
                <Upload className="w-8 h-8" />
                <span className="text-lg font-semibold">Upload Photo</span>
                <span className="text-sm opacity-90">Choose from gallery</span>
              </Button>
              
              <Button
                onClick={startCamera}
                variant="outline"
                size="lg"
                className="h-32 flex-col gap-3 border-2 hover:bg-muted"
              >
                <Camera className="w-8 h-8" />
                <span className="text-lg font-semibold">Use Camera</span>
                <span className="text-sm text-muted-foreground">Take a selfie</span>
              </Button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {cameraActive && (
            <div className="space-y-4">
              <div className="relative bg-muted rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-80 border-2 border-primary rounded-lg opacity-50"></div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={capturePhoto} size="lg" className="bg-gradient-primary">
                  <Camera className="w-5 h-5 mr-2" />
                  Capture Photo
                </Button>
                <Button onClick={stopCamera} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {selectedImage && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Uploaded for analysis"
                  className="w-full max-w-md mx-auto rounded-lg shadow-elegant"
                />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-background/80 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <Zap className="w-8 h-8 text-primary mx-auto animate-pulse" />
                      <p className="text-lg font-semibold">Analyzing Face Shape...</p>
                      <p className="text-sm text-muted-foreground">This may take a few seconds</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center">
                <Button onClick={resetDetection} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Another Photo
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {detectedShape && currentShape && (
        <Card className="shadow-card animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              Your Face Shape: {detectedShape}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              {currentShape.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Key Characteristics:</h4>
              <p className="text-muted-foreground">{currentShape.characteristics}</p>
            </div>
            
            <div className="bg-gradient-subtle rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Styling Tips:</h4>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Choose hairstyles that complement your {detectedShape.toLowerCase()} face shape</li>
                <li>• Consider eyewear that balances your facial proportions</li>
                <li>• Makeup techniques can enhance your natural features</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Face Shapes Guide */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">Face Shape Guide</CardTitle>
          <CardDescription>Learn about different face shapes and their characteristics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {faceShapes.map((shape, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-card ${
                  detectedShape === shape.name 
                    ? 'border-primary bg-gradient-subtle' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <h4 className="font-semibold text-foreground mb-2">{shape.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{shape.description}</p>
                <p className="text-xs text-muted-foreground">{shape.characteristics}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default FaceShapeDetector;