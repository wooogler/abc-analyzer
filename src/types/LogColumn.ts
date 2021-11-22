type DatumType =
  | "DEVICE_EVENT"
  | "APP_USAGE_EVENT"
  | "KEY_LOG"
  | "NOTIFICATION"
  | "MESSAGE"
  | "CALL_LOG"
  | "MEDIA";

export interface LogColumn {
  timestamp: string;
  _id: string;
  datumType: DatumType;
  type: string;
  name: string;
  packageName: string;
  currentKey: string;
  timeTaken: string;
  isPosted: string;
  messageBox: string;
  presentation: string;
}
