import { SysMsg } from "../../types/interface";

export function SystemMessage({ sysMsg }: { sysMsg: SysMsg }) {
  let colorClass;
  let shortSysMessage;

  if ((sysMsg.statusCode as number) < 300) {
    colorClass =
      " bg-green-50 text-green-800 dark:bg-gray-800 dark:text-green-400";
    shortSysMessage = "Success! ";
  } else if ((sysMsg.statusCode as number) >= 300) {
    colorClass =
      " bg-yellow-50 text-yellow-800 dark:bg-gray-800 dark:text-yellow-400";
    shortSysMessage = "Error: ";
  } else {
  }
  return (
    <div className={`mb-4 rounded-lg ${colorClass} py-4 text-sm`} role="alert">
      <span className="font-medium italic">{shortSysMessage}</span>
      {sysMsg.message}
    </div>
  );
}
