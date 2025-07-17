const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


const kampanyeRoutes = require("./routes/kampanyeRoutes");
const masjidRoutes = require("./routes/masjidRoutes");
const artikelRoutes = require("./routes/artikelRoutes");
const eventRoutes = require("./routes/eventRoutes");
const pengajuanRoutes = require("./routes/pengajuanRoutes");


app.use("/api/kampanye", kampanyeRoutes);
app.use("/api/masjid", masjidRoutes)
app.use("/api/artikel", artikelRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/pengajuan", pengajuanRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(3000, () => console.log("Server running on port 3000"));
    })
    .catch((err) => console.error(err));
