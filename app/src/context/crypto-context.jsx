import { createContext, useContext, useEffect, useState } from 'react'
import { fakeFetchCrypto } from '../API/getCrypto';
import { percentDifference } from '../utils'
import Cookies from 'js-cookie';

const CryptoContext = createContext({
    loading: true,
    crypto: [],
    assets: []
})

export function CryptoContextProvider({ children }) {

    const [loading, setLoading] = useState(false);
    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);

    function getCookieAssets() {
        let getAssetsCookie = JSON.parse(Cookies.get('assets'))
        console.log(getAssetsCookie)
        if (getAssetsCookie.length == 0) {
            Cookies.set('assets', JSON.stringify(assets))
            console.log('куки новые')
        } else {
            setAssets(getAssetsCookie)
            console.log('куки старые')
        }
    }


    function mapAssets(assets, result) {
        if (assets.length != 0) {
            const newAssets = assets.map(asset => {
                const coin = result.find((c) => c.id === asset.id)
                console.log(asset)
                return {
                    grow: asset.price < coin.price,
                    growPercent: percentDifference(asset.price, coin.price),
                    totalAmount: asset.amount * coin.price,
                    totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                    ...asset
                }
            })
            Cookies.set('assets', JSON.stringify(newAssets))
            console.log(JSON.parse(Cookies.get('assets'))
            )
            return newAssets
        }

        return assets
    }



    useEffect(() => {
        async function preload() {
            setLoading(true)
            getCookieAssets()
            const { result } = await fakeFetchCrypto()
            console.log(result)
            setCrypto(result)
            return setLoading(false)
        }
        preload()
    }, [])


    function addAsset(newAsset) {
        const repitCrypto = assets.some((coin) => coin.id == newAsset.id)
        const coin = crypto.find((c) => c.id === newAsset.id)
        if (repitCrypto) {
            const newAssets = assets.map((asset) => {
                const updateAmount = asset.amount + newAsset.amount
                if (asset.id === newAsset.id)
                    return {
                        ...asset,
                        amount: updateAmount,
                        grow: asset.price < coin.price,
                        growPercent: percentDifference(asset.price, coin.price),
                        totalAmount: updateAmount * coin.price,
                        totalProfit: updateAmount * coin.price - updateAmount * asset.price,
                    }
                return asset
            })
            console.log(newAssets)
            return setAssets(mapAssets(newAssets, crypto))
        }
        setAssets(prev => mapAssets([...prev, newAsset], crypto))

    }

    return (
        <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
            {children}
        </CryptoContext.Provider>
    )
}
export default CryptoContext;

export function useCrypto() {
    return useContext(CryptoContext)
}
