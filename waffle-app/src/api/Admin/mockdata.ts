//mock데이터들(API호출 이전에 사용될 데이터)

import { data } from '../../constants';

const mockdata: data[] = [];
for (let i = 0; i < 11; i++) {
  mockdata.push({ role: 'Web', name: `kim${i}`, email: `kim${i}@naver.com` });
}
for (let i = 0; i < 13; i++) {
  mockdata.push({
    role: 'Backend',
    name: `Lee${i + 11}`,
    email: `LEE${i + 11}@naver.com}`,
  });
}
for (let i = 0; i < 10; i++) {
  mockdata.push({
    role: 'Mobile',
    name: `park${i + 30}`,
    email: `park${i + 30}@hanmail.net`,
  });
}

export default mockdata;
