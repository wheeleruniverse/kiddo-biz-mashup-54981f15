import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";
import { businessData } from "@/data/businessData";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const variantStyles = {
  "pet-store": "bg-pet-store text-pet-store-foreground",
  "burger-king": "bg-burger-king text-burger-king-foreground",
  "mcdonalds": "bg-mcdonalds text-mcdonalds-foreground", 
  "starbucks": "bg-starbucks text-starbucks-foreground",
  "lego": "bg-lego text-lego-foreground",
};

export default function BusinessTemplate() {
  const { businessId } = useParams<{ businessId: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const business = businessData.find(b => b.id === businessId);

  if (!business) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Business Not Found</h1>
          <Button onClick={() => navigate("/")} className="bg-primary text-primary-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      business: business.name,
      variant: business.variant
    });
    
    toast({
      title: "Added to Cart! 🛒",
      description: `${product.name} added to your cart`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-foreground hover:bg-accent"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={business.image} 
          alt={business.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl font-bold mb-2">{business.name}</h1>
          <p className="text-lg opacity-90">{business.description}</p>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          🛍️ Shop Our Products
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {business.products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-colorful transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <p className="text-muted-foreground">{product.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className={cn("", variantStyles[business.variant])}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fun Call to Action */}
        <div className="mt-12 text-center">
          <Card className="inline-block p-8 bg-gradient-card">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              🎉 Having Fun Shopping?
            </h3>
            <p className="text-muted-foreground mb-6">
              Don't forget to check out our other amazing businesses!
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-primary text-primary-foreground"
            >
              Explore More Businesses
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}