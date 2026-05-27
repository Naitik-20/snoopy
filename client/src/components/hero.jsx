import { useEffect, useState } from "react";
import "./site.css";

const slides = [
  {
    title: [
      [{ text: "Nutritious Meals", color: "orange" }],
      [{ text: "for Every Paw", color: "blue" }],
    ],
    button: "Shop Now",
    href: "/food",
    image:
      "https://static.wixstatic.com/media/0d8787_b8cb367b85b64be29891f069e6e194ee~mv2.jpg/v1/fill/w_1442,h_720,fp_0.44_0.46,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-1.jpg",
    alt: "Customer shopping pet food with a dog",
  },

  {
    title: [
      [
        { text: "Treats", color: "orange" },
        { text: "That", color: "blue" },
      ],
      [
        { text: "Make", color: "blue" },
        { text: "Them", color: "orange" },
      ],
      [
        { text: "Jump", color: "orange" },
        { text: "for Joy", color: "blue" },
      ],
    ],
    button: "Shop Now",
    href: "/category/snacks-treats",
    image:
      "https://static.wixstatic.com/media/0d8787_85d87b25e5a4487ebc803b57dcb8814e~mv2.jpg/v1/fill/w_1442,h_720,fp_0.44_0.46,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-2.jpg",
    alt: "Happy dog in a pet food aisle",
  },

  {
    title: [
      [
        { text: "Grooming", color: "orange" },
        { text: "Care", color: "blue" },
      ],
      [
        { text: "for Shiny", color: "orange" },
        { text: "Coats", color: "blue" },
      ],
    ],
    button: "Shop Now",
    href: "/grooming-essentials",
    image:
      "https://static.wixstatic.com/media/0d8787_5f63d90f1e3848499b17bbb5fa323035~mv2.jpg/v1/fill/w_1442,h_720,fp_0.44_0.46,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-3.jpg",
    alt: "Pet grooming products",
  },

  {
    title: [
      [
        { text: "Stylish", color: "orange" },
        { text: "Comfort", color: "blue" },
      ],
      [
        { text: "for Every", color: "orange" },
        { text: "Walk", color: "blue" },
      ],
    ],
    button: "Shop Now",
    href: "/accessories",
    image:
      "https://static.wixstatic.com/media/0d8787_b149c07a1aad40cc89b91344bd966ead~mv2.jpg/v1/fill/w_1442,h_720,fp_0.44_0.46,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-4.jpg",
    alt: "Pet accessories in store",
  },

  {
    title: [
      [
        { text: "Playtime", color: "orange" },
        { text: "Made", color: "blue" },
      ],
      [
        { text: "Happy", color: "orange" },
        { text: "Again", color: "blue" },
      ],
    ],
    button: "Shop Now",
    href: "/toys",
    image:
      "https://static.wixstatic.com/media/0d8787_98d13964e2cf4bf9bdb8a855e499575b~mv2.jpg/v1/fill/w_1442,h_720,fp_0.44_0.46,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-5.jpg",
    alt: "Pet toys display",
  },

  {
    title: [
      [
        { text: "Trusted", color: "orange" },
        { text: "Pet", color: "blue" },
      ],
      [
        { text: "Pharmacy", color: "orange" },
        { text: "Care", color: "blue" },
      ],
    ],
    button: "Shop Now",
    href: "/pharmacy",
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1200&auto=format&fit=crop",
    alt: "Pet pharmacy products",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === current ? "active" : ""}`}
          style={{
            backgroundImage: `url(${slide.image})`,
          }}
        >
          <div className="overlay">
            <div className="content">
              {slide.title.map((line, i) => (
                <h1 key={i}>
                  {line.map((word, j) => (
                    <span key={j} className={word.color}>
                      {word.text}{" "}
                    </span>
                  ))}
                </h1>
              ))}

              <a href={slide.href}>
                <button>{slide.button}</button>
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}