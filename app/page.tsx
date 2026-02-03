import DiscoverHero from "@/components/hero/DiscoverHero";
import ProductSection from "@/components/products/ProductSection";
import BrowseByStyleSection from "@/components/browse/BrowseByStyleSection";
import Separator from "@/components/ui/separator";
import { newArrivals, topSelling } from "@/lib/mockProducts";
import { styleCategories } from "@/lib/styleCategories";

const Home = () => {
  return (
    <main>
      <DiscoverHero />
      <ProductSection
        title="New Arrivals"
        products={newArrivals}
        viewAllLink="/products/new-arrivals"
      />

      <Separator />

      <ProductSection
        title="Top Selling"
        products={topSelling}
        viewAllLink="/products/top-selling"
      />

      <Separator />

      <BrowseByStyleSection categories={styleCategories} />
    </main>
  );
};

export default Home;
