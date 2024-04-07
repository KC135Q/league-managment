import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchApi from "../../utils/apiService";

const GroupManagement = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchApi("/api/v1/group", {});
        setGroups(result);
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mt-8">
      <p className="text-2xl font-bold">Current Groups</p>
      {groups.length === 0 ? (
        <p>No groups found</p>
      ) : (
        <div id="group-list" className="grid grid-cols-3 gap-4 mt-4">
          {groups.map((group) => (
            <Link to={`/groups/${group.id}`} key={group.id}>
              <div
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg"
                data-group-id={group.id}
              >
                <h2 className="text-xl font-bold">{group.groupName}</h2>
                <p>{group.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      <hr className="my-5" />
      <h2 className="text-2xl font-bold">Add Group</h2>
    </section>
  );
};

export default GroupManagement;
