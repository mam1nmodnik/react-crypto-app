
    const getCryptoItems = async ()=> {
        const url = 'https://openapiv1.coinstats.app/coins';
        const options = {
            method: 'GET',
            headers: {'X-API-KEY': 'c9YQWi7EqLQ7ewvohB7v64ez3qF98qNi3N7XSebrBjg='},
            body: undefined
        };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            return data
        } catch (error) {
            console.error(error);
        }
    }

export async function fakeFetchCrypto(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(getCryptoItems())
        }, 1)
    })
}


