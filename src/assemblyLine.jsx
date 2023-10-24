import React, { useState, useRef } from 'react';

const AssemblyLine = ({ stages }) => {
    const [items, setItems] = useState(Array(stages.length).fill([]));
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputSubmit = (e) => {
        if (e.key === 'Enter' && inputValue) {
            const updatedItems = [...items];
            updatedItems[0] = [inputValue, ...updatedItems[0]];
            setItems(updatedItems);
            setInputValue('');
            inputRef.current.value = '';
        }
    };

    const handleItemClick = (stageIndex, itemIndex) => {
        const updatedItems = [...items];
        if (stageIndex === stages.length-1) {
            updatedItems[stageIndex] = updatedItems[stageIndex].filter(
                (item, index) => index !== itemIndex
            );
        } else {

            let selectedItem = updatedItems[stageIndex].find((item, index) => index === itemIndex );
            updatedItems[stageIndex] = updatedItems[stageIndex].filter(
                (item, index) => index !== itemIndex
            );
            updatedItems[stageIndex + 1] = [selectedItem, ...updatedItems[stageIndex + 1]];
        }
        setItems(updatedItems);
    };

    const handleItemRightClick = (stageIndex, itemIndex) => {
        const updatedItems = [...items];
        if (stageIndex > 0) {
            let selectedItem = updatedItems[stageIndex].find((item, index) => index === itemIndex );
            updatedItems[stageIndex] = updatedItems[stageIndex].filter(
                (item, index) => index !== itemIndex
            );
            updatedItems[stageIndex - 1] = [selectedItem, ...updatedItems[stageIndex - 1]];
        }else {
            updatedItems[stageIndex] = updatedItems[stageIndex].filter(
                (item, index) => index !== itemIndex
            );
        }
        setItems(updatedItems);
    };

    return (
        <div>
            <input
                data-testid="assembly-add-item"
                type="text"
                placeholder="Add an item"
                onChange={handleInputChange}
                onKeyPress={handleInputSubmit}
                ref={inputRef}
            />
            <div className="stagesContainer">
                {stages.map((stage, stageIndex) => (
                    <div key={stageIndex} className="stageItemsContainer" data-testid="assembly-stage">
                        <h2>{stage}</h2>
                        {items[stageIndex].map((item, itemIndex) => (
                            <button
                                key={itemIndex}
                                data-testid="assembly-item"
                                onClick={() => handleItemClick(stageIndex, itemIndex)}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    handleItemRightClick(stageIndex, itemIndex);
                                }}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssemblyLine;
