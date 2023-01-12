import axios from 'axios';

import swal from 'sweetalert';

const patchStatusRequest = (
  fineid: number,
  memberId: string | undefined | string[]
) => {
  if (typeof memberId !== 'string') {
    return;
  }

  const patchStatus = async () => {
    const url = `/api/admin/${memberId}`;
    await axios.patch(
      url,
      {
        id: fineid,
      },
      {
        headers: {
          Authorization:
            'Bearer ' + localStorage.getItem('logintoken')?.replace(/\"/gi, ''),
        },
      }
    );
  };

  return patchStatus().then((res) => swal('수정이 완료되었습니다'));
};

export default patchStatusRequest;
