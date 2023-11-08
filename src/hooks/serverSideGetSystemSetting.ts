import {systemSettingQuery} from "@/queries/system-setting";

export const serverSideGetSystemSetting = async () => {
  const {data:{settings}} = await systemSettingQuery();

  return {
    props: {
      systemSettings: settings
    },
  }
}
