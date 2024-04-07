import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import fetchApi from "../../utils/apiService";

const GroupDetails = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState({});
  const [groupName, setGroupName] = useState("");

  const [parentGroupId, setParentGroupId] = useState(groupId);

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleAddGroup = async (event) => {
    event.preventDefault();
    try {
      const result = await fetchApi("/api/v1/group", {
        method: "POST",
        body: {
          groupName,
          parentGroupId: groupId,
        },
      });
    } catch (error) {
      console.error("API error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchApi(`/api/v1/group/${groupId}`, {});
        console.log(result);
        setGroup(result);
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p className="text-2xl font-bold">{group.groupName}</p>
      <p></p>
        <hr className="my-5" />
        <h2 className="text-2xl font-bold">Add Subgroup to {group.groupName}</h2>
      <form onSubmit={handleAddGroup} className="mt-4">
        <input
          type="text"
          value={groupName}
          onChange={handleGroupNameChange}
          placeholder="Subgroup name"
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default GroupDetails;
