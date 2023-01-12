type fine = {
  id: number;
  memberId: string;
  date: string;
  type: string;
  status: boolean;
};
type list = {
  memberId: string;
  nickname: string;
  part: string;
  fines: fine[];
};

export type { fine, list };
