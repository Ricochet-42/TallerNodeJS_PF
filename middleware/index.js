module.exports = (req, res, next) => {
    return res.status(220).json({ code: 1, message: "Bienvenido al menu de usuarios" });
};
