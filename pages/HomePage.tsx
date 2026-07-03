import Categories from "@/components/modules/home/Categories";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import Hero from "@/components/modules/home/Hero";
import Testimonials from "@/components/modules/home/Testimonials";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Testimonials />
    </div>
  )
}