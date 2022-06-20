const { mongoose } = require("mongoose");

exports.connectDB = () => {
    try {
        mongoose.connect("mongodb+srv://KaKa:7pl0qohPTblWZF0T@cluster0.mfqlq.mongodb.net/friend-chat", () => {
            console.log(`DB connected`)
        })
    } catch (error) {

    }
}
