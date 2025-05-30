export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: number;
}

const BASE_URL = 'http://localhost:3000';

//Fetch all products
export async function fetchProducts (): Promise<Product[]> {
    const response  = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return await response.json() as Product[];
}

//Fetch product by ID
export async function fetchProductById(id: string | number): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }
    return await response.json() as Product;
}

