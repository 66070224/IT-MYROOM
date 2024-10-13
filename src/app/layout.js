import { AuthProvider } from "./Providers";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "./components/Nav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "IT myRoom",
  description: "room/seat reservation for IT ladkrabang",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Nav/>
          <div className="relative flex justify-center items-center min-h-screen">
            <div className="absolute inset-0 bg-[url('/backgroundit.jpg')] bg-cover bg-center filter blur-sm -z-10"></div>
            <div className="px-4 mx-auto">{children}</div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
