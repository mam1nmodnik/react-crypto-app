import { Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useCrypto } from '../../context/crypto-context'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';


export default function TableCrypto() {
    const { assets } = useCrypto()

    const [asstetsToTable, setAssetsToTable] = useState([])
    function dataTable() {
        const newAssets = assets.map(coin => {
            return {
                key: coin.id,
                name: coin.id,
                amount: coin.amount,
                totalAmount: coin.totalAmount,
                totalProfit: coin.totalProfit,
            }
        })
        return newAssets
    }
    function totalAmountRender(totalAmount) {
        return assets.map(coin => {
            if (coin.totalAmount == totalAmount) {
                return (
                    <Tag style={{ color: coin.grow ? '#3f8600' : '#cf1322' }} key={totalAmount}>
                        {coin.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {totalAmount.toFixed(2)} $
                    </Tag>
                )
            }
        })
    }
    function totalProfitRender(totalProfit) {
        return assets.map(coin => {
            if (coin.totalProfit == totalProfit) {
                return (
                    <span key={coin.id}>
                        <Tag style={{ color: coin.grow ? '#3f8600' : '#cf1322' }} >
                            {coin.growPercent}% 
                        </Tag> 
                        <Tag style={{ color: coin.grow ? '#3f8600' : '#cf1322' }} >
                            {totalProfit.toFixed(2)} $
                        </Tag>
                    </span>
                )
            }
        })
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            showSorterTooltip: { target: 'full-header' },
            render: text => <a>{text}</a>,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.amount - b.amount,
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.totalAmount - b.totalAmount,
            render: totalAmount => (totalAmountRender(totalAmount))
        },
        {
            title: 'Total Profit',
            dataIndex: 'totalProfit',
            sorter: (a, b) => a.totalProfit - b.totalProfit,
            render: totalProfit => (totalProfitRender(totalProfit))
        },
    ]

    useEffect(() => {
        setAssetsToTable(dataTable())
    }, [assets])

    return (
        <Table style={{width: '100%'}}
            columns={columns}
            dataSource={asstetsToTable}
            pagination={false}
        />
    )
}