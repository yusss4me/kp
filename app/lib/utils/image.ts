export function getImageUrl(path?: string | null): string {
  if (!path) return "/images/hero.png";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://yamuti-backend.onrender.com";
  const rootUrl = baseUrl.replace(/\/api\/?$/, ''); // Remove /api or /api/
  
  const cleanRootUrl = rootUrl.endsWith('/') ? rootUrl.slice(0, -1) : rootUrl;
  let cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Laravel stores uploaded files in storage/app/public but accesses them via /storage/
  if (!cleanPath.startsWith('storage/')) {
    cleanPath = `storage/${cleanPath}`;
  }
  
  return `${cleanRootUrl}/${cleanPath}`;
}
