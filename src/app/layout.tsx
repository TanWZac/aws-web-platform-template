import "./globals.css";

export const metadata = {
  title: "AWS Web Platform Template",
  description: "Reusable web application template for AWS-hosted platforms",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{props.children}</body>
    </html>
  );
}
