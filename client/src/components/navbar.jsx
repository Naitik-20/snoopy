import "./site.css";
import { Link } from "react-router-dom";
const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/category/all-products" },
  { label: "Shop By Category", href: "/category/all-products" },
  { label: "Services", href: "/services" },
  { label: "Online Consultation", href: "/online-consultation" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="header-top">
      <a className="brand-card" href="/" aria-label="Dr Snoopy home">
  <img
    className="navbar-logo"
    loading="lazy"
    src="https://static.wixstatic.com/media/0d8787_61686ab825844d1c9729eaafb29592b7~mv2.jpg/v1/crop/x_449,y_411,w_1411,h_980/fill/w_299,h_206,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Dr%20Snoopy%20Logo_06%20(1).jpg"
    alt="Dr Snoopy Logo"
    fetchPriority="high"
  />
</a>

        <div className="header-actions">
          <button className="icon-button" aria-label="Search">
            <span>⌕</span>
          </button>
          <Link to="/login">Log In</Link>
       <button className="icon-button user-icon">
  <svg
    className="user-svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
  >
    <g>
      <path d="M25 48.077c-5.924 0-11.31-2.252-15.396-5.921 2.254-5.362 7.492-8.267 15.373-8.267 7.889 0 13.139 3.044 15.408 8.418-4.084 3.659-9.471 5.77-15.385 5.77m.278-35.3c4.927 0 8.611 3.812 8.611 8.878 0 5.21-3.875 9.456-8.611 9.456s-8.611-4.246-8.611-9.456c0-5.066 3.684-8.878 8.611-8.878M25 0C11.193 0 0 11.193 0 25c0 .915.056 1.816.152 2.705.032.295.091.581.133.873.085.589.173 1.176.298 1.751.073.338.169.665.256.997.135.515.273 1.027.439 1.529.114.342.243.675.37 1.01.18.476.369.945.577 1.406.149.331.308.657.472.98.225.446.463.883.714 1.313.182.312.365.619.56.922.272.423.56.832.856 1.237.207.284.41.568.629.841.325.408.671.796 1.02 1.182.22.244.432.494.662.728.405.415.833.801 1.265 1.186.173.154.329.325.507.475l.004-.011A24.886 24.886 0 0 0 25 50a24.881 24.881 0 0 0 16.069-5.861.126.126 0 0 1 .003.01c.172-.144.324-.309.49-.458.442-.392.88-.787 1.293-1.209.228-.232.437-.479.655-.72.352-.389.701-.78 1.028-1.191.218-.272.421-.556.627-.838.297-.405.587-.816.859-1.24a26.104 26.104 0 0 0 1.748-3.216c.208-.461.398-.93.579-1.406.127-.336.256-.669.369-1.012.167-.502.305-1.014.44-1.53.087-.332.183-.659.256-.996.126-.576.214-1.164.299-1.754.042-.292.101-.577.133-.872.095-.89.152-1.791.152-2.707C50 11.193 38.807 0 25 0"></path>
    </g>
  </svg>
</button>
          <button className="cart-button" aria-label="Cart">
            <span><svg   className="cart-svg" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" viewBox="0 0 197.7 166" preserveAspectRatio="xMinYMax meet" data-hook="svg-icon-2"><path d="M79.3913 147.956C79.3913 141.977 74.5443 137.13 68.5652 137.13C62.5861 137.13 57.7391 141.977 57.7391 147.956C57.7391 153.935 62.5861 158.782 68.5652 158.782C74.5443 158.782 79.3913 153.935 79.3913 147.956ZM86.6087 147.956C86.6087 157.921 78.5303 166 68.5652 166C58.6001 166 50.5217 157.921 50.5217 147.956C50.5217 137.991 58.6001 129.913 68.5652 129.913C78.5303 129.913 86.6087 137.991 86.6087 147.956Z" fill="black"></path><path d="M144.348 147.956C144.348 141.977 139.501 137.13 133.522 137.13C127.543 137.13 122.696 141.977 122.696 147.956C122.696 153.935 127.543 158.782 133.522 158.782C139.501 158.782 144.348 153.935 144.348 147.956ZM151.565 147.956C151.565 157.921 143.487 166 133.522 166C123.557 166 115.478 157.921 115.478 147.956C115.478 137.991 123.557 129.913 133.522 129.913C143.487 129.913 151.565 137.991 151.565 147.956Z" fill="black"></path><path d="M19.1289 0C24.4107 0.00134637 28.9694 3.78942 29.8352 9.09222H29.8281L48.4496 120.877C49.3148 126.065 53.8766 129.913 59.1135 129.913H137.13V137.13H59.1135C50.3492 137.13 42.7757 130.731 41.3308 122.061L22.7094 10.2622V10.2552C22.4207 8.48681 20.9177 7.21872 19.1289 7.21739H0V0H19.1289Z" fill="black"></path><path d="M158.783 84.156V28.8696H166V84.156C165.999 89.453 162.204 93.8928 157.021 94.7706L157.028 94.7847L40.3229 115.351L39.0684 108.247L155.773 87.673L155.808 87.666C157.538 87.3772 158.782 85.921 158.783 84.156Z" fill="black"></path><text data-hook="items-count" class="uxskpx M846Y_" text-anchor="middle" x="95" y="25" dy=".48em">0</text></svg></span>
         
          </button>
        </div>
      </div>

      <nav className="main-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
            {item.label === "Shop By Category" && <span className="chevron">⌄</span>}
          </a>
        ))}
      </nav>
    </header>
  );
}