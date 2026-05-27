import { useState, useRef } from "react";
import ProductCard from "./productcard";
import "./site.css";

const products = [
  {
    name: "Eazypet Vet Tablet 10 Tablet",
    regularPrice: "₹418.00",
    salePrice: "₹400.00",
    href: "/product-page/eazypet-vet-tablet-10-tablet",
    image:
      "https://static.wixstatic.com/media/b64ade_e6863621d95d4e4495471ede49025aa4~mv2.webp/v1/fill/w_300,h_300,al_c,q_85,enc_avif,quality_auto/b64ade_e6863621d95d4e4495471ede49025aa4~mv2.webp",
  },
  {
    name: "Eazypet Puppy Dewormer Vet Oral Suspension 20 Ml",
    regularPrice: "₹205.00",
    salePrice: "₹190.00",
    href: "/product-page/eazypet-puppy-dewormer-vet-oral-suspension-20-ml",
    image:
      "https://static.wixstatic.com/media/b64ade_23f880617426473f93d1d0495a64f72e~mv2.webp/v1/fill/w_300,h_300,al_c,q_85,enc_avif,quality_auto/b64ade_23f880617426473f93d1d0495a64f72e~mv2.webp",
  },
  {
    name: "Worex Suspension 15 Ml",
    regularPrice: "₹110.00",
    salePrice: "₹105.00",
    href: "/product-page/worex-suspension-15-ml-1",
    image:
      "https://static.wixstatic.com/media/b64ade_f2b09383381342dd861f2a56f96df7d3~mv2.webp/v1/fill/w_300,h_300,al_c,q_85,enc_avif,quality_auto/b64ade_f2b09383381342dd861f2a56f96df7d3~mv2.webp",
  },
  {
    name: "Simparica Trio Tablet (40-60kg) 3 Tablet",
    regularPrice: "₹2,745.00",
    salePrice: "₹2,600.00",
    href: "/product-page/simparica-trio-tablet-40-60kg-3-tablet",
    image:
      "https://static.wixstatic.com/media/b64ade_59f207a31255405895fdbb265cd88bd5~mv2.webp/v1/fill/w_300,h_300,al_c,q_85,enc_avif,quality_auto/b64ade_59f207a31255405895fdbb265cd88bd5~mv2.webp",
  },
  {
    name: "Simparica Trio Tablet (2.5-5kg) 3 Tablet",
    regularPrice: "₹1,975.00",
    salePrice: "₹1,875.00",
    href: "/product-page/simparica-trio-tablet-2-5-5kg-3-tablet",
    image:
      "https://static.wixstatic.com/media/b64ade_9f11785c7aa146d9a01a31caf2c89897~mv2.webp/v1/fill/w_300,h_300,al_c,q_85,enc_avif,quality_auto/b64ade_9f11785c7aa146d9a01a31caf2c89897~mv2.webp",
  },
  {
    name: "First Soft Breast Chicken Dog Treats 70 Gm",
    regularPrice: "₹199.00",
    salePrice: "₹190.00",
    href: "/product-page/first-soft-breast-chicken-dog-treats-70-gm",
    image:
      "https://static.wixstatic.com/media/b64ade_e15a865c6382451396608efdf0d26229~mv2.webp/v1/fill/w_300,h_300,al_c,q_85,enc_avif,quality_auto/b64ade_e15a865c6382451396608efdf0d26229~mv2.webp",
  },
  {
    name: "Tik Out Soap 150 Gm",
    regularPrice: "₹147.00",
    salePrice: "₹140.00",
    href: "/product-page/tik-out-soap-150-gm",
    image:
      "https://static.wixstatic.com/media/b64ade_77369263af634b6a997e1583c588b065~mv2.webp/v1/fill/w_300,h_300,al_c,q_85,enc_avif,quality_auto/b64ade_77369263af634b6a997e1583c588b065~mv2.webp",
  },
];

const VISIBLE_COUNT = 4;

export default function ProductSection() {
  const [startIndex, setStartIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const maxIndex = products.length - VISIBLE_COUNT;

  const prev = () => setStartIndex((i) => Math.max(0, i - 1));
  const next = () => setStartIndex((i) => Math.min(maxIndex, i + 1));

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = Math.abs(touchStartY.current - e.changedTouches[0].clientY);
    // Only trigger swipe if horizontal movement dominates
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
      if (deltaX > 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const visibleProducts = products.slice(startIndex, startIndex + VISIBLE_COUNT);

  return (
    <section className="section product-section">
      <div className="section-heading">
        <h2>
          <span>Featured</span> Products
        </h2>
      </div>

      <div
        className="product-carousel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          className="carousel-button"
          onClick={prev}
          disabled={startIndex === 0}
          aria-label="Previous product"
        >
          ‹
        </button>
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.href} product={product} />
          ))}
        </div>
        <button
          className="carousel-button"
          onClick={next}
          disabled={startIndex >= maxIndex}
          aria-label="Next product"
        >
          ›
        </button>
      </div>
    </section>
  );
}