import express from "express"
const router = express.Router();
import {userContactController,getAllContacts} from "../controllers/contactControllers.js"
import {requireSignIn,isAdmin} from "../middlewares/authMiddleware.js"

router.post("/user-contact",userContactController)
router.get("/get-contact",requireSignIn,isAdmin,getAllContacts)

export default router;