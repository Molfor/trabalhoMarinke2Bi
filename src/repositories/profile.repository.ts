import Profile, { ProfileCreationAttributes } from "../models/profile.model";

class ProfileRepository {
  async bulkCreateProfiles(profiles: ProfileCreationAttributes[]): Promise<void> {
    await Profile.bulkCreate(profiles);
  }
}

export default new ProfileRepository();
