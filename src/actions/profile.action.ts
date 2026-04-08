import { profileService } from "@/service/profile.service";

const updateProfile = async (value: {name?: string; image?: string}) => {
    const response = await profileService.updateProfile(value);

    return response
}