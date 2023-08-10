import Head from "next/head";
import Header from "./Header";

interface Props {
    children: React.ReactNode;
}

const Layout = ({children}: Props) => {
    return (
        <>
            <Head>
                <title>Music platform</title>
                <meta name="description" content="Welcome to the best Music platform where you can not only listen to cool tracks but also add ones"/>
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="keywords" content={'Music, artists, tracks, listen'} />
                <link rel="icon" href="/next.svg"/>
            </Head>

            <Header />
            {children}
        </>
    );
}
 
export default Layout;