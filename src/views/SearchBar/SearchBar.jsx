//updated - commit done - missing pull//
import { useEffect, useState } from "react";
import { getAllUsers as getAllUsersService } from "../../services/UserService";
import { Link } from "react-router-dom";
import "./SearchBar.css"
export const SearchBar = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllUsersService()
      .then((users) => {
        setUsers(users);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredUsers = search
    ? users.filter((user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase())
    )
    : [];

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  return (
    <div id="searchbar">
      <div className="input-group mb-2">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Look For Your Friends Here 👀"
          aria-label="Search"
          aria-describedby="search-addon"
          value={search}
          onChange={handleSearchChange}
        />
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => setSearch("")}
        >
          Clear
        </button>
      </div>
      {filteredUsers.length > 0 && (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id}>
              <Link
                className="text-dark text-decoration-none"
                to={`/profile/${user.id}`}
              >
                {user.firstName} {user.lastName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
