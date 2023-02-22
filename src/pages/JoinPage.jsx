import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { __getId } from '../redux/modules/getIdSlice';
import { useSelector } from 'react-redux';
import { __join } from '../redux/modules/joinSlice';
import { useNavigate } from 'react-router';

const JoinArea = styled.div`
    ${(props) => props.theme.FlexCol};
    ${(props) => props.theme.MainWidth};
    height: calc(100vh - 13.5625rem);
    border-top: 0.3125rem solid ${(props) => props.theme.CL.mainDeepPink};
    background-color: beige;
`;

const JoinBox = styled.form`
    background-color: pink;
    ${(props) => props.theme.FlexCol};
    width: 350px;
    height: 400px;
    padding: 2.5rem;
    margin-bottom: 100px;
    border-radius: ${(props) => props.theme.BR.large};
`;

function JoinPage() {
    // input 값
    const [idValue, setIdValue] = useState('');
    const [pwValue, setPwValue] = useState('');

    // 오류 메세지
    const [idMessage, setIdMessage] = useState('');
    const [pwMessage, setPwMessage] = useState('');

    // 유효성 검사 둘다 true 일시 버튼 클릭 가넝
    const [isId, setIsId] = useState(false);
    const [isPw, setIsPw] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // db에서 id 가져오기
    const { isLoding, error, id } = useSelector((state) => {
        return state.id;
    });

    //
    useEffect(() => {
        if (id.length !== 0) {
            setIdMessage('사용중인 id 입니다.');
            setIsId(false);
        }
    }, [id]);

    // error 내용이 안바뀌니깐 한번 출력되면 2번 해도 똑같음..
    useEffect(() => {
        if (error !== undefined) {
            setIdMessage(error);
            setIsId(true);
        }
    }, [error]);

    // id 중복체크
    const idCheck = () => {
        dispatch(__getId(idValue));
    };

    // submit 될때 정보 넘기기~
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(__join({ id: idValue, pw: pwValue }));
        gologinPage();
    };

    // id change
    const onChangeId = (e) => {
        setIdValue(e.target.value);

        const idRegex = /^(?=.*?[0-9])(?=.*?[a-z]).{5,}$/;

        if (!idRegex.test(e.target.value)) {
            setIdMessage('영어 소문자, 숫자 각각 1개 이상, 5자리 이상이여야 합니다.');
            setIsId(false);
        } else {
            setIdMessage('올바른 id 형식입니다');
            setIsId(false);
        }
    };

    // pw change
    const onChangePw = (e) => {
        setPwValue(e.target.value);

        const idRegex = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

        if (!idRegex.test(e.target.value)) {
            setPwMessage('패스워드는 최소 8자리 이상 영어 소문자, 숫자, 특수문자가 각각 1개 이상이여야 합니다.');
            setIsPw(false);
        } else {
            setPwMessage('올바른 패스워드 형식입니다');
            setIsPw(true);
        }
    };

    // 취소
    const gologinPage = useCallback(() => {
        navigate('/login');
    }, []);

    return (
        <JoinArea>
            <JoinBox onSubmit={onSubmit}>
                <span>회원가입</span>
                <div>
                    <label>아이디</label>
                    <input type="text" value={idValue} onChange={onChangeId} />
                    <button type="button" onClick={idCheck}>
                        중복확인
                    </button>
                </div>
                <span>오류 : {idValue.length > 0 && idMessage}</span>
                <div>
                    <label>비밀번호</label>
                    <input type="password" value={pwValue} onChange={onChangePw} />
                </div>
                <span>오류 :{pwValue.length > 0 && pwMessage}</span>
                <div>
                    <button type="button" onClick={gologinPage}>
                        취소
                    </button>
                    <button style={{ background: 'red' }} type="submit" disabled={!(isId && isPw)}>
                        회원가입
                    </button>
                </div>
            </JoinBox>
        </JoinArea>
    );
}

export default JoinPage;

//cosole.log('control : ', control._fields.id._f.ref.value); // input값
//  <input type="text" ref={idRef} {...register('id', { pattern: { value: /^(?=.*?[0-9])(?=.*?[a-z]).{5,}$/, message: '영어 소문자, 숫자 각각 1개 이상, 5자리 이상이여야 합니다.' } })} placeholder="아이디" autoFocus />
//  <input type="password" {...register('pw', { pattern: { value: /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, message: '패스워드는 최소 8자리 이상 영어 소문자, 숫자, 특수문자가 각각 1개 이상이여야 합니다.' } })} />
