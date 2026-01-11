export interface ProductData {
    code: string;
    product_name?: string;
    brands?: string;
    image_url?: string;
    ingredients_text?: string;
    nutriscore_grade?: string;
    ecoscore_grade?: string;
    nova_group?: number;
}

export const FoodDataService = {
    async getProductByBarcode(barcode: string): Promise<ProductData | null> {
        try {
            const response = await fetch(
                `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
            );

            if (!response.ok) {
                console.error(`Error fetching product: ${response.statusText}`);
                return null;
            }

            const data = await response.json();

            if (data.status === 1 && data.product) {
                return {
                    code: data.code,
                    product_name: data.product.product_name,
                    brands: data.product.brands,
                    image_url: data.product.image_front_url,
                    ingredients_text: data.product.ingredients_text,
                    nutriscore_grade: data.product.nutriscore_grade,
                    ecoscore_grade: data.product.ecoscore_grade,
                    nova_group: data.product.nova_group,
                };
            }

            return null;
        } catch (error) {
            console.error('Network error fetching product:', error);
            return null;
        }
    },
};
