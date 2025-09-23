import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { CartDrawer } from "@/components/ui/cart-drawer";
import { useState } from "react";

const navigationItems = [
  { id: "hero", label: "Home", icon: "home" },
  { id: "pet-store", label: "Pet Store", icon: "pets" },
  { id: "burger-king", label: "Burger King", icon: "restaurant" },
  { id: "mcdonalds", label: "McDonald's", icon: "fastfood" },
  { id: "starbucks", label: "Starbucks", icon: "local_cafe" },
  { id: "lego", label: "Lego Store", icon: "toys" },
];

export function Navigation() {
  const { state } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <i className="material-icons text-2xl text-primary">pets</i>
            <span className="font-bold text-xl bg-gradient-rainbow bg-clip-text text-transparent">
              Amazing Pet Store & More!
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm hover:bg-accent"
                >
                  <i className="material-icons mr-1 text-sm">{item.icon}</i>
                  {item.label}
                </Button>
              ))}
            </div>
            
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCartOpen(true)}
              className="relative"
            >
              <ShoppingCart className="h-4 w-4" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </nav>
  );
}