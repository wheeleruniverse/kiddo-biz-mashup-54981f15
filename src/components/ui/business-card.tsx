import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BusinessCardProps {
  title: string;
  description: string;
  image: string;
  items: string[];
  variant: "pet-store" | "burger-king" | "mcdonalds" | "starbucks" | "lego";
  className?: string;
}

const variantStyles = {
  "pet-store": "bg-pet-store text-pet-store-foreground",
  "burger-king": "bg-burger-king text-burger-king-foreground",
  "mcdonalds": "bg-mcdonalds text-mcdonalds-foreground", 
  "starbucks": "bg-starbucks text-starbucks-foreground",
  "lego": "bg-lego text-lego-foreground",
};

export function BusinessCard({ title, description, image, items, variant, className }: BusinessCardProps) {
  return (
    <Card className={cn("overflow-hidden shadow-card hover:shadow-colorful transition-all duration-300 hover:scale-105", className)}>
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <CardTitle className="absolute bottom-4 left-4 text-white text-2xl font-bold">
          {title}
        </CardTitle>
      </div>
      <CardHeader>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {items.map((item, index) => (
            <div key={index} className="text-sm bg-muted rounded-lg p-2 text-center">
              {item}
            </div>
          ))}
        </div>
        <Button className={cn("w-full", variantStyles[variant])}>
          Visit {title}
        </Button>
      </CardContent>
    </Card>
  );
}