export interface IEmployee {
  id?: number;
  filePath?: string;
  employeeId?: number;
  pin?: string;
  fullName?: string;
  getByteStreamFromFilePath?: ArrayBuffer;
}