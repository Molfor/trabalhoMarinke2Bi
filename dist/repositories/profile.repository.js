"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_model_1 = __importDefault(require("../models/profile.model"));
class ProfileRepository {
    async bulkCreateProfiles(profiles) {
        await profile_model_1.default.bulkCreate(profiles);
    }
}
exports.default = new ProfileRepository();
