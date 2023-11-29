import { Router } from "express";
import { OtpVerfication, SignIn, SignUp } from "../controllers/UserControl";
import User from "../module/User";

const router = Router();

router.post("/sign-up", SignUp);
router.post("/sign-in", SignIn);

router.get("/user", async (req, res) => {
  console.log("data");
  const users = await User.find({});
  res.send({ status: 200, users: users });
});
router.post("/otpverify", OtpVerfication);
export default router;
