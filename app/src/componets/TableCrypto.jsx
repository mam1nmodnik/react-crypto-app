import { Table, Tag, Space, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useCrypto } from '../context/crypto-context'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';


export default function TableCrypto() {
    const { assets } = useCrypto()

    const [asstetsToTable, setAssetsToTable] = useState([])
    const [sortedTable, setSortedTable] = useState(null)

    function dataTable() {
        const newAssets = assets.map(coin => {
            return {
                key: coin.id,
                name: coin.id,
                amount: coin.amount,
                totalAmount: coin.totalAmount,
                totalProfit: coin.totalProfit,
                grow: coin.grow ? 'up' : 'down'
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
            width: 0
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.amount - b.amount,
            width: 0
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.totalAmount - b.totalAmount,
            render: totalAmount => (totalAmountRender(totalAmount)),
            width: 0
        },
        {
            title: 'Total Profit',
            dataIndex: 'totalProfit',
            sorter: (a, b) => a.totalProfit - b.totalProfit,
            render: totalProfit => (totalProfitRender(totalProfit)),
            width: 0
        },
    ]

    const upOrDownAssets = (value) => {
        if (value == 'all') {
            return setSortedTable(asstetsToTable)
        }
        const newArray = asstetsToTable.filter(coin => {
            if (coin.grow == value) {
                return coin
            }
        })
        return setSortedTable(newArray)
    }

    useEffect(() => {
        setAssetsToTable(dataTable())
    }, [assets])

    const tableProps = {
        title: () =>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Select
                    style={{
                        width: 250
                    }}
                    onChange={upOrDownAssets}
                    defaultValue="all assets"
                    options={[
                        {
                            label: 'up assets',
                            value: 'up',
                        },
                        {
                            label: 'down assets',
                            value: 'down',
                        },
                        {
                            label: 'all assets',
                            value: 'all',
                        },
                    ]}

                />
            </div>,
        size: 'small'
    };
    return (
        <Table style={{ width: '100%' }}
            {...tableProps}
            columns={columns}
            dataSource={sortedTable == null ? asstetsToTable : sortedTable}
            pagination={false}
            scroll={{ x: 'max-content' }}
        />
    )
}