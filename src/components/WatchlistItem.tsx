import React, {FC} from "react";
import {
    TouchableHighlight,
    View,
    Text,
    StyleSheet,
    Image,
  } from 'react-native';
  import Colors from '../constants/Colors';


interface WatchlistItemProps {
    id: number;
    name: string;
    percentChange: number;
    price: number;
    symbol: string;
    drag: any;
    isActive: any;
}

const WatchlistItem: FC<WatchlistItemProps> = ({
    id,
    name,
    percentChange,
    price,
    symbol,
    drag,
    isActive,
}) => {
    return (
        <View>
            <Text>{name}</Text>
        </View>
    )
}

export default WatchlistItem;