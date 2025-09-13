import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, DollarSign } from "lucide-react";

interface CalculationResult {
  gratuity: number;
  totalYears: number;
  contractType: string;
  basicSalary: number;
}

const GratuityCalculator = () => {
  const [basicSalary, setBasicSalary] = useState("");
  const [yearsOfService, setYearsOfService] = useState("");
  const [contractType, setContractType] = useState("");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateGratuity = () => {
    const salary = parseFloat(basicSalary);
    const years = parseFloat(yearsOfService);
    
    if (!salary || !years || !contractType) return;

    let gratuity = 0;
    
    if (contractType === "unlimited") {
      // Unlimited contract: 21 days for each year
      const dailyWage = salary / 30;
      gratuity = dailyWage * 21 * years;
    } else {
      // Limited contract: varies based on years served
      const dailyWage = salary / 30;
      
      if (years >= 1 && years < 5) {
        // 21 days for each year for first 5 years
        gratuity = dailyWage * 21 * years;
      } else if (years >= 5) {
        // 21 days for first 5 years + 30 days for each additional year
        const first5Years = dailyWage * 21 * 5;
        const additionalYears = years - 5;
        const additionalGratuity = dailyWage * 30 * additionalYears;
        gratuity = first5Years + additionalGratuity;
      }
    }

    setResult({
      gratuity: Math.round(gratuity),
      totalYears: years,
      contractType,
      basicSalary: salary
    });
  };

  const resetCalculator = () => {
    setBasicSalary("");
    setYearsOfService("");
    setContractType("");
    setResult(null);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* Calculator Form */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Calculate Your Gratuity
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your employment details to calculate end-of-service gratuity according to UAE MOHRE regulations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="salary" className="text-sm font-medium text-foreground">
              Basic Monthly Salary (AED)
            </Label>
            <Input
              id="salary"
              type="number"
              placeholder="Enter your basic salary"
              value={basicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
              className="h-12 text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="years" className="text-sm font-medium text-foreground">
              Years of Service
            </Label>
            <Input
              id="years"
              type="number"
              step="0.1"
              placeholder="Enter years of service"
              value={yearsOfService}
              onChange={(e) => setYearsOfService(e.target.value)}
              className="h-12 text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contract" className="text-sm font-medium text-foreground">
              Contract Type
            </Label>
            <Select value={contractType} onValueChange={setContractType}>
              <SelectTrigger className="h-12 text-lg">
                <SelectValue placeholder="Select contract type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unlimited">Unlimited Contract</SelectItem>
                <SelectItem value="limited">Limited Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              onClick={calculateGratuity}
              className="flex-1 h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300"
              disabled={!basicSalary || !yearsOfService || !contractType}
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculate Gratuity
            </Button>
            <Button 
              onClick={resetCalculator}
              variant="outline"
              className="h-12 px-6"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-8 h-8 text-secondary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Calculation Results
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Your end-of-service gratuity calculation
          </CardDescription>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-6">
              <div className="text-center p-6 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-success mb-2">
                  AED {result.gratuity.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Gratuity Amount
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-background rounded-lg border">
                  <div className="text-lg font-semibold text-foreground">
                    {result.totalYears}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Years of Service
                  </div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border">
                  <div className="text-lg font-semibold text-foreground">
                    AED {result.basicSalary.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Basic Salary
                  </div>
                </div>
              </div>

              <div className="p-4 bg-background rounded-lg border">
                <div className="text-sm text-muted-foreground mb-1">Contract Type</div>
                <div className="font-medium text-foreground capitalize">
                  {result.contractType} Contract
                </div>
              </div>

              <div className="text-xs text-muted-foreground p-4 bg-muted rounded-lg">
                <strong>Calculation Method:</strong> Based on UAE MOHRE regulations. 
                {result.contractType === "unlimited" 
                  ? " Unlimited contracts: 21 days salary for each year of service."
                  : " Limited contracts: 21 days for first 5 years, then 30 days for each additional year."
                }
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Calculator className="w-16 h-16 mx-auto mb-4 opacity-30" />
                Enter your employment details to see the gratuity calculation
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GratuityCalculator;