import {GameCltx} from "@/components/pages/Index/Game/cltx";
import {GameCltx2} from "@/components/pages/Index/Game/cltx2";
import {GameGap3} from "@/components/pages/Index/Game/gap3";
import {GameTong3So} from "@/components/pages/Index/Game/tong3so";
import {Game1Phan3} from "@/components/pages/Index/Game/1phan3";
import {GameXien} from "@/components/pages/Index/Game/xien";
import {GameDoanSo} from "@/components/pages/Index/Game/doanso";
import {Box} from "@/components/ui/Box";
import {useState} from "react";
import {StartGameModal} from "@/components/modals/StartGame";

export const GameGroup = ({gameOpen}: {gameOpen: string}) => {
  const [openModalStartGame, setOpenModalStartGame] = useState<boolean>(false);
  const [gameTypeSelected, setGameTypeSelected] = useState<string>('');
  const [gameGroupSelected, setGameGroupSelected] = useState<string>('');

  const startGame = (gameGroup: string, gameType: string) => {
    setGameGroupSelected(gameGroup);
    setGameTypeSelected(gameType);
    setOpenModalStartGame(true);
  }

  const endGame = () => {
    setGameTypeSelected('');
    setOpenModalStartGame(false);
  }

  return (
    <Box>
      <Box>
        {gameOpen === 'cltx' && <GameCltx startGame={startGame} />}
        {gameOpen === 'cltx2' && <GameCltx2 startGame={startGame} />}
        {gameOpen === 'gap3' && <GameGap3 startGame={startGame} />}
        {gameOpen === 'tong3so' && <GameTong3So startGame={startGame} />}
        {gameOpen === '1phan3' && <Game1Phan3 startGame={startGame} />}
        {gameOpen === 'xien' && <GameXien startGame={startGame} />}
        {gameOpen === 'doanso' && <GameDoanSo startGame={startGame} />}
      </Box>
      <StartGameModal
        isOpen={openModalStartGame}
        gameType={gameTypeSelected}
        gameGroup={gameGroupSelected}
        onClose={endGame}
      />
    </Box>
  )
}
