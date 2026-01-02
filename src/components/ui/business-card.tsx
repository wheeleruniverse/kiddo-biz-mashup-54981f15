import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BusinessCardProps {
  title: string;
  icon?: string;
  description: string;
  image: string;
  items: string[];
  variant: "pet-store" | "burger-king" | "mcdonalds" | "starbucks" | "lego" | "rivertown" | "red-robin" | "annas-house" | "macys";
  className?: string;
  onClick?: () => void;
}

const variantStyles = {
  "pet-store": "bg-pet-store text-pet-store-foreground",
  "burger-king": "bg-burger-king text-burger-king-foreground",
  "mcdonalds": "bg-mcdonalds text-mcdonalds-foreground",
  "starbucks": "bg-starbucks text-starbucks-foreground",
  "lego": "bg-lego text-lego-foreground",
  "rivertown": "bg-rivertown text-rivertown-foreground",
  "red-robin": "bg-red-robin text-red-robin-foreground",
  "annas-house": "bg-annas-house text-annas-house-foreground",
  "macys": "bg-macys text-macys-foreground",
};

export function BusinessCard({ title, icon, description, image, items, variant, className, onClick }: BusinessCardProps) {
  return (
    <Card className={cn("overflow-hidden shadow-card hover:shadow-colorful transition-all duration-300 hover:scale-105", className)}>
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <CardTitle className="absolute bottom-4 left-4 text-white text-2xl font-bold flex items-center">
          {icon && <i className="material-icons text-2xl mr-2">{icon}</i>}
          {title}
        </CardTitle>
      </div>
      <CardHeader>
        <p className="text-muted-foreground h-12 flex items-center">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {items.map((item, index) => (
            <div key={index} className="text-sm bg-muted rounded-lg p-2 text-center">
              {item}
            </div>
          ))}
        </div>
        <Button 
          className={cn("w-full", variantStyles[variant])}
          onClick={onClick}
        >
          Visit {title}
        </Button>
      </CardContent>
    </Card>
  );
}