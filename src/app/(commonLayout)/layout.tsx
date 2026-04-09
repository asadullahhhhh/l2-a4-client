import Footer from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { userService } from "@/service/user.service";

const CommonLayout = async({ children }: { children: React.ReactNode }) => {
    const session = await userService.getSession()
    return (
        <div>  
            <Navbar session={session}></Navbar>
            {children}
            <Footer></Footer>
        </div>
    );
}

export default CommonLayout;