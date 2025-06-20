import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

type Stock = {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
};

const mockStocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 182.13, changePercent: 1.23 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2715.67, changePercent: -0.45 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 725.50, changePercent: 2.15 },
];

export default function HomeScreen() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento de API
    setTimeout(() => {
      setStocks(mockStocks);
      setLoading(false);
    }, 1000);
  }, []);

  const renderItem = ({ item }: { item: Stock }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.symbol}>{item.symbol}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
        <Text style={[styles.change, { color: item.changePercent >= 0 ? 'green' : 'red' }]}>
          {item.changePercent >= 0 ? '+' : ''}
          {item.changePercent.toFixed(2)}%
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Carregando ações...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📈 Ações do Mercado</Text>
      <FlatList
        data={stocks}
        keyExtractor={(item) => item.symbol}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f0f4f8',
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    color: '#555',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  change: {
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
