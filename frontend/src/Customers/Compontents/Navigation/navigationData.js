export default navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "/women",
          imageSrc:
            "https://m.media-amazon.com/images/G/31/IMG25/Fashion/BAU/Flip/EOSS/HalosNonSelected/Women._SS300_QL85_FMpng_.png",
          imageAlt: "Women new arrivals",
        },
        {
          name: "Basic Tees",
          href: "/women",
          imageSrc:
            "https://m.media-amazon.com/images/G/31/img23/WA/2025/april/ss-flip/kurta/halo/without/Salwar_Suits._SS400_QL85_FMpng_.png",
          imageAlt: "Basic tees",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", id: "top" },
            { name: "Dresses", id: "dress" },
            { name: "Women Kurti", id: "kurti" },
            { name: "Jeans", id: "women_jeans" },
            { name: "T-Shirts", id: "tshirts" },
            { name: "Jackets", id: "jackets" },
            { name: "Sarees", id: "sarees" },
          ],
        },
      ],
    },

    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "/men",
          imageSrc:
            "https://m.media-amazon.com/images/G/31/IMG25/Fashion/BAU/Flip/EOSS/HalosNonSelected/Men._SS300_QL85_FMpng_.png",
          imageAlt: "Men new arrivals",
        },
        {
          name: "Artwork Tees",
          href: "/men",
          imageSrc:
            "https://m.media-amazon.com/images/G/31/img21/MA2024/SS24flip/Halos/withoutshadow/ATHLEISURE._SS300_QL85_FMpng_.png",
          imageAlt: "Artwork tees",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Mens Kurtas", id: "kurta" },
            { name: "Shirts", id: "shirt" },
            { name: "Men Jeans", id: "jeans" },
            { name: "Sweaters", id: "sweaters" },
            { name: "T-Shirts", id: "shirt" },
            { name: "Jackets", id: "jackets" },
            { name: "Activewear", id: "activewear" },
          ],
        },
      ],
    },
     {
      id: "accessories",
      name: "Accessories",
      featured: [
        {
          name: "Bags & Luggage",
          href: "/accessories/bags",
          imageSrc:
            "https://m.media-amazon.com/images/G/31/IMG25/Fashion/BAU/Flip/EOSS/HalosNonSelected/Luggage._SS300_QL85_FMpng_.png",
          imageAlt: "Bags and luggage",
        },
        {
          name: "Watches",
          href: "/accessories/watches",
          imageSrc:
            "https://m.media-amazon.com/images/G/31/IMG25/Fashion/BAU/Flip/EOSS/HalosNonSelected/Watches._SS300_QL85_FMpng_.png",
          imageAlt: "Watches",
        },
      ],
      sections: [
        {
          id: "bags",
          name: "Bags & Luggage",
          items: [
            { name: "Backpacks", id: "backpacks" },
            { name: "Handbags", id: "handbags" },
            { name: "Travel Bags", id: "travel-bags" },
            { name: "Suitcases", id: "suitcases" },
          ],
        },
        {
          id: "fashion-accessories",
          name: "Fashion Accessories",
          items: [
            { name: "Watches", id: "watches" },
            { name: "Wallets", id: "wallets" },
            { name: "Belts", id: "belts" },
            { name: "Sunglasses", id: "sunglasses" },
          ],
        },
      ],
    },
     /* ================= BEAUTY ================= */
    {
      id: "beauty",
      name: "Beauty",
      featured: [
        {
          name: "Makeup Essentials",
          href: "/beauty",
          imageSrc:
            "https://m.media-amazon.com/images/G/31/IMG25/Fashion/BAU/Flip/EOSS/HalosNonSelected/Beauty._SS300_QL85_FMpng_.png",
          imageAlt: "Makeup essentials",
        },
        {
          name: "Skincare",
          href: "/beauty",
          imageSrc:
            "https://m.media-amazon.com/images/G/31/img24/Beauty/25/BAU/winterflip/halos/ucl/skincare._SS300_QL85_FMpng_.png",
          imageAlt: "Skincare products",
        },
      ],
      sections: [
        {
          id: "makeup",
          name: "Makeup",
          items: [
            { name: "Lipstick", id: "lipstick" },
            { name: "Foundation", id: "foundation" },
            { name: "Mascara", id: "mascara" },
            { name: "Eyeliner", id: "eyeliner" },
          ],
        },
        {
          id: "skincare",
          name: "Skincare",
          items: [
            { name: "Moisturizers", id: "moisturizers" },
            { name: "Cleansers", id: "cleansers" },
            { name: "Serums", id: "serums" },
            { name: "Sunscreen", id: "sunscreen" },
          ],
        },
      ],
    },

    /* ================= JEWELLERY ================= */
    {
      id: "jewellery",
      name: "Jewellery",
      featured: [
        {
          name: "Gold Jewellery",
          href: "/jewellery",
          imageSrc:
            "https://m.media-amazon.com/images/G/31/IMG25/Fashion/BAU/Flip/EOSS/HalosNonSelected/Jewellery_1._SS300_QL85_FMpng_.png",
          imageAlt: "Gold jewellery",
        },
        {
          name: "Silver Jewellery",
          href: "/jewellery",
          imageSrc:
            "https://m.media-amazon.com/images/G/31/img21/Jewellery/2025/FJ_Revamp/FJ/Halos/Rings._SS400_QL85_FMpng_.png",
          imageAlt: "Silver jewellery",
        },
      ],
      sections: [
        {
          id: "women-jewellery",
          name: "Women",
          items: [
            { name: "Necklaces", id: "necklaces" },
            { name: "Earrings", id: "earrings" },
            { name: "Bangles", id: "bangles" },
            { name: "Rings", id: "rings" },
          ],
        },
        {
          id: "men-jewellery",
          name: "Men",
          items: [
            { name: "Chains", id: "chains" },
            { name: "Bracelets", id: "bracelets" },
            { name: "Rings", id: "rings-men" },
          ],
        },
      ],
    },
  ],

  pages: [
    // { name: "Company", href: "/company" },
    // { name: "Stores", href: "/stores" },
  ],
};
