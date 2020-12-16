import {Menu, MenuList, MenuButton, MenuItem} from '@reach/menu-button';
import * as React from 'react';

const EditButton = React.forwardRef<HTMLDivElement, {properties; onClick; showValue; name}>(
    ({properties, onClick, showValue, name}, forwardedRef) => {
        const visibleProperties = properties.filter((p) => p.label);
        return (
            <div className="w-full h-full" ref={forwardedRef}>
                <Menu>
                    <MenuButton className="button-text">{name}</MenuButton>
                    <MenuList>
                        {visibleProperties.map((property) => {
                            return (
                                <MenuItem
                                    onContextMenu={(e) => {
                                        e.stopPropagation();
                                    }}
                                    onSelect={() => onClick}
                                >
                                    {showValue && property.label}
                                </MenuItem>
                            );
                        })}
                    </MenuList>
                </Menu>
            </div>
        );
    }
);

export default EditButton;
