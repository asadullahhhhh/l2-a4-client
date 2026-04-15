import { NextRequest, NextResponse } from "next/server";
import { userService } from "./service/user.service";
import { userRoles } from "./types/role";
import { providerService } from "./service/provider.service";

const proxy = async (request: NextRequest) => {
    const pathname = request.nextUrl.pathname

    let isAuthenticated = false;
    let isAdmin = false;
    let isProvider = false;

    const { data } =  await userService.getSession()
    const {data: providerData} = await providerService.getProviderData()

    if(data) {
        isAuthenticated = true;
        isAdmin = data.user.role === userRoles.admin;
        isProvider = data.user.role === userRoles.provider;
    }

    if(!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if(!isProvider && pathname.startsWith("/config-provider-profile")) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    if(isAdmin && pathname.startsWith("/provider-dashboard")) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url))
    }

    if(isProvider && pathname.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL("/provider-dashboard", request.url))
    }

    return NextResponse.next()
}

export const config = {
  matcher: [
    '/provider-dashboard', 
    "/provider-dashboard/:path*", 
    "/admin-dashboard", 
    "/admin-dashboard/:path*" ,
    "/profile",
    "/cart",
    "/config-provider-profile"
]
}

export default proxy;