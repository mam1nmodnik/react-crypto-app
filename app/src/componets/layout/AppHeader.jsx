import { Layout, Button, Drawer } from 'antd';
import NavMenu from '../NavMenu';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';


export default function AppHeader() {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [mobileMenu, setMobileMenu] = useState(false)
    const { theme } = useCrypto()

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize)
    }, []);

    const headerStyle = {
        width: "100%",
        textAlign: "center",
        height: isMobile ? "auto" : 60,
        padding: isMobile ? "0.5rem" : "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme ? "#001529" : "white",
        gap: isMobile ? "0.5rem" : 0,
    };
    return (
        <Layout.Header
            style={headerStyle}
        >
            <h1 style={ {color: `${theme ? "white" : "black"}`, lineHeight: 1, fontSize: '25px'}}>Crypto Portfolio Tracker</h1>
            <div className={`w-full hidden md:flex gap-2 justify-between items-center p-4 ${theme ? "bg-[#001529]" : "bg-white"} md:flex-row`}>
                <NavMenu />
            </div>
            <div className={`md:hidden `}>
                <Button onClick={() => setMobileMenu(true)}>
                    Open Menu
                </Button>
            </div>

            <Drawer

                className={`${theme} ? "bg-[#001529]" : "bg-white"`}
                width={600}
                title="Menu"
                onClose={() => setMobileMenu(false)}
                open={mobileMenu}
                destroyOnHidden
            >
                <div className={`w-full lex gap-5 justify-start items-center p-4 flex-wrap`}>
                    <NavMenu />
                </div>
            </Drawer>
        </Layout.Header>
    )
}