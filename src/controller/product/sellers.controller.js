import { getSellers } from "../../services/product/sellers.service.js";

export const getAllSellers = async (req, res, next) => {
    try {
        const sellers = await getSellers();
        return res.status(200).json(sellers);

    } catch (error) {
        next(error)
    }
}