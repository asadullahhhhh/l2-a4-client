import ProfileDetailsPage from "@/modules/profile/profileDetails";
import { profileService } from "@/service/profile.service";

export const dynamic = "force-dynamic";

const ProfilePage = async () => {

    const { data: userInfo, error } = await profileService.profileDetails()
    const user = userInfo.data

    return (
        <div>
            <ProfileDetailsPage user={user}></ProfileDetailsPage>
        </div>
    )
}

export default ProfilePage;