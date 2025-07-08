import { getBrands } from "../../services/product/brand.service.js";

export const getAllBrands = async (req, res, next) => {
    try {
        const brands = await getBrands();
        return res.status(200).json(brands);
    } catch (error) {
        next(error);
    }
}