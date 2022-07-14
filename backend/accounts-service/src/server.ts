import app from "./app";

const port = parseInt(`${process.env.PORT}`)

app.listen(port, ()=> {
    console.log(`running on port ${process.env.PORT}`);
});