// ─────────────────────────────────────────────────────────────
// FILE: server/config/db.js
// PURPOSE: Connect our Express server to MongoDB Atlas
// CALLED BY: server.js (once, right when the server starts)
// ─────────────────────────────────────────────────────────────

// mongoose is the library that lets JavaScript talk to MongoDB.
// Without mongoose, we'd have to write raw MongoDB queries.
// With mongoose, we write clean JavaScript objects (schemas/models).
const mongoose = require("mongoose");

const connectDB = async () => {
  // We wrap everything in try/catch because connecting to a remote
  // database CAN fail — wrong password, no internet, Atlas is down, etc.
  // try  = attempt the connection
  // catch = if it fails, handle it gracefully instead of crashing silently
  try {
    // mongoose.connect() opens the connection to MongoDB Atlas.
    // process.env.MONGO_URI reads the value from your .env file.
    // dotenv (loaded in server.js) makes process.env.MONGO_URI available here.
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // conn.connection.host tells us WHICH Atlas cluster we connected to.
    // This is useful to confirm you're connected to the right database.
    // Example output: "✅ MongoDB Connected: campusconnect.jjio1zr.mongodb.net"
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    // If connection fails, log the exact error message so you know WHY.
    // Common reasons:
    //   - Wrong password in MONGO_URI
    //   - IP address not whitelisted in Atlas Network Access
    //   - No internet connection
    //   - Typo in the connection string
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);

    // process.exit(1) stops the entire Node.js server immediately.
    // WHY? Because if there's no database, the server is useless.
    // It can't save users, can't fetch opportunities, can't do anything.
    // Better to crash loudly than run silently with no database.
    // 1 = exit with an error code (0 would mean "exited successfully")
    process.exit(1);
  }
};

// Export the function so server.js can import and call it.
module.exports = connectDB;