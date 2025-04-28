jest.setTimeout(30000);

const mongoose = require("mongoose");

const mongoUrl =
  "mongodb+srv://guptapankaj029:B7X6RZHAcwFuzJZN@cluster0.lg1z23l.mongodb.net/nasa?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connection.once("open", () => {
  console.log("connection is open");
});

mongoose.connection.on("error", (err) => {
  console.error(`error in connection ${err}`);
});

async function mongoConnect() {
  await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
