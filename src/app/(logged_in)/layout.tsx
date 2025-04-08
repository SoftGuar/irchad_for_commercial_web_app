"use client";
import Sidebar from '../../components/shared/sidebar/sidebar';
import Navbar from '../../components/shared/navbar/navbar';
import Footer from '../../components/shared/footer/footer';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ 
    children 
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
            }
        };

        checkAuth();
    }, [router]);

    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-irchad-gray-dark">{children}</main>
            </div>
            <Footer />
        </>
    )
}