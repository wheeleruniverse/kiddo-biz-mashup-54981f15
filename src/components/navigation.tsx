import { Button } from "@/components/ui/button";

const navigationItems = [
  { id: "hero", label: "Home", icon: "🏠" },
  { id: "pet-store", label: "Pet Store", icon: "🐾" },
  { id: "burger-king", label: "Burger King", icon: "👑" },
  { id: "mcdonalds", label: "McDonald's", icon: "🍟" },
  { id: "starbucks", label: "Starbucks", icon: "☕" },
  { id: "lego", label: "Lego Store", icon: "🧱" },
];

export function Navigation() {
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
            <span className="text-2xl">🐾</span>
            <span className="font-bold text-xl bg-gradient-rainbow bg-clip-text text-transparent">
              Amazing Pet Store & More!
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(item.id)}
                className="text-sm hover:bg-accent"
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}