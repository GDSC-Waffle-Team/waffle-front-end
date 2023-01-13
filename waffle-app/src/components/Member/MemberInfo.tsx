import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import router from 'next/router';

const MemberInfo = () => {
  const [fineCount, setFineCount] = useState<number>(); // 총 벌금 납부 횟수 n
  const [fineValue, setFineValue] = useState<number>(); // 총 벌금액
  const [statusValue, setStatusValue] = useState<number>(); // 벌금 납부 완료 금액
  const [statusCount, setStatusCount] = useState<number>(); // 벌금 미납부 완료 횟수 (false의 개수)
  const [statusCountChecked, setStatusCountChecked] = useState<number>(); // 벌금 납부 완료 회수 (true & !01)
  const [fine4Late, setFine4Late] = useState<number>(); // 지각 횟수
  const [fine4NSubmitted, setFine4NSubmitted] = useState<number>(); // 과제 미제출 횟수
  const [absenceCount, setAbsenceCount] = useState<number>(); // 결석 횟수
  const [memberInfo, setMemberInfo] = useState({
    memberId: '',
    nickname: '',
    part: '',
    fines: [
      {
        id: '',
        memberId: '',
        date: 'YYYY-MM-DD',
        type: '',
        status: false,
      },
    ],
  });
  // api로부터 맴버의 정보를 받아오는 함수
  //? 왜 get요청은 useEffect를 따로 선언해야하는가.
  useEffect(() => {
    const getInfo = async () => {
      const response = await axios
        .get('/api/member', {
          headers: {
            Authorization: `Bearer ${localStorage
              .getItem('logintoken')
              ?.replace(/\"/gi, '')}`,
          },
        })
        .then((response) => {
          setMemberInfo(response.data);
        });
    };
    getInfo().catch((e) => router.push('/Admin'));
  }, []);

  // 맴버의 벌금 내역 중 n을 계산하는 함수
  // 맴버의 벌금 내역 중 미납부한 횟수를 구하는 함수
  useEffect(() => {
    const finesLength = () => {
      //지각 카운트
      const nCount1 = memberInfo.fines.filter((fine) => {
        if (fine.type === '00') {
          return fine;
        }
      });
      setFine4Late(nCount1.length);
      // 미제출 카운트
      const nCount2 = memberInfo.fines.filter((fine) => {
        if (fine.type === '10') {
          return fine;
        }
      });
      setFine4NSubmitted(nCount2.length);
      // n(지각+미제출) 카운트
      const nCount3 = memberInfo.fines.filter((fine) => {
        if (fine.type === '00' || fine.type === '10') {
          return fine;
        }
      });
      setFineCount(nCount3.length);
      // 결석 카운트
      const nCount4 = memberInfo.fines.filter((fine) => {
        if (fine.type === '01') {
          return fine;
        }
      });
      setAbsenceCount(nCount4.length);
      let wholeFineValue = 0;
      for (let i = 0; i < nCount3.length; i++) {
        wholeFineValue += 1000 * 2 ** i;
      }
      setFineValue(wholeFineValue); // 벌금 총액
    };
    finesLength();
    const statusLength = () => {
      // 지각과 미제출 중 미납한 회수를 구하는 함수
      const statusCount = memberInfo.fines.filter((statusCount) => {
        if (statusCount.status == false && statusCount.type != '01') {
          return statusCount;
        }
      });
      setStatusCount(statusCount.length); // 미납횟수

      // 지각과 미제출 중 완납한 회수를 구하는 함수
      const statusCountChecked = memberInfo.fines.filter((statusCount) => {
        if (statusCount.status == true && statusCount.type != '01') {
          return statusCount;
        }
      });
      // statusCountChecked.length :  완납횟수
      let StatusTrueValue = 0;
      for (let i = 0; i < statusCountChecked.length; i++) {
        StatusTrueValue += 1000 * 2 ** i;
      }
      setStatusCountChecked(StatusTrueValue);

      let statusWholeValue = 0;
      if (fineCount !== undefined) {
        // n
        for (let i = fineCount - statusCount.length; i < fineCount; i++) {
          statusWholeValue += 1000 * 2 ** i;
        }
      }
      setStatusValue(statusWholeValue); // 미납된 벌금액
    };
    statusLength();
  }, [memberInfo.fines, fineCount]);

  const OnClick = (e: React.MouseEvent) => {
    router.replace('/', undefined, { shallow: true });
    localStorage.removeItem('logintoken');
  };
  return (
    <>
      <StyledLogo>Waffle</StyledLogo>
      <MypageBox>
        <Navbar>
          <Part>{memberInfo.part}</Part>
          <Logout type="button" onClick={OnClick}>
            로그아웃
          </Logout>
        </Navbar>
        <Name>{memberInfo.nickname}</Name>
        <ValueBox>
          <VB1val>
            <VB1valSpan>미납 금액</VB1valSpan>
            <br />
            {statusValue}원
          </VB1val>
          {/* 금액 박스 두번째 줄 */}
          <VB2Box>
            <VB2val>
              <VB2valSpan>완납 금액</VB2valSpan>
              <br />
              {statusCountChecked}원
            </VB2val>
            <VB2val>
              <VB2valSpan>벌금 총금액</VB2valSpan>
              <br />
              {fineValue}원
            </VB2val>
          </VB2Box>
        </ValueBox>
        <CountBox>
          <div>지각{fine4Late}</div>
          <div>미제출 {fine4NSubmitted}</div>
          <div>결석 {absenceCount}</div>
        </CountBox>
        <TableTitle>벌금 내역</TableTitle>
        <StyledTable>
          <StyledTbody>
            {memberInfo.fines.map((fine) => (
              <StyledTr key={fine.id}>
                <StyledTd>{fine.date}</StyledTd>
                <StyledTd>
                  {fine.type == '00'
                    ? '지각'
                    : fine.type == '01'
                    ? '결석'
                    : fine.type == '10'
                    ? '미제출'
                    : ''}
                </StyledTd>
                <StyledTd>{fine.status ? '납부' : '미납부'}</StyledTd>
              </StyledTr>
            ))}
          </StyledTbody>
        </StyledTable>
      </MypageBox>
    </>
  );
};

const TableTitle = styled.div`
  padding: 20px 0px 3px 20px;
  color: #858585;
`;
const StyledTable = styled.table`
  width: 100%;
  padding: 20px 0px;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
const StyledTbody = styled.tbody`
  width: 100%;
`;
const StyledTd = styled.td`
  margin-bottom: 5px;
  font-size: 20px;
  color: #858585;
`;
const StyledTr = styled.tr`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  width: 15;
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 20px;
  padding: 20px;
  border-radius: 20px;
  font-size: 20px;
  color: #858585;
  background-color: #ffd58b;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const VB2Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 30px;
`;
const VB2valSpan = styled.span``;
const VB1valSpan = styled.span``;
const VB2val = styled.div``;
const VB1val = styled.div``;
const ValueBox = styled.div`
  margin-top: 10px;
  padding: 20px;
  border-radius: 20px;
  background-color: #3b4047;
  color: #ffd58b;
  height: auto;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  ${VB1val} {
    font-size: 40px;
    text-align: center;
    ${VB1valSpan} {
      font-size: 24px;
    }
  }
  ${VB2val} {
    font-size: 28px;
    text-align: center;
    ${VB2valSpan} {
      font-size: 18px;
    }
  } ;
`;

const Name = styled.div`
  font-size: 24px;
  color: #858585;
  padding-left: 5px;
`;
const Part = styled.div``;
const Logout = styled.button``;
const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 5px 3px 7px;
  ${Part} {
    padding-bottom: 0;
    color: #858585;
    font-size: 12px;
  }
  ${Logout} {
    all: unset;
    color: #858585;
    font-size: 12px;
  }
`;

const StyledLogo = styled.div`
  color: #21262d;
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  min-width: 500px;
`;

const MypageBox = styled.div`
  padding: 30px;
`;

export default MemberInfo;
