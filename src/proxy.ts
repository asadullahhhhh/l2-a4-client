import { NextRequest } from "next/server";
import { userService } from "./service/user.service";

const proxy = async (request: NextRequest) => {
    const { data } =  await userService.getSession()

    // console.log(data.user.role);
}

export const config = {
    matcher: [
        "/"
    ]
}

export default proxy;