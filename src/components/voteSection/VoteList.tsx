import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { THUMBS } from "../../utils/types/People";
import { voteNow } from "../../store/people/peopleSlice";
import { RootState } from "../../store/store";
import PersonCard from "./PersonCard";
import Select from "react-select";
import useDevice from "../../hooks/useDevice";

const options = [
  { value: "grid", label: "Grid" },
  { value: "list", label: "List" },
];

const VoteSection: FC = () => {
  const people = useSelector((state: RootState) => state.people.people);
  const dispatch = useDispatch();

  const [viewMode, setViewMode] = useState(options[0]);
  const overlay = useRef<HTMLElement>(document.getElementById("overlay"));
  const { isMobile } = useDevice();

  useEffect(() => {
    if (isMobile) {
      setViewMode(options[0]);
    }
  }, [isMobile]);

  const handleVote = useCallback(
    (id: number, thumb: THUMBS) => {
      dispatch(voteNow({ id, thumb }));
    },
    [dispatch]
  );

  return (
    <>
      <div className="vote-header">
        <h2>Previous Rulings</h2>
        <Select
          className="custom-select-container"
          classNamePrefix="custom-select"
          onChange={(newValue) => {
            setViewMode(newValue!);
          }}
          value={viewMode}
          options={options}
          menuPortalTarget={overlay.current}
          isSearchable={false}
        />
      </div>
      <ul
        className={`vote-list ${viewMode.value === "list" ? "list-mode" : ""}`}
      >
        {people &&
          people.length > 0 &&
          people.map((person) => (
            <PersonCard
              key={person.id}
              {...person}
              onVote={handleVote}
              viewMode={viewMode.value}
            />
          ))}
      </ul>
    </>
  );
};

export default VoteSection;
