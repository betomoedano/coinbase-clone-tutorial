import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Coin from '../../models/Coin';
import cmpData from '../../data/CoinMarketCapData';
import { TopmoversState } from '../reducers/topmovers';

export const SET_TOPMOVERS_DATA = 'SET_TOPMOVERS_DATA';

export const fetchTopMoversData = () => {
    return async (dispatch: ThunkDispatch<TopmoversState, void, Action>) => {
        try {
            const cbResponse = await fetch('https://api.pro.coinbase.com/products');
            const cbResponseData = await cbResponse.json();

            let availableCoins: string[] = [];

            interface CBRequiredData {
                quote_currency: string;
                base_currency: string;
            }

            const filteredData = cbResponseData.filter(
                (coin: CBRequiredData) => coin.quote_currency === 'USD'
            )

            filteredData.forEach((coin: CBRequiredData) => {
                availableCoins.push(coin.base_currency);
            })

            const cryptoResponse = await fetch( 
                `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${availableCoins.join()}`
            );
            const cryptoResponseData = await cryptoResponse.json();
            
            let dataAsArray = Object.values(cryptoResponseData.RAW);

            dataAsArray.sort((a:any, b:any) => 
                Math.abs(a.USD.CHANGEPCT24HOUR) < Math.abs(b.USD.CHANGEPCT24HOUR) ? 1 : -1
            )

            const coinData: Coin[] = [];

            for(const data of dataAsArray) {
                const cryptoData: any = data;

                const cmpDetails = cmpData.data.find(
                    (cmpCoin) => cryptoData.USD.FROMSYMBOL === cmpCoin.symbol
                );

                const coinID = cmpDetails?.id ?? 0;
                const coinName = cmpDetails?.name ?? 'N/A';


                coinData.push(
                    new Coin(
                        coinID,
                        coinName,
                        cryptoData.USD.FROMSYMBOL,
                        cryptoData.USD.PRICE,
                        cryptoData.USD.CHANGEPCT24HOUR,
                ))

                if( coinData.length === 6 ) {
                    break;
                }
            }

            dispatch({
                type: SET_TOPMOVERS_DATA,
                coinData: coinData
            })
        } catch (error) {
            console.log(error);
        }
    }
}