import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const API_KEY = '898621ab8a9340a09df304592bff0c77';

type Stock = {
  symbol: string;
  name: string;
  price: number;
  percent_change: number;
};

type SymbolData = {
  symbol: string;
  name: string;
};


export default function HomeScreen() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'gainers' | 'losers'>('gainers');
  const [market, setMarket] = useState<'BR' | 'US'>('US');
  const [searchText, setSearchText] = useState('');
  const [visibleCount, setVisibleCount] = useState(15);

  useEffect(() => {
    fetchStocks();
  }, [filter, market]);

  const fetchStocks = async () => {
    setLoading(true);
    try {
      let exchange = market === 'BR' ? 'BVMF' : 'NYSE';
      const res = await fetch(
        `https://api.twelvedata.com/stocks?exchange=${exchange}&apikey=${API_KEY}`
      );
      const data = await res.json();
      
      const symbols: SymbolData[] = data.data || [];     
      const limitedSymbols = symbols.slice(0, 8); // evita estourar o limite da API

      const quotes = await Promise.all(
        limitedSymbols.map(async (item) => {
          try {
            const quoteRes = await fetch(
              `https://api.twelvedata.com/quote?symbol=${item.symbol}&apikey=${API_KEY}`
            );
            const quote = await quoteRes.json();
      
            if (quote.code || quote.status === 'error') {
              console.warn('Erro real da API:', quote.message || quote);
              return null;
            }
            
      
            return {
              symbol: quote.symbol,
              name: quote.name || item.name,
              price: parseFloat(quote.price),
              percent_change: parseFloat(quote.percent_change),
            };
          } catch (err) {
            console.error('Erro no fetch quote:', err);
            return null;
          }
        })
      );
      

      const validQuotes = quotes.filter(
        (q): q is Stock => q !== null && !isNaN(q.price)
      );

      const sorted = [...validQuotes].sort((a, b) =>
        filter === 'gainers'
          ? b.percent_change - a.percent_change
          : a.percent_change - b.percent_change
      );

      setStocks(sorted);
      setVisibleCount(2);
    } catch (err) {
      console.error('Erro ao buscar ações:', err);
    }
    setLoading(false);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 2);
  };

  const filteredStocks = stocks
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.symbol.toLowerCase().includes(searchText.toLowerCase())
    )
    .slice(0, visibleCount);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        📈 Ações - {filter === 'gainers' ? 'Altas' : 'Baixas'} -{' '}
        {market === 'BR' ? 'Brasil' : 'Estados Unidos'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar por nome ou símbolo..."
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={fetchStocks}
      />

      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <TouchableOpacity
          style={[styles.toggleButton, market === 'US' && styles.activeToggle]}
          onPress={() => setMarket('US')}
        >
          <Text style={styles.toggleText}>EUA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, market === 'BR' && styles.activeToggle]}
          onPress={() => setMarket('BR')}
        >
          <Text style={styles.toggleText}>Brasil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, filter === 'gainers' && styles.activeToggle]}
          onPress={() => setFilter('gainers')}
        >
          <Text style={styles.toggleText}>Maiores Altas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, filter === 'losers' && styles.activeToggle]}
          onPress={() => setFilter('losers')}
        >
          <Text style={styles.toggleText}>Maiores Baixas</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={filteredStocks}
          keyExtractor={(item) => item.symbol}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <Text style={styles.symbol}>{item.symbol}</Text>
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.price}>
                  {market === 'BR' ? 'R$ ' : 'US$ '}
                  {item.price.toFixed(2)}
                </Text>
                <Text
                  style={[
                    styles.change,
                    { color: item.percent_change >= 0 ? 'green' : 'red' },
                  ]}
                >
                  {item.percent_change >= 0 ? '+' : ''}
                  {item.percent_change.toFixed(2)}%
                </Text>
              </View>
            </View>
          )}
          ListFooterComponent={
            filteredStocks.length < stocks.length ? (
              <TouchableOpacity style={styles.showMoreButton} onPress={handleShowMore}>
                <Text style={styles.showMoreText}>Mostrar mais</Text>
              </TouchableOpacity>
            ) : null
          }
        />
      )}
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
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#007bff',
  },
  toggleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    color: '#555',
    flexShrink: 1,
    flexWrap: 'wrap',
    maxWidth: 250,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  change: {
    fontSize: 14,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  showMoreButton: {
    padding: 12,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  showMoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
