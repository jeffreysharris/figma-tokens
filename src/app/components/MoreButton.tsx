import * as React from 'react';
import {ContextMenu, MenuItem, ContextMenuTrigger, showMenu} from 'react-contextmenu';
import Icon from './Icon';
import {useTokenState} from '../store/TokenContext';

const MoreButton = ({properties, children, path, value, onClick, onEdit, onDelete}) => {
    const whichClicked = (e) => {
        console.log('Which Clicked!');
        const x = e.clientX;
        const y = e.clientY;
        showMenu({
            position: {x, y},
            id: `${path}-${value}`,
        });
    };
    const addHandlerToChildren = React.Children.map(children.props.children, (child) => {
        console.log(child.props);
        if (child.props.type === 'button') {
            return React.cloneElement(child, {
                onClick: whichClicked,
                className: 'test',
            });
        }
        return child;
    });

    const {selectionValues} = useTokenState();
    const visibleProperties = properties.filter((p) => p.label);
    return (
        <div className="w-full">
            <ContextMenuTrigger id={`${path}-${value}`}>{addHandlerToChildren}</ContextMenuTrigger>
            <ContextMenu id={`${path}-${value}`} className="text-xs">
                {visibleProperties.map((property) => {
                    const isActive = selectionValues[property.name] === `${path}.${value}`;

                    return (
                        <MenuItem key={property.label} onClick={() => onClick([property.name], isActive)}>
                            <div className="flex items-center">
                                {property.icon && (
                                    <div className="mr-2 text-white">
                                        <Icon name={property.icon} />
                                    </div>
                                )}
                                {isActive && '✔'}
                                {property.label}
                            </div>
                        </MenuItem>
                    );
                })}
                {visibleProperties?.length > 1 && <MenuItem divider />}
                <MenuItem onClick={onEdit}>Edit Token</MenuItem>
                <MenuItem onClick={onDelete}>Delete Token</MenuItem>
            </ContextMenu>
        </div>
    );
};

export default MoreButton;
