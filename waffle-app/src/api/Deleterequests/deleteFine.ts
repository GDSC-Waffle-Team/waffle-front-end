import axios from 'axios';
import swal from 'sweetalert';
const deleteFineRequest = (
  fineid: number,
  memberId: string | undefined | string[]
) => {
  if (typeof memberId !== 'string') {
    return;
  }
  const url = `/api/admin/${memberId}`;
  const deleteFine = async () => {
    await axios.delete(url, {
      headers: {
        Authorization:
          'Bearer ' + localStorage.getItem('logintoken')?.replace(/\"/gi, ''),
      },
      data: { id: fineid },
    });
  };
  return deleteFine().then((res) => swal('제거가 완료되었습니다!'));
};

export default deleteFineRequest;
