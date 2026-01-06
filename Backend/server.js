require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `Server is started on port ${PORT} & is ready to listen request`
      );
      ("");
    });
  } catch (error) {
    console.error("Server Startup failed:", error);
    process.exit(1);
  }
}
startServer();
