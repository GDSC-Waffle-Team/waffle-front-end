import swal from 'sweetalert';
import axios from 'axios';

const addFine = (
  memberId: string | undefined | string[],
  date: string | null,
  type: string | null
) => {
  if (typeof memberId !== 'string') {
    return;
  }
  if (typeof date !== 'string') {
    return;
  }

  if (typeof type !== 'string') {
    return;
  }
  const newfine = {
    memberId: memberId,
    date: date,
    type: type,
  };

  const addFineRequest = async () => {
    const url = `/api/admin/${memberId}`;
    await axios
      .post(url, JSON.stringify(newfine), {
        headers: {
          'Content-Type': `application/json`,
          Authorization:
            'Bearer ' + localStorage.getItem('logintoken')?.replace(/\"/gi, ''),
        },
      })
      .then((res) => swal('추가가 완료되었습니다'));
  };

  addFineRequest();
};

export default addFine;
