import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import fetchApi from "../../utils/apiService";

const GroupDetails = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState({});
  const [showChildren, setShowChildren] = useState(false);
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
        setShowChildren(!showChildren);
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-8">
      <p className="text-2xl font-bold">{group.groupName}</p>
      <hr className="my-5" />
      <section className="mt-8">

        { showChildren && group?.children?.length > 0 ? (
          <div id="group-list" className="grid grid-cols-3 gap-4 mt-4">
            {group.children.map((child) => (
              <Link to={`/groups/${child.id}`} key={child.id}>
              <div
                key={child.id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg"
                data-group-id={child.id}
              >
                <h2 className="text-xl font-bold">{child.groupName}</h2>
                <p>{child.description}</p>
              </div>

              </Link>
            ))}
          </div>
        ) : (
          <p>No subgroups found</p>
        )}
      </section>
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
