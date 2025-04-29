"use client";
import Sidebar from '@/components/shared/sidebar/sidebar';
import Navbar from '@/components/shared/navbar/navbar';
import Footer from '@/components/shared/footer/footer';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from '@/utils/userContext';
import { NotificationsProvider } from '@/utils/notificationsContext';

export default function Layout({ 
    children 
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { user, isLoading } = useUser();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <NotificationsProvider userId={`${user.id}`}>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-irchad-gray-dark">{children}</main>
            </div>
            <Footer />
        </NotificationsProvider>
        </>
    )
}