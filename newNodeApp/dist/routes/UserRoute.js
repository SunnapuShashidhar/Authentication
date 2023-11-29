"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserControl_1 = require("../controllers/UserControl");
const User_1 = __importDefault(require("../module/User"));
const router = (0, express_1.Router)();
router.post("/sign-up", UserControl_1.SignUp);
router.post("/sign-in", UserControl_1.SignIn);
router.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("data");
    const users = yield User_1.default.find({});
    res.send({ status: 200, users: users });
}));
router.post("/otpverify", UserControl_1.OtpVerfication);
exports.default = router;
