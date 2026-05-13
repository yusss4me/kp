export interface BaseResponse<T> {
  data: T;
  message: string;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'pengurus' | 'donatur';
}