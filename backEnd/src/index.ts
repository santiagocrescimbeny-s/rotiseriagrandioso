import app from './app';

(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo con éxito en http://localhost:${PORT}`);
});