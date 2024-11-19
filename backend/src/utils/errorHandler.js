export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    });
};
