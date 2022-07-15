import app from "./app";
import sequelize from "./services/db";

(async () => {

    const port = parseInt(`${process.env.PORT}`)

    await sequelize.sync();

    app.listen(port, () => {
        console.log(`running on port ${process.env.PORT} and db ${process.env.DB_NAME}`);
    });

})();