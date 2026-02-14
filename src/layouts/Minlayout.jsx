import { Footer, Navbar } from "../components";


export default function MainLayout({children}){
    return(
        <div  className="flex flex-col min-h-screen">
<Navbar />
<main  className="w-full ">{children}  </main>
<Footer />
        </div>
    )
}