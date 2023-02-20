import { useState } from 'react';

// 커스텀 hook
function useInput(text) {
    const [value, setValue] = useState(text);

    const handler = (e) => {
        setValue(e.target.value);
    };
    return [value, handler];
}
export default useInput;
