import { Select, Space, Button, Modal, Drawer } from 'antd';
import CoinInfoModal from './CoinInfoModal'
import AddAssetForm from './AddAssetForm';
import { useCrypto } from '../context/crypto-context';
import { useState } from 'react';
export default function NavMenu() {
    const [coin, setCoin] = useState(null)

    const [drawer, setDrawer] = useState(false)
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState(false)
    const { crypto, setTheme, theme } = useCrypto()

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
        <>
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
                {theme ? 'dark' : 'white'} theme
            </Button>
            <Button type="primary" onClick={() =>  setDrawer(true)}>Add asset</Button >
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
        </>
    )
}