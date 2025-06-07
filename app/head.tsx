// /app/head.tsx

export const metadata = {
  title: "Tafsiri | Translate Kenyan Languages",
  description:
    "Tafsiri.site is a platform for translating English and major Kenyan languages like Kiswahili, Kalenjin, Dholuo, Gikuyu, Somali, and Maasai.",
  icons: {
    icon: "/favicon.ico", // points to public/favicon.ico
    apple: "/apple-touch-icon.png", // optional
  },
  themeColor: "#317EFB",
};

export default function Head() {
  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <link rel="icon" href={metadata.icons.icon} />
      <link rel="apple-touch-icon" href={metadata.icons.apple} />
      <meta name="theme-color" content={metadata.themeColor} />
    </>
  );
}
