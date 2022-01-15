import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { THUMBS } from "../../constants/types/People";
import { voteNow } from "../../store/people/peopleSlice";
import { RootState } from "../../store/store";
import PersonCard from "./PersonCard";

const VoteSection: FC = () => {
  const people = useSelector((state: RootState) => state.people.people);
  const dispatch = useDispatch();

  const handleVote = useCallback(
    (id: number, thumb: THUMBS) => {
      dispatch(voteNow({ id, thumb }));
    },
    [dispatch]
  );

  return (
    <>
      <h2>Previous Rulings</h2>
      <ul className="people-list">
        {people &&
          people.length > 0 &&
          people.map((person) => (
            <PersonCard key={person.id} {...person} onVote={handleVote} />
          ))}
      </ul>
    </>
  );
};

export default VoteSection;
