import Header from "./Header";
import StyledComponentsRegistry from "./lib/registry";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <header>
        <StyledComponentsRegistry>
          <Header />
        </StyledComponentsRegistry>
      </header>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
