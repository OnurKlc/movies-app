import Layout from "../core/components/Layout";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <Link href={'/'}>Dashboard</Link>
            <Layout />
        </div>
    );
}
