import { createContext, useContext, useEffect, useState } from 'react'
import { fakeFetchCrypto, } from '../API/getCrypto';
import { percentDifference } from '../utils'

const CryptoContext = createContext({
    loading: true,
    crypto: [],
    assets: []
})

export function CryptoContextProvider({ children }) {

    const [loading, setLoading] = useState(false);
    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);


    // receiving local storage
    function getAssetsToStorage(result) {
        const getAssets = JSON.parse(localStorage.getItem("assets"))
        console.log(getAssets)
        if (getAssets == null) {
            return console.log('the local storage files are empty')
        }
        const newAssets = getAssets.map((asset) => {
            let coin = result.find((c) => c.id === asset.id)
            if (asset.id === coin.id)
                return {
                    grow: asset.price < coin.price,
                    growPercent: percentDifference(parseInt(asset.price), coin.price),
                    totalAmount: asset.amount * coin.price,
                    totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                    ...asset,
                }
            return asset
        })
        setAssets(newAssets)
        console.log('the local storage files have been updated')
    }

    // adding assets to the array
    function mapAssets(assets, result) {
        if (assets.length != 0) {
            const newAssets = assets.map(asset => {
                const coin = result.find((c) => c.id === asset.id)
                return {
                    grow: asset.price < coin.price,
                    growPercent: percentDifference(parseInt(asset.price), coin.price),
                    totalAmount: asset.amount * coin.price,
                    totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                    ...asset
                }
            })
            localStorage.setItem("assets", JSON.stringify(newAssets))
            return newAssets
        }
        return assets
    }

    // adding to a specific element
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
                        growPercent: percentDifference(parseInt(asset.price), coin.price),
                        totalAmount: updateAmount * coin.price,
                        totalProfit: updateAmount * coin.price - updateAmount * asset.price,
                    }
                return asset
            })
            return setAssets(mapAssets(newAssets, crypto))
        }
        setAssets(prev => mapAssets([...prev, newAsset], crypto))
    }

    useEffect(() => {
        async function preload() {
            setLoading(true)
            const { result } = await fakeFetchCrypto()
            console.log(result)
            setCrypto(result)
            getAssetsToStorage(result)

            // setInterval(() => {
            //     getAssetsToStorage(result)
            // }, 18000000)
            return setLoading(false)
        }

        preload()
    }, [])


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
