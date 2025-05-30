// app/config.ts
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  ENDPOINTS: {
    TRANSLATE: "/translate",
    FLAG: "/flag"
  }
};