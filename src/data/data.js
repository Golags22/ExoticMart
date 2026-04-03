import { Sparkles, Gem, Flower2 } from "lucide-react";



// Category data structure for easy maintenance this is found in the Navbar
  export const categories = [
    {
      id: "cosmetics",
      name: "Cosmetics",
      href: "/cosmetics",
      items: [
        { name: "Face", href: "/cosmetics/face" },
        { name: "Eyes", href: "/cosmetics/eyes" },
        { name: "Lips", href: "/cosmetics/lips" },
        { name: "Nails", href: "/cosmetics/nails" },
        { name: "Brushes & Tools", href: "/cosmetics/tools" },
      ],
    },
    {
      id: "hair",
      name: "Hair",
      href: "/hair",
      items: [
        { name: "Shampoo & Conditioner", href: "/hair/shampoo" },
        { name: "Styling", href: "/hair/styling" },
        { name: "Color", href: "/hair/color" },
        { name: "Tools", href: "/hair/tools" },
        { name: "Treatments", href: "/hair/treatments" },
      ],
    },
    {
      id: "jewelry",
      name: "Jewelry",
      href: "/jewelry",
      items: [
        { name: "Necklaces", href: "/jewelry/necklaces" },
        { name: "Earrings", href: "/jewelry/earrings" },
        { name: "Bracelets", href: "/jewelry/bracelets" },
        { name: "Rings", href: "/jewelry/rings" },
        { name: "Watches", href: "/jewelry/watches" },
      ],
    },
    {
      id: "clothing",
      name: "Clothing",
      href: "/clothing",
      items: [
        { name: "Dresses", href: "/clothing/dresses" },
        { name: "Tops", href: "/clothing/tops" },
        { name: "Bottoms", href: "/clothing/bottoms" },
        { name: "Outerwear", href: "/clothing/outerwear" },
        { name: "Lingerie", href: "/clothing/lingerie" },
      ],
    },
    {
      id: "accessories",
      name: "Accessories",
      href: "/accessories",
      items: [
        { name: "Bags", href: "/accessories/bags" },
        { name: "Belts", href: "/accessories/belts" },
        { name: "Hats", href: "/accessories/hats" },
        { name: "Scarves", href: "/accessories/scarves" },
        { name: "Sunglasses", href: "/accessories/sunglasses" },
      ],
    },
  ];
 // Category data structure for easy maintenance this is found in the FeaturedCategories
  export const categoriesItems = [
    {
      id: 1,
      name: "Cosmetics",
      link: "/cosmetics",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Face, eyes, lips & more",
      itemCount: "240+ products",
      color: "from-red-500 to-pink-500"
    },
    {
      id: 2,
      name: "Hair",
      link: "/hair",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Care, styling & color",
      itemCount: "180+ products",
      color: "from-red-600 to-rose-500"
    },
    {
      id: 3,
      name: "Jewelry",
      link: "/jeweries",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Necklaces, rings & more",
      itemCount: "150+ products",
      color: "from-amber-500 to-red-500"
    },
    {
      id: 4,
      name: "Clothing",
      link: "/clothing",
      image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Dresses, tops & outerwear",
      itemCount: "320+ products",
      color: "from-red-500 to-orange-500"
    }
  ];



  // Category data structure for easy maintenance this is found in the Promotionbanner
  export const banners = [
      {
        id: 1,
        title: "Summer Collection 2026",
        subtitle: "Sun-kissed glow, all season long",
        description: "Discover lightweight formulas & vibrant colors for your summer glow",
        cta: "Shop Summer Edit",
        href: "/summer-collection",
        icon: Sparkles,
        gradient: "from-orange-400 via-red-500 to-pink-500",
        image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        bgPosition: "center 30%"
      },
      {
        id: 2,
        title: "Luxury Hair Essentials",
        subtitle: "Professional-grade care for your crown",
        description: "From bond repair to thermal protection – luxury formulations",
        cta: "Explore Hair Care",
        href: "/hair/luxury",
        icon: Flower2,
        gradient: "from-amber-600 via-red-600 to-rose-500",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        bgPosition: "center 40%"
      },
      {
        id: 3,
        title: "Bridal Jewelry Edit",
        subtitle: "Say yes to forever elegance",
        description: "Handcrafted pieces for your special day and beyond",
        cta: "Shop Bridal Collection",
        href: "/jewelry/bridal",
        icon: Gem,
        gradient: "from-rose-400 via-red-500 to-purple-500",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        bgPosition: "center 20%"
      }
    ];