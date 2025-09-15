
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return (
                <p className="text-white truncate">
                    {label}: {formatter.format(payload[0].value)}
                </p>
        );
    }
    return null;
};

export default CustomTooltip;
