export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: number;
}

export interface Category {
    id: number;
    name: string;
}

const BASE_URL = 'http://localhost:3000';

//Fetch all products or filtered by cateegory id if provided
export async function fetchProducts (categoryId?: number): Promise<Product[]> {
    let url = `${BASE_URL}/products`;
    if (categoryId !== undefined) {
        url += `?category_id=${categoryId}`;
    }
    const response  = await fetch(url);
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

//Fetch by category
export async function fetchCategories (): Promise<Category[]> {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) {
        throw new Error('Failed to fetch products by category');
    }
    return await response.json() as Promise<Category[]>;
}
