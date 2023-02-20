import { css } from 'styled-components';

export const FlexRow = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const FlexRowBetween = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const FlexCol = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const MainWidth = css`
    max-width: 62.5rem;
    margin: 0px auto;
`;

export const ModalBoxStyle = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 40rem;
    height: 40rem;
    border-radius: 2.5rem;
    background-color: #fff5e4;
`;

export const ModalBackgroundStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.8);
`;
// 모달 title
export const ModalTitle = css`
    width: 25rem;
    height: 1.875rem;
    margin: 1.25rem 0;
`;
// 모달 content
export const ModalContent = css`
    width: 25rem;
    height: 12.5rem;
    margin-bottom: 1.875rem;
    resize: none;
`;
// 모달 title, content 공통
export const ModalTitleContent = css`
    padding: 0.625rem;
    border: none;
    border-radius: 1rem;
    font-size: 1.2rem;
    &:focus {
        outline: 0.1875rem solid #ff9494;
    }
`;
// title border left
export const TitleBorderLeft = css`
    border-left: 0.3125rem solid #ff9494;
`;

export const CL = {
    mainPink: '#ffd1d1',
    mainBeige: '#fff5e4',
    mainDeepPink: '#ff9494',
};

export const FS = {
    xl: '1.8rem', // header
    l: '1.6rem', // title
    m: '1.3rem', // content, input
    s: '0.9rem', // button
};

export const FW = {
    bold: 700,
    semiBold: 600,
    normal: 400,
};

export const BR = {
    round: '100%',
    half_round: '50%',
    large: '2.5rem', // 모달창, 리스트
    normal: '1rem', // button, input, textarea
    small: '0.5rem',
};
