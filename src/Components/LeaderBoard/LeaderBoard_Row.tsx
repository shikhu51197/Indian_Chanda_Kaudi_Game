import { Tr, Td } from "@chakra-ui/react";
import { PlayerType } from "./LeaderBoard";

export interface LeaderBoard_Row_Type {
  player: PlayerType;
  index: number;
}

const LeaderBoard_Row = (props: LeaderBoard_Row_Type) => {
  const { id, name, status, score, email } = props.player;

  return (
    <Tr>
      <Td textAlign={"center"} fontWeight={"bold"}>
        {name}
      </Td>
      <Td textAlign={"center"}>{email}</Td>
      <Td textAlign={"center"}>{status}</Td>
      <Td textAlign={"center"}>{score}</Td>
    </Tr>
  );
};

export default LeaderBoard_Row;
