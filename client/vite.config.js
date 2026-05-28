import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

const src = 'C:\\Users\\AYUSH-ANAND\\.gemini\\antigravity-ide\\brain\\9881acd4-147f-4152-9d45-22562fef76aa\\media__1779975316056.png';
const dest = 'e:\\Web Development Bootcamp\\30_snoopy\\client\\public\\contact-hero-bg.png';

try {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('SUCCESS: Copied contact image via vite.config.js!');
  } else {
    console.log('Vite copy: src path does not exist', src);
  }
} catch (err) {
  console.error('Vite copy error:', err);
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
