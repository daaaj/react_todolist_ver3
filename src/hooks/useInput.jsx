import { useState } from 'react';

function UseInput() {
    const [value, setValue] = useState('');

    const handler = (e) => {
        setValue(e.target.value);
    };
    return [value, setValue, handler];
}
export default UseInput;
