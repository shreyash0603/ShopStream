export function Footer() {
  return (
    <footer className="mt-auto border-t bg-background">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ShopStream. All rights reserved.</p>
        <p className="mt-1">Built with Next.js and ShadCN UI.</p>
      </div>
    </footer>
  );
}
