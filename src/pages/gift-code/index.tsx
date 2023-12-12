import { TSystemSetting } from "@/@types/system-setting";
import { TUser } from "@/@types/user";
import { GlobalLayout } from "@/components/layouts/GlobalLayout";
import { GiftCodeGuest } from "@/components/pages/GiftCode/Guest";
import { GiftCodeUser } from "@/components/pages/GiftCode/User";
import { serverSideGetSystemSetting } from "@/hooks/serverSideGetSystemSetting";
import { useSystemSetting } from "@/hooks/useSystemSetting";
import { useUser } from "@/hooks/useUser";

export default function GiftCode({
  systemSettings,
  user: userDefault,
}: {
  systemSettings: TSystemSetting;
  user?: TUser;
}) {
  useSystemSetting(systemSettings);
  const { isLogined } = useUser(userDefault);

  return (
    <GlobalLayout title="Giftcode">
      <div className="app-container container-xxl">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header justify-content-center">
                <h4 className="card-title">
                  <i className="bi bi-gift fs-2x !hl-text"></i>
                  <span className="ms-2">NHẬN GIFTCODE</span>
                </h4>
              </div>
              <div className="card-body p-0">
                <div className="p-5">
                  {isLogined ? <GiftCodeUser /> : <GiftCodeGuest />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}

export const getServerSideProps = serverSideGetSystemSetting;
