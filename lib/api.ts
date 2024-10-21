export async function fetchProducts<T>(url: string): Promise<T[]> {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    
    return response.json() as Promise<T[]>;
  }