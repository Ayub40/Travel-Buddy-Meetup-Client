"use server";

import Link from "next/link";
import { Menu, ChevronDown, BookOpen, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "../ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"; 

import LogoutButton from "./LogoutButton";
import { getUserInfo } from "@/service/auth/getUserInfo";

const PublicNavbar = async () => {
  const user = await getUserInfo();

  const role = user?.role;
  const isLoggedIn = !!user?.email;


  const publicNav = [
    { href: "/", label: "Home" },
    { href: "/allTravelPlan", label: "Explore Travelers" },
    { href: "/find-buddy", label: "Find Travel Buddy" },
    { href: "/about", label: "About Us" }, 
    { href: "/contact", label: "Contact" }, 
  ];

  const userNav = [
    { href: "/", label: "Home" },
    { href: "/allTravelPlan", label: "Explore Travelers" },
    { href: "/dashboard/my-travel-plan", label: "My Travel Plans" },
    { href: "/find-buddy", label: "Find Travel Buddy" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  const adminNav = [
    { href: "/", label: "Home" },
    { href: "/admin/dashboard", label: "Admin Dashboard" },
    { href: "/admin/dashboard/user-management", label: "Manage Users" },
    { href: "/admin/dashboard/travel-management", label: "Manage Travel Plans" },
    { href: "/admin/dashboard/admin-profile", label: "Profile" },
    { href: "/contact", label: "Contact" },
  ];


  const resourceItems = [
    { href: "/blogs", label: "Travel Blogs", icon: BookOpen },
    { href: "/safety", label: "Safety Tips", icon: ShieldCheck },
    { href: "/offers", label: "Special Offers", icon: Sparkles },
  ];

  let navItems = publicNav;
  if (isLoggedIn && role === "USER") navItems = userNav;
  if (isLoggedIn && role === "ADMIN") navItems = adminNav;

  return (
    // Sticky Navbar with backdrop-blur
    <header className="sticky top-0 z-50 w-full bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-gray-200/50 transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">

        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          TripMates Hub
        </Link>

        {/* Desktop Menu (6+ Routes ensured) */}
        <nav className="hidden lg:flex items-center space-x-2 text-sm font-medium">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="px-3 py-2 rounded text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
            >
              {item.label}
            </Link>
          ))}

          {/* Advanced Menu (Dropdown) */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 rounded-full text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-blue-50/50 outline-none transition-all">
              Resources <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52 p-2 rounded-xl bg-white/90 backdrop-blur-lg border-white/20">
              {resourceItems.map((res) => (
                <DropdownMenuItem key={res.label} asChild>
                  <Link href={res.href} className="flex items-center gap-2 p-2 cursor-pointer rounded-lg hover:bg-blue-50">
                    <res.icon size={16} className="text-blue-600" />
                    <span>{res.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {!isLoggedIn ? (
            <>
              <Link href="/login">
                <Button className="rounded bg-blue-600 hover:bg-blue-700">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="rounded bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200">Register</Button>
              </Link>
            </>
          ) : (
            <>
              {role === "USER" && (
                <Link href="/dashboard/pricing-page">
                  <Button variant="outline" className="rounded-full">Upgrade Plan</Button>
                </Link>
              )}
              <Link href={role === "ADMIN" ? "/admin/dashboard" : "/dashboard"}>
                <Button className="rounded px-6">Dashboard</Button>
              </Link>
              <LogoutButton />
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full"><Menu /></Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] p-6 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-l border-white/20" >
              <SheetTitle className="text-xl font-bold border-b pb-4">TripMates</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => (
                  <Link key={item.label} href={item.href} className="text-lg font-medium hover:text-blue-600 transition">
                    {item.label}
                  </Link>
                ))}
                
                {/* Mobile Resources Section */}
                <div className="pt-4 border-t">
                  <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Resources</p>
                  {resourceItems.map((res) => (
                    <Link key={res.label} href={res.href} className="flex items-center gap-3 py-2 text-lg">
                       <res.icon size={18} className="text-blue-600" /> {res.label}
                    </Link>
                  ))}
                </div>

                <div className="border-t pt-6 mt-auto">
                  {!isLoggedIn ? (
                    <div className="space-y-3">
                      <Link href="/login" className="block w-full"><Button className="w-full rounded-xl">Login</Button></Link>
                      <Link href="/register" className="block w-full"><Button variant="outline" className="w-full rounded-xl">Register</Button></Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link href={role === "ADMIN" ? "/admin/dashboard" : "/dashboard"} className="block w-full">
                        <Button className="w-full rounded-xl">Dashboard</Button>
                      </Link>
                      <LogoutButton />
                    </div>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;












// "use server";

// import Link from "next/link";
// import { Menu } from "lucide-react";
// import { Button } from "../ui/button";
// import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "../ui/sheet";

// import LogoutButton from "./LogoutButton";
// import { getUserInfo } from "@/service/auth/getUserInfo";

// const PublicNavbar = async () => {
//   const user = await getUserInfo();

//   const role = user?.role;
//   const isLoggedIn = !!user?.email;

//   // Logged Out Menu
//   const publicNav = [
//     { href: "/", label: "Home" },
//     { href: "/allTravelPlan", label: "Explore Travelers" },
//     { href: "/find-buddy", label: "Find Travel Buddy" },
//   ];

//   // USER Logged In
//   const userNav = [
//     { href: "/", label: "Home" },
//     { href: "/allTravelPlan", label: "Explore Travelers" },
//     { href: "/dashboard/my-travel-plan", label: "My Travel Plans" },
//     { href: "/find-buddy", label: "Find Travel Buddy" },
//     // { href: "/dashboard/my-profile", label: "Profile" },
//   ];

//   // ADMIN Logged In
//   const adminNav = [
//     { href: "/", label: "Home" },
//     { href: "/admin/dashboard", label: "Admin Dashboard" },
//     { href: "/admin/dashboard/user-management", label: "Manage Users" },
//     // { href: "/admin/manage-travel-plans", label: "Manage Travel Plans" },
//     { href: "/admin/dashboard/travel-management", label: "Manage Travel Plans" },
//     // { href: "/my-profile", label: "Profile" },
//     { href: "/admin/dashboard/admin-profile", label: "Profile" },
//   ];

//   // Correct Logic
//   let navItems = publicNav;

//   if (isLoggedIn && role === "USER") navItems = userNav;
//   if (isLoggedIn && role === "ADMIN") navItems = adminNav;

//   return (
//     <header className="sticky top-0 z-50 w-full bg-white/30 dark:bg-black/30 backdrop-blur-xl border-b border-white/20 ">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">

//         {/* Logo */}
//         <Link href="/" className="text-xl font-extrabold tracking-wide bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//           TripMates Hub
//         </Link>

//         {/* Desktop Menu */}
//         <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
//           {navItems.map((item) => (
//             <Link key={item.label} href={item.href} className="relative px-2 py-1 text-gray-800 dark:text-gray-200 hover:text-blue-600 transition after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full">
//               {item.label}
//             </Link>
//           ))}
//         </nav>

//         {/* Desktop Action Buttons */}
//         <div className="hidden md:flex items-center space-x-3">
//           {!isLoggedIn ? (
//             <>
//               <Link href="/login">
//                 <Button>Login</Button>
//               </Link>
//               <Link href="/register">
//                 <Button variant="outline">Register</Button>
//               </Link>
//             </>
//           ) : (
//             <>
//               {role === "USER" && (
//                 <Link href="/dashboard/pricing-page">
//                   <Button variant="outline">Upgrade Plan</Button>
//                 </Link>
//               )}
//               <Link href={role === "ADMIN" ? "/admin/dashboard" : "/dashboard"}>
//                 <Button>Dashboard</Button>
//               </Link>
//               <LogoutButton />
//             </>
//           )}
//         </div>

//         {/* Mobile Menu */}
//         <div className="md:hidden">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="outline"><Menu /></Button>
//             </SheetTrigger>

//             {/* <SheetContent className="p-4 w-[300px]" side="right"> */}
//             <SheetContent
//               side="right"
//               className="w-[300px] p-4 bg-white/40 dark:bg-black/40 backdrop-blur-xl border-l border-white/20" >
//               <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
//               <nav className="flex flex-col space-y-4 mt-8">
//                 {navItems.map((item) => (
//                   <Link key={item.label} href={item.href} className="text-lg">
//                     {item.label}
//                   </Link>
//                 ))}

//                 <div className="border-t pt-4">
//                   {!isLoggedIn ? (
//                     <>
//                       <Link href="/login">
//                         <Button className="w-full">Login</Button>
//                       </Link>
//                       <Link href="/register" className="mt-2 block">
//                         <Button variant="outline" className="w-full">Register</Button>
//                       </Link>
//                     </>
//                   ) : (
//                     <>
//                       <Link href={role === "ADMIN" ? "/admin/dashboard" : "/dashboard"}>
//                         <Button className="w-full">Dashboard</Button>
//                       </Link>
//                       <LogoutButton />
//                     </>
//                   )}
//                 </div>
//               </nav>

//             </SheetContent>
//           </Sheet>
//         </div>

//       </div>
//     </header>
//   );
// };

// export default PublicNavbar;
