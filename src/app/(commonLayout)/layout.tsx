import { Navbar } from "@/components/shared/navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>  
            <Navbar></Navbar>
            {children}
        </div>
    );
}

export default CommonLayout;