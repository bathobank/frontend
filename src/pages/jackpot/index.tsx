import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";

import { TPageProp } from "@/@types/page-prop";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { Card } from "@/components/ui/Card";
import { SuccessButton } from "@/components/ui/SuccessButton";
import { Text } from "@/components/ui/Text";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";
import { useJackpotQuery } from "@/queries/jackpot";

export default function Jackpot({ systemSettings, user }: TPageProp) {
  useSystemSetting(systemSettings);
  useUser(user);

  const [jackpot, setJackpot] = useState<string>("0000000");
  const jackpotQuery = useJackpotQuery();

  useEffect(() => {
    if (!jackpotQuery) return;
    const jackpotData = jackpotQuery.data.jackpot;
    if (jackpotData >= 1000000) {
      setJackpot(String(jackpotData));
      return;
    }
    const prefix = Array(7 - String(jackpotData).length)
      .fill("0")
      .join("");
    setJackpot(prefix + jackpotData);
  }, [jackpotQuery]);

  return (
    <GlobalLayout>
      <Card title="NỔ HŨ - JACKPOT">
        <Box className="mb-5">
          <h4 className="text-center">
            SỐ TIỀN HIỆN TẠI TRONG HŨ ĐANG CHỜ BẠN!
          </h4>
        </Box>
        <Stack
          direction="row"
          justifyContent="center"
          className="space-x-3 mb-5"
        >
          {jackpot.split("").map((str, index) => (
            <Text
              key={`td-jackpot-money-${index}`}
              className="text-[14px] px-3 py-1 bg-[#5cb85c] text-white rounded select-none"
            >
              {str}
            </Text>
          ))}
        </Stack>
        <Box className="text-center mb-5">
          <SuccessButton>QUAY MIỄN PHÍ NGAY</SuccessButton>
        </Box>
        <Box className="space-y-3 text-center">
          <Text size="sm">
            <span className="text-[#ff55a5]">JACKPOT</span> là phần quà dành cho
            những người chơi <span className="text-[#ff55a5]">may mắn</span>.
          </Text>
          <Text size="sm">
            Bạn hoàn toàn có thể sở hữu{" "}
            <span className="text-[#ff55a5]">MIỄN PHÍ</span> thông qua việc quay
            Slot trên <span className="text-[#ff55a5]">Telegram</span> của{" "}
            <span className="text-[#ff55a5]">ABC.NET</span>
          </Text>
          <Text size="sm">
            Bạn có thể nhận được lượt quay{" "}
            <span className="text-[#ff55a5]">MIỄN PHÍ</span> khi chơi game trên{" "}
            <span className="text-[#ff55a5]">ABC.NET</span>
          </Text>
          <Text size="sm" className="text-[#ff55a5]">
            CHÚC BẠN MAY MẮN!!!!
          </Text>
        </Box>
      </Card>
    </GlobalLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
