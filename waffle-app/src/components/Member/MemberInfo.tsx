import axios from 'axios';
import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { list, fine } from '../../constants';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
export default function MemberInfo() {
  useEffect(() => {
    memberget();
  }, []);

  const router = useRouter();
  const [memberId, setmemberId] = useState<string>('');
  const [nickname, setnickname] = useState<string>('');
  const [part, setpart] = useState<string>('');

  const [memberfine, setmemberfine] = useState<fine[] | undefined>();
  const setInfo = (memberlist: list) => {
    setmemberId(memberlist.memberId);
    setnickname(memberlist.nickname);
    setpart(memberlist.part);
    setmemberfine(memberlist.fines);
  };
  const memberget = async () => {
    const headerstr =
      'Bearer ' + localStorage.getItem('logintoken')?.replace(/\"/gi, '');
    await axios
      .get('/api/member', {
        headers: {
          Authorization: headerstr,
        },
      })
      .then((response) => setInfo(response.data))
      .catch((e) => console.log(e));
  };

  return (
    <>
      <StyledProfile>
        <StyledImg src="/GDSC.webp"></StyledImg>
        <h2 style={{ fontWeight: '700' }}>{nickname}</h2>
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
              style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
              }}
            ></div>
          </form>
        </StyledFineArea>
      </StyledProfile>
    </>
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
