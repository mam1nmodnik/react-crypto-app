import { Layout, Typography, Divider, Tag, Table } from 'antd';
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
import CoinInfo from "../CoinInfo";
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

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            showSorterTooltip: { target: 'full-header' },
            render: text => <a>{text}</a>,
            width: 0
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.amount - b.amount,
            showSorterTooltip: false,
            width: 0
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.totalAmount - b.totalAmount,
            render: totalAmount => (totalAmountRender(totalAmount)),
            showSorterTooltip: false,
            width: 0
        },
        {
            title: 'Total Profit',
            dataIndex: 'totalProfit',
            sorter: (a, b) => a.totalProfit - b.totalProfit,
            render: totalProfit => (totalProfitRender(totalProfit)),
            showSorterTooltip: false,
            width: 0
        },
    ]
    return (
        <Layout.Content style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: 'calc(100vh - 60px)',
            color: theme ? 'white' : 'black',
            backgroundColor: theme ? '#001529' : 'white',
            padding: '1rem',
            width: "100%"
        }}>
            <div className=' flex flex-col justify-center text-center gap-5 ' >
                {assets.length == 0 ?
                    <h1> Добавьте криптовалюту в портфолио и отслеживайте изменение цен в реальном времени </h1>
                    :
                    <>
                        <Typography.Title level={3} style={{ textAlign: 'left', color: theme ? 'white' : 'black' }}>
                            Portfolio: {resSumAsset} $
                        </Typography.Title>
                        <div className='flex gap-2 lg:flex-row flex-col'>
                            <div className='h-max flex lg:flex-row flex-wrap md:gap-5 gap-3 justify-center  bg-white rounded-2xl ' style={{ padding: '20px' }}>
                                <div className='w-full'>
                                    <div>
                                        <ResponsiveContainer width="100%" height={400} >
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
                                    </div>
                                    <div className=''>
                                        <TableCrypto />
                                    </div>
                                </div>
                            </div>
                            <div class=" h-166 bg-white relative overflow-x-auto overflow-y-auto rounded-2xl" style={{ padding: '15px' }}>
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500  " >
                                    <thead class="text-s text-gray-700  bg-white " style={{ padding: '15px' }}>
                                        <tr className='' style={{ padding: '10px' }}>
                                            <th scope="col" class="px-6 py-5">
                                                Coin
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                1 hour:
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                1 day:
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                1 week:
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Price
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Market Cap:
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {crypto.map((coin) => (
                                            <tr key={coin.id} class="bg-white border-b hover:bg-gray border-gray-200 p-[10px]" style={{ padding: '15px' }}>
                                                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    <CoinInfo coin={coin} withSymbol />
                                                </td>
                                                <td class="p-15">
                                                    <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'} > {coin.priceChange1h}%</Tag>
                                                </td>
                                                <td class="px-6 py-4">
                                                    <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'} > {coin.priceChange1h}%</Tag>
                                                </td>
                                                <td class="px-6 py-4">
                                                    <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'} > {coin.priceChange1h}%</Tag>
                                                </td>
                                                <td class="px-6 py-4">
                                                    {coin.price.toFixed(2)}$
                                                </td>
                                                <td class="px-6 py-4">
                                                    {coin.marketCap}$
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* <Table
                            columns={columns}
                            dataSource={crypto}
                            pagination={false}
                            scroll={{ x: 'max-content' }}/> */}
                    </>
                }
            </div>
        </Layout.Content>
    )
}