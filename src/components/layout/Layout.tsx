import Head from "next/head";
import Header from "./Header";

interface Props {
    children: React.ReactNode;
}

const Layout = ({children}: Props) => {
    return (
        <>
            <Head>
                <title>Insta-Clone</title>
                <meta name="description" content="Welcome to the Insta-Clone app"/>
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="keywords" content={'Photo, socila media'} />
                {/* <link rel="icon" href="/next.svg"/> */}
            </Head>

            <Header />
            {children}
        </>
    );
}
 
export default Layout;