import React, { useEffect, useState } from "react";
import fetchApi from "../../utils/apiService";

const GroupManagement = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupName, setGroupName] = useState("");
  const [parentGroupId, setParentGroupId] = useState("");

  const selectGroup = (event) => {
    // Group Id selected is in group.dataset.groupId
    const group = event.target.closest("div");
    // If we have an id, we can do something with it otherwise ignore
    if (group?.dataset?.groupId) {
      console.log(group.dataset.groupId);
      group.classList.toggle("bg-blue-200");
    }
  };


  const handleAddGroup = async (event) => {
    event.preventDefault();
    try {
      const result = await fetchApi("/api/v1/group", {
        method: "POST",
        body: {
          groupName,
          parentGroupId,
        },
      });
      console.log(result);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchApi("/api/v1/group", {});
        console.log(result);
        setGroups(result);
        setLoading(false);
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchData();
  }, []);

  const handleparentGroupIdChange = (event) => {
    setParentGroupId(event.target.value);
  };

  return (
    <section className="mt-8">
      <p className="text-2xl font-bold">Current Groups</p>
      {groups.length === 0 ? (
        <p>No groups found</p>
      ) : (
        <div id="group-list" className="grid grid-cols-3 gap-4 mt-4" onClick={selectGroup}>
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg"
              data-group-id={group.id}
            >
              <h2 className="text-xl font-bold">{group.groupName}</h2>
              <p>{group.description}</p>
            </div>
          ))}
        </div>
      )}
      <hr className="my-5" />
      <h2 className="text-2xl font-bold">Add Group</h2>
      <form onSubmit={handleAddGroup} className="mt-4">
        <input
          type="text"
          value={groupName}
          onChange={handleGroupNameChange}
          placeholder="Group name"
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        />
        <label htmlFor="parentGroupId" className="block mt-4">
          Parent Group
        </label>
        <select
          value={parentGroupId}
          onChange={handleparentGroupIdChange}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        >
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.groupName}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Add
        </button>
      </form>
    </section>
  );
};

export default GroupManagement;
