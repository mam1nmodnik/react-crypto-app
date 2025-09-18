
import { Typography, Flex } from 'antd';

export default function CoinInfo({ coin, withSymbol }) {
    return (
        <Flex align="center p-10" style={{padding: '10px'}}>
            <img src={coin.icon} alt={coin.name} style={{ height: 20, marginRight: 10 }} />
            {withSymbol && `(${coin.symbol})`} {coin.name}
        </Flex>
    )
}