import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';


export default function AppHeader() {
    const [coin, setCoin] = useState(null)
    const [modal, setModal] = useState(false)
    const [drawer, setDrawer] = useState(false)
    const [open, setOpen] = useState(false);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { crypto, setTheme, theme } = useCrypto()
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
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme ? "#001529" : "white",
        gap: isMobile ? "0.5rem" : 0,
    };

    function hendleSelect(value) {
        setCoin(crypto.find(c => c.id === value))
        setModal(true)
    }

    const handleDropdownVisibleChange = (visible) => {
        if (visible) {
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none";
        } else {
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        }
    };
    function setUserTheme() {
        setTheme(!theme)
        localStorage.setItem("theme", JSON.stringify(theme))
    }
    
    return (
        <Layout.Header style={headerStyle}>

            <Select
                style={{
                    width: 250
                }}
                onSelect={hendleSelect}
                onOpenChange={handleDropdownVisibleChange}
                onBlur={() => setOpen(false)}
                value='information about the crypt'
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon
                }))}
                optionRender={(option) => (
                    <Space>
                        <img
                            style={{ width: 20 }}
                            src={option.data.icon}
                            alt={option.data.label}
                        />
                        {option.data.label}
                    </Space>
                )}
            />
            <Button variant="solid" onClick={() => setUserTheme()}>
                change theme
            </Button>
            <Button type="primary" onClick={() => setDrawer(true)}>Add asset</Button>
            <Modal
                open={modal}
                onCancel={() => setModal(false)}
                footer={null}
            >
                <CoinInfoModal coin={coin} />
            </Modal>
            <Drawer
                width={600}
                title="Add Asset"
                onClose={() => setDrawer(false)}
                open={drawer}
                destroyOnHidden
            >
                <AddAssetForm onClose={() => setDrawer(false)} />
            </Drawer>
        </Layout.Header>
    )
}