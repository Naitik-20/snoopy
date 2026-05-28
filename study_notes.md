# Snoopy Project Learning & Deployment Notes

## Concept: Local vs. Production Environments (Dev vs. Prod)

### Core Concept
- **Development Environment**: Hamara local laptop ya PC jahan hum code likhte hain, testing karte hain (`localhost:5173` aur `localhost:5000`). Custom debugging inputs aur tools display hote hain.
- **Production Environment (Live)**: Jab website actual internet pe live ho jaati hai taaki real users use kar sakein. Yahan hardcoded `localhost` URLs nahi chalte. HTTPS, secure headers, aur custom domains control kiya jaata hai.

### Data Flow Understanding
- **Local Dev Flow**:
  `Client Browser (localhost:5173)` -> `Express server (localhost:5000)` -> `In-Memory Server State (RAM)`
- **Production Flow**:
  `User Browser (Vercel/Netlify HTTPS URL)` -> `Production API Server (Render/Railway HTTPS URL)` -> `Persistent Database (MongoDB Atlas) + Image Bucket (Cloudinary/S3)`

### Runtime Understanding
- Dev: Nodemon automatic restarts triggers karta hai on save, hot reloading enabled.
- Prod: Process manager (jaise PM2 ya cloud runner) crash par restart handle karta hai. State transient nahi honi chahiye (Stateless API principles).

---

## Concept: State Persistence (In-memory Storage vs Database)

### Core Concept
- **In-memory Storage**: Data transient hota hai (RAM me store hota hai). Server restart ya crash hone par data clear ho jaata hai. Currently `server.js` isi approach par configured hai.
- **Database Storage**: Data disk par write hota hai aur process restarts se safe rehta hai (Persistent database).

### Data Flow Understanding
- **Add Product Flow (Current)**:
  `Admin UI Form` -> `POST /api/products` (Multipart Form) -> `Multer saves to server/public/images` -> `Pushed to RAM products array`
- **Add Product Flow (Production Ready)**:
  `Admin UI Form` -> `POST /api/products` -> `Uploads to Cloudinary (receives CDN URL)` -> `Saves product metadata with image CDN URL into MongoDB Atlas`

### Runtime Understanding
- Serverless / Free Tier nodes (Render/Heroku) periodically go to sleep. Sleep mode se wake up hone par RAM wipe out ho jata hai, means current products table default state par reset ho jayegi aur custom images upload delete ho jayenge.

---

## Concept: Git Remote & Code Pushing (Local-to-Cloud Sync)

### Core Concept
- **Git Repository**: local project folder jahan Git history save karta hai.
- **Git Remote**: Cloud backup platform (jaise GitHub) jahan code push karke share kiya jata hai.
- **Pushing**: Apne local updates ko local database (`.git` directory) se cloud server repository par upload karna.

### Data Flow Understanding
`Your Local IDE Changes` -> `Staged (git add)` -> `Committed in local .git index (git commit)` -> `Pushed to cloud remote repository (git push)` -> `GitHub Cloud Server`

### Runtime Understanding
- Agar remote repository par koi external changes pehle se commit ho chuki hain jo aapke local branch par nahi hain, toh direct push error dega (`rejected - non-fast-forward`). Pehle changes ko local repository me pull aur rebase (`git pull --rebase`) karna padta hai.

---

## Concept: Case Sensitivity & Component Renaming in Git (Windows vs. Linux)

### Core Concept
- **Case Sensitivity Mismatch**: Windows and macOS (by default) filesystems are case-insensitive (matlab OS ke liye `ProductCard.jsx` aur `productCard.jsx` identical hain). Lekin Linux servers (jahan hum live websites host karte hain, e.g., Vercel, Render, AWS, Netlify) strictly **case-sensitive** hote hain.
- **Git `ignorecase` Config**: Windows environment me Git default me `core.ignorecase = true` par set hota hai. Agar aap direct lowercase se uppercase folder/file rename karte ho, toh Git status me changes detect nahi hotey.

### Data Flow & Import Resolution
- **Dev Compiler Flow (Windows)**:
  `App.jsx` (`import ProductCard`) -> Resolves to `components/productCard.jsx` -> Compiles & runs locally.
- **Prod Build Flow (Linux/Vercel)**:
  `App.jsx` (`import ProductCard`) -> Looks for `components/ProductCard.jsx` -> Fails (kyuki Git me lowercase `productCard.jsx` store hua hai) -> Build crashes with `ModuleNotFound` error.

### Runtime & Workflow Fixing (Bypassing the Casing Trap)
Git me standard uppercase renaming force karne ke liye hum **two-step renaming** use karte hain:
1. File ko temporary name do:
   `git mv client/src/components/productCard.jsx client/src/components/ProductCardTemp.jsx`
2. Final capitalized name me rename karo:
   `git mv client/src/components/ProductCardTemp.jsx client/src/components/ProductCard.jsx`
Isse Git history me capital casing permanently register ho jaati hai!


