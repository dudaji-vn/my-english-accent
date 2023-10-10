export type StorageInfo = {
  value: number;
  unit: string;
};
export function formatStorageUnit(bytes: number): StorageInfo {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;
  let size = bytes;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  const formattedSize = size.toFixed(2);
  const unit = units[unitIndex];

  return {
    value: Number(formattedSize),
    unit,
  };
}
