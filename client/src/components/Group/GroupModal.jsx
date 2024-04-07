import React from 'react';

const GroupModal = ({ id, groupName, createdAt, childGroupIds, parentGroupId }) => {
    return (
        <div>
            <h2>Group {id} Details</h2>
            <p>Group Name: {groupName}</p>
            <p>Created At: {createdAt}</p>
            <p>Child Group IDs: {childGroupIds}</p>
            <p>Parent Group ID: {parentGroupId}</p>
        </div>
    );
};

export default GroupModal;