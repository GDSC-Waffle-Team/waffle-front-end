import { useRouter } from 'next/router';
import axios from 'axios';
import styled, { css, keyframes } from 'styled-components';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { fine } from '../../constants';
import statusMapping from '../../constants';

export default function AdminList() {
  const [fines, setFines] = useState<fine[]>([]);
  useEffect(() => {
    getmemberid();
  }, []);

  const router = useRouter();
  const { id, name, part } = router.query;

  const getmemberid = async () => {
    const getmemberApiHeader =
      'Bearer ' + localStorage.getItem('logintoken')?.replace(/\"/gi, '');
    const getmemberUrl = '/api/admin/' + `${id}/`;

    await axios
      .get(getmemberUrl, {
        headers: {
          Authorization: getmemberApiHeader,
        },
      })
      .then((res) => initSetFines(res.data));
  };

  const initSetFines = (datas: object) => {
    const newarr: fine[] = [];
    Object.values(datas).forEach((value) => {
      const newFineObj: fine = {
        id: value.id,
        memberId: value.memberId,
        date: value.date,
        type: value.type,
        status: value.status,
      };

      newarr.push(newFineObj);
    });
    setFines(newarr);
  };

  //unexpected approach

  return (
    <>
      <StyledProfile>
        <StyledImg src="/GDSC.webp"></StyledImg>
        <h2 style={{ fontWeight: '700' }}>{name}</h2>
        <StyledP state={part}>{part}</StyledP>
        <StyledHr />
        <StyledFineArea>
          <form style={{ width: '100%' }}>
            <StyledFineArea>
              <StyledDate type="date" />
              <StyledFine>
                <Form.Select aria-label="Default select example">
                  <option value="10">지각</option>
                  <option value="01">결석</option>
                  <option value="00">과제 미제출</option>
                </Form.Select>
              </StyledFine>
            </StyledFineArea>
            <div
              style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}
            >
              <StyledButton type="reset">취소</StyledButton>
              <StyledButton type="submit">추가</StyledButton>
            </div>
          </form>
        </StyledFineArea>
      </StyledProfile>

      <StyledDivWrapper>
        <div style={{ fontWeight: '700' }}>최근 기록</div>
        {fines.map((eachfine) => (
          <StyledDiv key={eachfine.id}>
            <div>{eachfine.date}</div>
            <div>{statusMapping.get(eachfine.type)}</div>
            <div>{eachfine.type}</div>
          </StyledDiv>
        ))}
      </StyledDivWrapper>
    </>
    //맴버 ID로 처음 랜더링 될 떄 모든 내역 가져오기
    //납부 false->true (patch 요청),//제거 (delete요청)
  );
}

const fadein = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
    transform: none;
  }
`;
const StyledProfile = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 450px;
  margin: 2% auto;
  text-align: center;
  animation: ${fadein} 1.3s linear;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const StyledP = styled.p<{ state: string | undefined | string[] }>`
  color: grey;
  font-size: 18px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
  ${({ state }) => state === 'Web' && WebStyle}
  ${({ state }) => state === 'Backend' && BackendStyle}
  ${({ state }) => state === 'Mobile' && MobileStyle}
`;

const StyledDivWrapper = styled.article`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  justify-content: space-around;
  border: 1px solid #f1f1f1;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
  max-height: 600px;
  gap: 10px;
`;

const StyledDiv = styled.section`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 0 auto;
`;

const WebStyle = css`
  color: #0e4c92;
  border: 1px solid white;
  border-radius: 50%;
`;

const BackendStyle = css`
  color: #aa4a44;
  border: 1px solid white;
  border-radius: 50%;
`;

const MobileStyle = css`
  color: #007500;
  border: 1px solid white;
  border-radius: 50%;
`;

const StyledFineArea = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 5%;
`;

const StyledFine = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledHr = styled.hr`
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0)
  );
`;

const StyledDate = styled.input`
  display: inline;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  border: none;
  font-weight: 600;
  background-color: rgba(51, 51, 51, 0.05);
  border-radius: 8px;
  border-width: 0;
  color: #333333;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  line-height: 20px;
  list-style: none;
  margin: 0;
  padding: 10px 12px;
  text-align: center;
  transition: all 200ms;
  &:hover {
    opacity: 0.7;
  }
`;

const StyledRenderFines = styled.article`
  display: flex;
`;
