
const BASE_URL = await import.meta.env.VITE_API_URL;

// Define a class for the item service
class ItemService {
    // Method to fetch items from the server
    static fetchItems(): Promise<Response> {
        return fetch(`${BASE_URL}/items`);
    }
}

export default ItemService; // Export the ItemService class