const user = require("../models/userModel");
const ad = require("../models/adsModel");


const deleteAd = async (req, res) => {
    const { id } = req.params;
    try {
        const ads = await ad.findByIdAndDelete(id);
        if (!ads) {
            return res.status(404).json({ message: "No ads found" })
        }
        console.log(id);
        return res.status(200).json({ message: "ad deleted", ads });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }

}
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await user.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "User deleted succesfully", deletedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getAllusers = async (req, res) => {

    try {
        const allUsers = await user.find();
        if (!allUsers) {
            return res.status(404).json({ message: "No users found" })
        }
        res.status(200).json({ message: "Users fetched ", data: allUsers })
    } catch (error) {
        console.log(error);
    }
}

const getUsersByRole = async (req, res) => {
    const { role } = req.params;
    if (!role) {
        return res.status(400).json({ message: "Invalid data" })
    }
    try {
        const usersByRole = await user.find({ role });
        if (!usersByRole) {
            return res.status(404).json({ message: "No roles found" })
        }
        res.status(200).json({ message: "User fetched by role:", data: usersByRole })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }

}

module.exports = { deleteUser, deleteAd, getAllusers, getUsersByRole };