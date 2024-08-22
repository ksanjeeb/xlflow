/* eslint-disable @typescript-eslint/no-explicit-any */
import GradientOverlay from "@/components/ui/gradient-overlay";
import {  Outlet  } from "react-router-dom";

const Layout = () => {

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col m-6 md:mx-8 lg:mx-24 md:my-2 sm:gap-4 sm:py-4 sm:pl-14" >
                <GradientOverlay />
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
