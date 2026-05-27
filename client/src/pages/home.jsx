import Hero from "../components/hero";
import ProductSection from "../components/productSection";
import "../components/site.css";
import { useState } from "react";

const categories = [
  {
    name: "Pharmacy",
    href: "/category/pharmacy",
    image:
      "https://static.wixstatic.com/media/0d8787_d34e9389e3434fc38da173009fd27d15~mv2.jpg/v1/fill/w_273,h_275,fp_0.44_0.95,q_80,enc_avif,quality_auto/pharmacy.jpg",
  },
  {
    name: "Foods",
    href: "/food",
    image:
      "https://static.wixstatic.com/media/0d8787_4377a64921bd4daea6fcb44378e20c9e~mv2.jpg/v1/fill/w_273,h_275,fp_0.44_0.95,q_80,enc_avif,quality_auto/food.jpg",
  },
  {
    name: "Snacks",
    href: "/category/snacks-treats",
    image:
      "https://static.wixstatic.com/media/0d8787_9ffef90104b348c8b252705cec7b2cd1~mv2.jpg/v1/fill/w_273,h_275,fp_0.44_0.95,q_80,enc_avif,quality_auto/snacks.jpg",
  },
  {
    name: "Grooming",
    href: "/grooming-essentials",
    image:
      "https://static.wixstatic.com/media/0d8787_d58f0c758ad043cdb9e2bd4e69b8266b~mv2.jpg/v1/fill/w_273,h_275,fp_0.44_0.95,q_80,enc_avif,quality_auto/grooming.jpg",
  },
  {
    name: "Accessories",
    href: "/accessories",
    image:
      "https://static.wixstatic.com/media/0d8787_b2ded1c18c3e48a7a3c63f1075354ee9~mv2.jpg/v1/fill/w_273,h_275,fp_0.44_0.95,q_80,enc_avif,quality_auto/accessories.jpg",
  },
  {
    name: "Toys",
    href: "/toys",
    image:
      "https://static.wixstatic.com/media/0d8787_33f79419cafc49e084cc61f440d97ea3~mv2.jpg/v1/fill/w_273,h_275,fp_0.44_0.95,q_80,enc_avif,quality_auto/toys.jpg",
  },
];

const brands = [
  {
    name: "Royal Canin",
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRUttytJGZM_rKMv3MaAUxwYhOwOJaaIYHp4B5q2sCOYSwSKX91LRKl0NxADUDteqLj2zhQ43x_UEwnRmeqH-nNhgHtSVgDFZeItFY79sLKwLGWG9BDqePaPmnGxFPy1g9rt8F9IA&usqp=CAc",
  },

  {
    name: "Pedigree",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpvINTxuVPkFFrkrR4dbOhdgK7C2Z-lcssww&s",
  },

  {
    name: "Drools",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOxcWDWeZg1YCNS5tAr9Kvll39SC8iro3q5g&s",
  },

  {
    name: "Whiskas",
    image:
      "https://m.media-amazon.com/images/I/71bCC6tIyFL._SX679_.jpg",
  },

  {
    name: "Felix",
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTRSH8iN2AFRKcIlfr7jWmU8T1NBzrOlDQ7xO_uI_xTFFk0ci-VkSNnxuNzVkEJIN_cSTHoAf60v-AJIrgzQIF02TSqQFf1ZlSjzKuWsgdmUTwvqW1NH3IMcyKu2JkVI4wfeoP97A&usqp=CAc",
  },

  {
    name: "Purina",
    image:
      "https://ik.imagekit.io/supertails/cdn/shop/files/01.FOP3_600x.png?v=1773236085",
  },

  {
    name: "Orijen",
    image:
      "https://www.orijenpetfoods.com/dw/image/v2/BFDW_PRD/on/demandware.static/-/Sites-orijen-na-master-catalog/default/dw7c7f5367/ORI%20Wild%20Reserve/Cat/Original/ORIJEN%20CAT%20Wild%20Reserve%20Free-Run%20Chicken%20&%20Wild-Caught%20Fish%20Recipe%206.5lbs%20Front%20of%20Pack%20Image%20USA.png?sw=525&sh=756",
  },

  {
    name: "Acana",
    image:
      "https://ik.imagekit.io/supertails/cdn/shop/files/Frame12734_600x.png?v=1716012154",
  },

  {
    name: "Farmina",
    image:
      "https://ik.imagekit.io/supertails/cdn/shop/files/21-518615_4fa148ad-f26b-47a6-9144-f5775f64e952_600x.png?v=1750262542",
  },

  {
    name: "Himalaya",
    image:
      "https://m.media-amazon.com/images/I/41-AQA8SDTL._SY300_SX300_QL70_FMwebp_.jpg",
  },

  {
    name: "JerHigh",
    image:
      "https://zigly.com/cdn/shop/files/OTRFO2543.jpg?format=webp&v=1766589504&width=550",
  },

  {
    name: "Purepet",
    image:
      "https://m.media-amazon.com/images/I/41GOek+pkyL._SY300_SX300_QL70_FMwebp_.jpg",
  },

  {
    name: "Bellotta",
    image:
      "https://ik.imagekit.io/supertails/cdn/shop/files/Frame74_e4952f39-fc50-45be-85a1-8204641a33a1_600x.png?v=1758379302",
  },

  {
    name: "Sheba",
    image:
      "https://m.media-amazon.com/images/I/61DhNHSY1mL._SX679_.jpg",
  },

  {
    name: "Me-O",
    image:
      "https://zigly.com/cdn/shop/files/otrfo1491.jpg?format=webp&v=1766590567&width=550",
  },

  {
    name: "IAMS",
    image:
      "https://m.media-amazon.com/images/I/41-iyaPQnVL._SY300_SX300_QL70_FMwebp_.jpg",
  },

  {
    name: "Taste of the Wild",
    image:
      "https://ik.imagekit.io/supertails/cdn/shop/products/DFODF0001TO_1_600x.jpg?v=1696613207",
  },

  {
    name: "SmartHeart",
    image:
      "https://m.media-amazon.com/images/I/41nx7TQndBL._SY300_SX300_QL70_FMwebp_.jpg",
  },

  {
    name: "Applaws",
    image:
      "https://zigly.com/cdn/shop/files/OTRFO16579_b29cd893-1dc4-4cb7-9621-388d84b99ee1.jpg?format=webp&v=1778048696&width=550",
  },

  {
    name: "Vet Pro",
    image:
      "https://static.wixstatic.com/media/0d8787_cc720a9396144725ae94e231d9424c49~mv2.jpeg/v1/fill/w_273,h_275,fp_0.44_0.95,lg_1,q_80,enc_avif,quality_auto/vet-pro.jpeg",
  },
];

export default function Home() {
  const [activeBrand, setActiveBrand] = useState(brands[0]);
  return (
    <main>
      <Hero />

      <section className="section category-section">
        <div className="section-heading">
          <h2>
            <span>Shop By</span> Category
          </h2>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <a className="category-card" href={category.href} key={category.name}>
              <img src={category.image} alt={category.name} />
              <p>{category.name}</p>
            </a>
          ))}
        </div>

        <a className="outline-button" href="/category/all-products">
          View All
        </a>
      </section>

      <section className="deal-section">
        <div className="deal-copy">
          <h2>30% Discount</h2>
          <p className="deal-subtitle">on your first purchase</p>
          <p>
            Keep your pets excited with something new every time! From tasty
            treats and nourishing meals to fun toys and cozy accessories, our
            latest arrivals are here to make every day special.
          </p>
          <a className="primary-button" href="/category/all-products">
            Grab Now
          </a>
        </div>
        <img
          src="https://static.wixstatic.com/media/9b4345_fb0e94c5d08b49e88252ff17f1a0547a~mv2.jpg/v1/fill/w_743,h_501,al_c,q_85,enc_avif,quality_auto/selective-focus-shot-adorable-golden-retriever-outdoors.jpg"
          alt="Golden retriever outdoors"
        />
      </section>

<section className="section brand-section">
  <div className="section-heading">
    <h2>
      <span>Our Top</span> Selling Brands
    </h2>
  </div>

  {/* BRANDS SLIDER */}

  <div className="brand-grid">
    {brands.map((brand) => (
      <button
        key={brand.name}
        className={`brand-pill ${
          activeBrand.name === brand.name ? "active-brand" : ""
        }`}
        onClick={() => setActiveBrand(brand)}
      >
        {brand.name}
      </button>
    ))}
  </div>

  {/* PRODUCTS */}

  <div className="brand-products-slider">
    {[1, 2, 3, 4].map((item) => (
      <div className="brand-product-card" key={item}>
        <img src={activeBrand.image} alt={activeBrand.name} />

        <h4>{activeBrand.name} Product {item}</h4>

        <p>{activeBrand.name}</p>
      </div>
    ))}
  </div>
</section>

      <ProductSection />
    </main>
  );
}