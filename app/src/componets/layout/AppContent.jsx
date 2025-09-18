import { Layout, Typography } from 'antd';
import { useCrypto } from '../../context/crypto-context'

import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import TableCrypto from '../../componets/TableCrypto';
import CustomTooltip from '../IU/CustomTootlip';

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem',

};

export default function AppContent() {
    const { assets, crypto, theme } = useCrypto()
    const cryptoPriceMap = crypto.reduce((acc, v) => {
        acc[v.id] = v.price
        return acc
    }, {})
    const resSumAsset =
        assets
            .map(asset => asset.amount * cryptoPriceMap[asset.id])
            .reduce((acc, v) => (acc += v), 0)
            .toFixed(2)

    return (
        <Layout.Content style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: 'calc(100vh - 60px)',
            color: theme ? 'white' : 'black',
            backgroundColor: theme ? '#001529' : 'white',
            padding: '1rem',
            width: "100%"
        }}>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', maxWidth: 1000, width: "100%" }}>

                {assets.length == 0 ?
                    <h1> Добавьте криптовалюту в портфолио и отслеживайте изменение цен в реальном времени </h1>
                    :
                    <>
                        <Typography.Title level={3} style={{ textAlign: 'left', color: theme ? 'white' : 'black' }}>
                            Portfolio: {resSumAsset} $
                        </Typography.Title>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                                data={assets}
                                margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="id"></XAxis>
                                <Tooltip
                                    content={<CustomTooltip />}
                                />
                                <YAxis label={{ angle: -90, position: 'insideLeft' }} />
                                <Bar dataKey="totalAmount" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                        <TableCrypto />
                    </>
                }
            </div>

        </Layout.Content>
    )
}