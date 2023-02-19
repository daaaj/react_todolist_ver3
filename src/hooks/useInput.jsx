import { useState } from 'react';

// 커스텀 hook
function useInput() {
    const [value, setValue] = useState('');

    const handler = (e) => {
        setValue(e.target.value);
    };
    return [value, setValue, handler];
}
export default useInput;
