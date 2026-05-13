export interface Activity {
  id: string;
  title: string;
  date: string; // Format: YYYY-MM-DD
  type: 'pemberdayaan' | 'pendidikan' | 'kemanusiaan';
}