import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

const VoteSection: FC = () => {
  const people = useSelector((state: RootState) => state.people);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(people);
  }, []);

  return (
    <>
      <h2>Previous Rulings</h2>
      <div className="people-list"></div>
    </>
  );
};

export default VoteSection;
