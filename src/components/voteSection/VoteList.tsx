import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import PersonCard from "./PersonCard";

const VoteSection: FC = () => {
  const people = useSelector((state: RootState) => state.people.people);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(people);
  }, []);

  return (
    <>
      <h2>Previous Rulings</h2>
      <ul className="people-list">
        {people &&
          people.length > 0 &&
          people.map((person, index) => (
            <PersonCard key={`${index}-${person.name}`} {...person} />
          ))}
      </ul>
    </>
  );
};

export default VoteSection;
