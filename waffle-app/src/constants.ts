//멤버 타입 지정
// 모바일 , 백엔드, 웹인지 나타내는 role, 이름, 이메일 주소
//더 바뀔수도 있고, 수정될 수 있음

type data = {
  role: string | undefined;
  name: string | undefined;
  email: string | undefined;
};

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

type addfine = {
  memberId: string | undefined | string[];
  date: string;
  type: string;
};

const statusMapping = new Map();
statusMapping.set('00', '지각');
statusMapping.set('01', '결석');
statusMapping.set('10', '과제 미제출');

const typeMapping = new Map();
typeMapping.set(false, '미납');
typeMapping.set(true, '완납');

export { statusMapping, typeMapping };
export type { data, fine, list, addfine };
