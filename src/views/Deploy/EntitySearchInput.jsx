import React from 'react';
import { Input } from 'components';

const EntitySearchInput = ({ placeholder, value, onChange }) => {
    return (
        <Input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

export default EntitySearchInput;
