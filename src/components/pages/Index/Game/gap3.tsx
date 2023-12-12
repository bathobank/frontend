import { TGame, TStartGame } from "@/@types/game";
import { HightLightEnd } from "@/components/pages/Index/Game/HightLightEnd";
import { HightLightNickname } from "@/components/pages/Index/Game/HightLightNickname";
import { useUser } from "@/hooks/useUser";

export const GameGap3 = ({
  startGame,
  gameData,
}: {
  startGame: TStartGame;
  gameData: TGame["gap3"];
}) => {
  const { user } = useUser();

  return (
    <div className="game-box rounded-3">
      <div className="d-flex align-items-center p-3 game-header">
        <i className="!hl-text bi bi-dice-5 fs-2x" />
        <h5 className="mb-0 ms-2 text-white">GẤP 3</h5>
      </div>
      <div className="p-3">
        <table className="w-100">
          <thead>
            <tr style={{ borderBottom: "1px solid #ffffff0d" }}>
              <th scope="col" className="text-left py-3">
                <span className="fs-xl" style={{ color: "#B5B7C8" }}>
                  Nội dung
                </span>
              </th>
              <th scope="col" className="text-center py-3">
                <span className="fs-xl" style={{ color: "#B5B7C8" }}>
                  Cách tính
                </span>
              </th>
              <th scope="col" className="text-center py-3">
                <span className="fs-xl" style={{ color: "#B5B7C8" }}>
                  Số
                </span>
              </th>
              <th scope="col" className="text-center py-3">
                <span className="fs-xl" style={{ color: "#B5B7C8" }}>
                  Tỉ lệ
                </span>
              </th>
              {user && <th scope="col" className="py-3"></th>}
            </tr>
          </thead>
          <tbody>
            {Object.keys(gameData.G3).map((key, index) => {
              const game = gameData.G3[key];
              const type = key.split("so")[0];

              return (
                <tr
                  key={`tr-game-cltx-${index}`}
                  style={{
                    ...(index > 0 && {
                      borderTop: "1px solid #ffffff0d",
                    }),
                  }}
                >
                  <td style={{ width: "150px" }} className="py-3">
                    <HightLightNickname
                      content={`${user?.nickname ?? "nickname"} G3`}
                    />
                  </td>
                  <td style={{ width: "100px" }} className="text-center py-3">
                    <span>{type} số cuối</span>
                  </td>
                  <td className="py-3">
                    <HightLightEnd ends={game.end} />
                  </td>
                  <td style={{ minWidth: "50px" }} className="text-center">
                    <span>x{game.ratio}</span>
                  </td>
                  {user && (
                    <td style={{ minWidth: "50px" }} className="text-center">
                      <span
                        className="cursor-pointer hover:underline text-[#ff55a5] select-none"
                        onClick={() => startGame("gap3", "G3")}
                      >
                        Chơi
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="py-5">
          <p className="italic fs-md text-center">
            KẾT QUẢ TÍNH BẰNG <span className="hl-text">2 HOẶC 3 SỐ CUỐI</span>{" "}
            CỦA <span className="hl-text">MÃ GIAO DỊCH BANK</span> KHI CHUYỂN
            KHOẢN VÀO BANK NHẬN CỦA WEB
          </p>
        </div>
      </div>
    </div>
  );
};
