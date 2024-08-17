/* eslint-disable @typescript-eslint/no-explicit-any */
import GradientOverlay from "@/components/ui/gradient-overlay";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PackageIcon, SettingsIcon, UploadCloud, Workflow } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";


const navLinks = [
    {
        "to": "/dashboard",
        "icon": "PackageIcon",
        "tooltip": "Dashboard",
        "srText": "Dashboard"
    },
    {
        "to": "/resources",
        "icon": "uploadIcon",
        "tooltip": "Resource Upload",
        "srText": "Resource Upload"
    },
]


interface NavLink {
    to: string;
    icon: string;
    tooltip: string;
    srText: string;
}

const iconMap: any = {
    PackageIcon: PackageIcon,
    uploadIcon: UploadCloud,
};



function getFirstRoute(pathname: string, current: string): string {
    const trimmedPath = pathname.replace(/^\/|\/$/g, '');
    const firstRoute = trimmedPath.split('/')[0];
    return firstRoute === current ? "bg-accent text-accent-foreground" : "text-muted-foreground";
}

const Layout = () => {
    const location = useLocation();

    const buttonClasses = `
    flex 
    h-9 w-9 
    items-center 
    justify-center 
    rounded-lg 
    text-muted-foreground 
    transition-colors 
    hover:text-foreground 
    md:h-8 
    md:w-8
  `;


    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-50 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <TooltipProvider>
                        <Link
                            to="/dashboard"
                            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                        >
                            <Workflow className="h-4 w-4 transition-all group-hover:scale-110" />
                            <span className="sr-only">xlFlow</span>
                        </Link>
                        {navLinks.map((link: NavLink) => {
                            const IconComponent = iconMap[link.icon];
                            return (
                                <Tooltip key={link.to}>
                                    <TooltipTrigger asChild>
                                        <Link
                                            to={link.to}
                                            className={`${buttonClasses.trim()} ${getFirstRoute(location.pathname, link.to.substring(1))}`}
                                        >
                                            <IconComponent className="h-5 w-5" />
                                            <span className="sr-only">{link.srText}</span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">{link.tooltip}</TooltipContent>
                                </Tooltip>
                            );
                        })}
                    </TooltipProvider>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to="/settings"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <SettingsIcon className="h-5 w-5" />
                                    <span className="sr-only">Settings</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Settings</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>
            <div className="flex flex-col m-6 md:mx-8 md:my-2 sm:gap-4 sm:py-4 sm:pl-14" >
                <GradientOverlay />
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
