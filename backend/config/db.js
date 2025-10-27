import mongoose from "mongoose";


const connectDB = async () => {
try {
const conn = await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true, // supports authentication ipv6 addresses srv records
         useUnifiedTopology: true // standardizes server discovery and monitoring and failsover behavior making connnections more robust
    });
console.log(`MongoDB Connected: ${conn.connection.host}`);
return conn;
} catch (err) {
console.error("MongoDB connection error:", err.message);
process.exit(1); // is a standard way to end a Node.js process and signal its status to the parent shell or environment.
}
};


export default connectDB;