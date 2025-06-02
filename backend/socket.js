const { Server } = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;
let connectedUsers = 0; // Track the number of connected users

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: [ "http://localhost:5173", "https://uber-clone-frontend.vercel.app"],
      methods: ["GET", "POST"],
    },
  });
  
  io.on("connection", (socket) => {
    connectedUsers++;
    console.log(`[${new Date().toISOString()}] ✅ A user connected: ${socket.id} | Total connected: ${connectedUsers}`);


    socket.onAny((event, ...args) => {
      console.log(`[${new Date().toISOString()}] 📢 Received event: ${event}`, args);
    });

    socket.on("join", async (data) => {
      console.log("🟡 Received join event:", data);

      // Validate data object
      if (!data || typeof data !== "object") {
        console.warn("❌ Invalid data received:", data);
        socket.emit("joinError", { message: "Invalid data format." });
        return;
      }

      const { userId, userType } = data;

      if (!userId || !userType) {
        console.warn("❌ Missing userId or userType:", data);
        socket.emit("joinError", { message: "Missing userId or userType." });
        return;
      }

      console.log(`✅ User joined: ${userId} (${userType})`);

      try {
        let updatedUser;
        if (userType === "user") {
          updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { socketId: socket.id },
            { new: true }
          );
        } else if (userType === "captain") {
          updatedUser = await captainModel.findByIdAndUpdate(
            userId,
            { socketId: socket.id },
            { new: true }
          );
        } else {
          console.warn("❌ Invalid userType:", userType);
          socket.emit("joinError", { message: "Invalid userType." });
          return;
        }

        if (updatedUser) {
          console.log(`✅ ${userType} socket updated:`, updatedUser);
          socket.emit("joinSuccess", { message: "Joined successfully!" });
        } else {
          console.warn(`⚠️ No matching ${userType} found in database.`);
          socket.emit("joinError", { message: "User not found in database." });
        }
      } catch (error) {
        console.error("❌ Database update error:", error);
        socket.emit("joinError", { message: "Database update failed." });
      }
    });
    
    socket.on('update-location-captain', async (data) => {
      const { userId, latitude,longitude } = data;

      if(!userId ||!latitude || !longitude) {
     
        return socket.emit("locationError", { message: "Invalid location data." });
      }
      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd:latitude,
          lng:longitude
        }
      });
    });

    socket.on("disconnect", async () => {
      connectedUsers--;
      console.log(`[${new Date().toISOString()}] ❌ User disconnected: ${socket.id} | Total connected: ${connectedUsers}`);

      try {
        await userModel.updateMany(
          { socketId: socket.id },
          { $unset: { socketId: "" } }
        );
        await captainModel.updateMany(
          { socketId: socket.id },
          { $unset: { socketId: "" } }
        );

        console.log(`[${new Date().toISOString()}] ✅ Cleared socketId for disconnected user.`);
      } catch (error) {
        console.error(`[${new Date().toISOString()}] ❌ Error clearing socketId:`, error);
      }
    });
  });
}

function sendMessageToSocket(socketId, messageObject) {
  console.log(`[${new Date().toISOString()}] 📬 Sending message to socket: ${socketId}`, messageObject);
  if(io){
    io.to(socketId).emit(messageObject.event, messageObject.data);

  }else{
    console.error("❌ Socket.io not initialized.");
  }
}

module.exports = { initializeSocket, sendMessageToSocket };