export async function fetchProducts<T>(url: string): Promise<T[]> {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products url: ${response.url}`);
    }
    
    return response.json() as Promise<T[]>;
}

export async function fetchProduct<T>(url: string): Promise<T> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch products url: ${response.url}`);
  }
  
  return response.json() as Promise<T>;
}