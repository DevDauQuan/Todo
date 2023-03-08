import mongoose from 'mongoose'; // Erase if already required
// Declare the Schema of the Mongo model
var taskSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["default", "personal", "shopping", "wishlist", "work"],
        default: "default"
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, { timestamps: true });

//Export the model
const Task = mongoose.model('Task', taskSchema);
export default Task;