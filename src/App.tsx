import {FlatList, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icons from './components/Icons';
import Snackbar from 'react-native-snackbar';
import {Icon} from 'react-native-vector-icons/Icon';

const App = (): JSX.Element => {
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));

  type moveIcons = {
    id: string;
    name: 'circle' | 'cross' | '';
  };
  const [moves, setMoves] = useState<moveIcons[]>([
    {
      id: '1',
      name: '',
    },
    {
      id: '2',
      name: '',
    },
    {
      id: '3',
      name: '',
    },
    {
      id: '4',
      name: '',
    },
    {
      id: '5',
      name: '',
    },
    {
      id: '6',
      name: '',
    },
    {
      id: '7',
      name: '',
    },
    {
      id: '8',
      name: '',
    },
    {
      id: '9',
      name: '',
    },
  ]);

  const restartGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
  };

  const checkIsWinner = () => {
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game !`);
    } else if (
      gameState[3] === gameState[4] &&
      gameState[3] === gameState[5] &&
      gameState[3] !== 'empty'
    ) {
      setGameWinner(`${gameState[3]} won the game !`);
    } else if (
      gameState[6] === gameState[7] &&
      gameState[6] === gameState[8] &&
      gameState[6] !== 'empty'
    ) {
      setGameWinner(`${gameState[6]} won the game !`);
    } else if (
      gameState[0] === gameState[3] &&
      gameState[0] === gameState[6] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game !`);
    } else if (
      gameState[1] === gameState[4] &&
      gameState[1] === gameState[7] &&
      gameState[1] !== 'empty'
    ) {
      setGameWinner(`${gameState[1]} won the game !`);
    } else if (
      gameState[2] === gameState[5] &&
      gameState[2] === gameState[8] &&
      gameState[2] !== 'empty'
    ) {
      setGameWinner(`${gameState[2]} won the game !`);
    } else if (
      gameState[0] === gameState[4] &&
      gameState[0] === gameState[8] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game !`);
    } else if (
      gameState[2] === gameState[4] &&
      gameState[2] === gameState[6] &&
      gameState[2] !== 'empty'
    ) {
      setGameWinner(`${gameState[2]} won the game !`);
    } else if (!gameState.includes('empty', 0)) {
      setGameWinner('DRAW...');
    }
  };


  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
      });
    }
    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Hakunama Tata Try another position',
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
      });
    }
    // we are checking weather a game is won by anyone but whenever any button is clicked we have to check it again that weather anyone becomes winner so we have to call the function again

    checkIsWinner();
  };

  return (
    <SafeAreaView>
      {/* <View style={styles.container}>
        <TouchableOpacity style={styles.upperButton}>
          <Text style={styles.upperBtnText}>Player O's Turn</Text>
        </TouchableOpacity>
        <FlatList
          numColumns={3}
          data={moves}
          keyExtractor={move => move.id}
          renderItem={move => <Pressable onPress={handleMove}><Icons name={move.item.name} /></Pressable>}
        />
      </View> */}
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View style={[styles.playerInfo, isCross ? styles.playerX : styles.playerO]}>
          <Text style={styles.gameTurnTxt}>Player {isCross ? 'X' : 'O'}'s Turn</Text>
        </View>
      )}
      <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({item, index}) => (
          <Pressable
          key={index}
          style={styles.card}
          onPress={() => onChangeItem(index)}
          >
            <Icons name={item} />
          </Pressable>
        )}
       />
       <Pressable style={styles.gameBtn} onPress={restartGame}>
       <Text style={styles.gameBtnText}>
        {gameWinner ? 'Start the game' : 'Reload the game'}
       </Text>
       </Pressable>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: 'purple',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});
