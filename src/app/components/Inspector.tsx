import * as React from 'react';
import {useTokenState, useTokenDispatch} from '../store/TokenContext';
import Textarea from './Textarea';
import Button from './Button';

const Inspector = () => {
    const {selectionValues} = useTokenState();
    const {removeNodeData} = useTokenDispatch();
    const text = React.useRef('');
    text.current = Object.entries(selectionValues).length > 0 ? `${JSON.stringify(selectionValues, null, 2)}` : '';
    return (
        <div className="space-y-2 p-4">
            <div className="space-y-1">
                <Textarea placeholder="Select layer" rows={20} onChange={false} value={text.current} />
            </div>
            <Button variant="secondary" onClick={removeNodeData}>
                Remove tokens from layer
            </Button>
        </div>
    );
};

export default Inspector;
