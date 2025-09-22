import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Plus, Minus, Trash2, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const variantStyles = {
  "pet-store": "bg-pet-store text-pet-store-foreground",
  "burger-king": "bg-burger-king text-burger-king-foreground",
  "mcdonalds": "bg-mcdonalds text-mcdonalds-foreground", 
  "starbucks": "bg-starbucks text-starbucks-foreground",
  "lego": "bg-lego text-lego-foreground",
};

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { state, updateQuantity, removeItem, clearCart } = useCart();

  const handleCheckout = () => {
    if (state.items.length === 0) {
      toast({
        title: "Cart is empty!",
        description: "Add some items before checking out.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "🎉 Checkout Complete!",
      description: `Thank you for your pretend purchase of $${state.total.toFixed(2)}!`,
    });
    clearCart();
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-bold">
              🛒 Shopping Cart ({state.itemCount} items)
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        
        <div className="flex-1 overflow-y-auto p-4">
          {state.items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-lg">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-2">Add some items to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.business}</p>
                    <p className="font-medium">${item.price.toFixed(2)} each</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {state.items.length > 0 && (
          <div className="border-t border-border p-4 space-y-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span>${state.total.toFixed(2)}</span>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={clearCart} className="flex-1">
                Clear Cart
              </Button>
              <Button onClick={handleCheckout} className="flex-1 bg-primary text-primary-foreground">
                Pretend Checkout 🎉
              </Button>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}