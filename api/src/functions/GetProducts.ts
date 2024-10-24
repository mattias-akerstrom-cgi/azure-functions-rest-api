import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import productService from "../services/product.services";

export async function GetProducts(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const products = await productService.read();
    return {
        status: 201,
        jsonBody: {products}
    };

    } catch (error: unknown) {
        const err = error as Error;
        context.error(`Error getting products: ${err.message}`);

        return {
            status: 500,
            jsonBody: {
                error: "Failed to fetch products",
            }
        };
    }
};
