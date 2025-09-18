import { useCrypto } from '../../context/crypto-context'

const CustomTooltip = ({ active, payload, label }) => {
        const { theme } = useCrypto()
    
    if (active && payload && payload.length) {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return (
                <p style={{color:'black'}}>
                    {label}: {formatter.format(payload[0].value)}
                </p>
        );
    }
    return null;
};

export default CustomTooltip;
