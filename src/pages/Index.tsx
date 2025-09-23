import { Navigation } from "@/components/navigation";
import { BusinessCard } from "@/components/ui/business-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { superComboItems } from "@/data/businessData";
import heroImage from "@/assets/hero-image.jpg";
import petStoreImage from "@/assets/pet-store.jpg";
import burgerKingImage from "@/assets/burger-king.jpg";
import mcdonaldsImage from "@/assets/mcdonalds.jpg";
import starbucksImage from "@/assets/starbucks.jpg";
import legoStoreImage from "@/assets/lego-store.jpg";

const Index = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSuperCombo = () => {
    superComboItems.forEach(item => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        business: item.business,
        variant: item.variant
      });
    });
    
    toast({
      title: "🎉 Super Combo Added!",
      description: "All combo items have been added to your cart!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section id="hero" className="pt-20 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <img 
                src={heroImage} 
                alt="Amazing Pet Store and More" 
                className="w-full h-96 object-cover rounded-2xl shadow-colorful"
              />
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-rainbow bg-clip-text text-transparent">
              <i className="material-icons text-4xl text-primary">pets</i> Amazing Pet Store & More! <i className="material-icons text-4xl text-primary">pets</i>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Welcome to the most amazing place on Earth! We're not just a pet store - 
              we have everything you love all in one magical place!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-pet-store text-pet-store-foreground hover:scale-105 transition-transform"
                onClick={() => scrollToSection("pet-store")}
              >
                <i className="material-icons text-2xl mr-2">pets</i> Explore Our Pet Store
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="hover:scale-105 transition-transform"
                onClick={() => scrollToSection("burger-king")}
              >
                <i className="material-icons text-2xl mr-2">restaurant</i> Check Out Our Food Courts
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Business Cards Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-rainbow bg-clip-text text-transparent">
            All Your Favorites Under One Roof!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Pet Store */}
            <div id="pet-store">
              <BusinessCard
                title={<><i className="material-icons text-2xl mr-2">pets</i> Pet Paradise</>}
                description="Everything your furry, feathered, and scaly friends need!"
                image={petStoreImage}
                items={["Dog Food & Treats", "Cat Toys & Beds", "Bird Cages", "Fish Tanks", "Hamster Wheels", "Pet Grooming"]}
                variant="pet-store"
                onClick={() => navigate("/business/pet-store")}
              />
            </div>

            {/* Burger King */}
            <div id="burger-king">
              <BusinessCard
                title="👑 Burger King Corner"
                description="Have it your way! Royal burgers and crispy fries!"
                image={burgerKingImage}
                items={["Whopper Burgers", "Crispy Fries", "Chicken Nuggets", "Milkshakes", "Crown Cookies", "King's Crowns"]}
                variant="burger-king"
                onClick={() => navigate("/business/burger-king")}
              />
            </div>

            {/* McDonald's */}
            <div id="mcdonalds">
              <BusinessCard
                title={<><i className="material-icons text-2xl mr-2">fastfood</i> McDonald's Cafe</>}
                description="I'm lovin' it! Happy meals and golden treats!"
                image={mcdonaldsImage}
                items={["Happy Meals", "Big Mac", "Chicken McNuggets", "Apple Pies", "McFlurries", "Toy Surprises"]}
                variant="mcdonalds"
                onClick={() => navigate("/business/mcdonalds")}
              />
            </div>

            {/* Starbucks */}
            <div id="starbucks">
              <BusinessCard
                title={<><i className="material-icons text-2xl mr-2">local_cafe</i> Starbucks Corner</>}
                description="Kid-friendly drinks and cozy treats!"
                image={starbucksImage}
                items={["Hot Chocolate", "Frappuccinos", "Cake Pops", "Cookies", "Warm Milk", "Special Cups"]}
                variant="starbucks"
                onClick={() => navigate("/business/starbucks")}
              />
            </div>

            {/* Lego Store */}
            <div id="lego">
              <BusinessCard
                title={<><i className="material-icons text-2xl mr-2">toys</i> Lego Wonderland</>}
                description="Build your dreams with endless possibilities!"
                image={legoStoreImage}
                items={["Lego City Sets", "Star Wars Legos", "Friends Collection", "Build Tables", "Mini Figures", "Custom Creations"]}
                variant="lego"
                onClick={() => navigate("/business/lego")}
              />
            </div>

            {/* Special Combo Section */}
            <Card className="bg-gradient-card shadow-colorful hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-6xl mb-4 text-primary"><i className="material-icons">celebration</i></div>
                <h3 className="text-2xl font-bold mb-4">Super Combo Deal!</h3>
                <p className="text-muted-foreground mb-4">
                  Get a pet toy, a burger, some Legos, and a drink all together!
                </p>
                <div className="space-y-2 text-sm">
                  <div><i className='material-icons text-lg mr-2'>pets</i> 1 Pet Toy</div>
                  <div><i className='material-icons text-lg mr-2'>restaurant</i> 1 Kids Meal</div>
                  <div><i className='material-icons text-lg mr-2'>toys</i> Small Lego Set</div>
                  <div><i className='material-icons text-lg mr-2'>local_cafe</i> Kid's Drink</div>
                  <div>🎁 Surprise Gift</div>
                </div>
                <Button 
                  className="mt-4 w-full bg-gradient-rainbow text-white border-0"
                  onClick={handleSuperCombo}
                >
                  Get Super Combo!
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-foreground">
            <i className="material-icons text-4xl text-yellow-500">star</i> Amazing Fun Facts! <i className="material-icons text-4xl text-yellow-500">star</i>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-2 text-pet-store"><i className="material-icons">pets</i></div>
                <div className="text-2xl font-bold text-pet-store">500+</div>
                <div className="text-sm text-muted-foreground">Happy Pets Served</div>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-2 text-burger-king"><i className="material-icons">restaurant</i></div>
                <div className="text-2xl font-bold text-burger-king">1000+</div>
                <div className="text-sm text-muted-foreground">Burgers Made</div>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-2 text-lego"><i className="material-icons">toys</i></div>
                <div className="text-2xl font-bold text-lego">10,000+</div>
                <div className="text-sm text-muted-foreground">Lego Pieces</div>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-2 text-starbucks"><i className="material-icons">local_cafe</i></div>
                <div className="text-2xl font-bold text-starbucks">200+</div>
                <div className="text-sm text-muted-foreground">Drinks Served</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <div className="text-4xl mb-4 text-primary flex justify-center space-x-2">
            <i className="material-icons">pets</i>
            <i className="material-icons">restaurant</i>
            <i className="material-icons">toys</i>
            <i className="material-icons">local_cafe</i>
            <i className="material-icons">fastfood</i>
          </div>
          <h3 className="text-2xl font-bold mb-4">Amazing Pet Store & More!</h3>
          <p className="text-background/80 mb-4">
            The most magical place where pets, food, toys, and fun all come together!
          </p>
          <p className="text-background/60 text-sm">
            Made with <i className="material-icons text-red-500">favorite</i> for the most creative business idea ever!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;