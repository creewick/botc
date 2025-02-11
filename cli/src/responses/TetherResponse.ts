interface TetherResponse {
  id: string;
  tether: TetherInnerResponse[];
}

interface TetherInnerResponse {
  id: string;
  reason: string;
}

export default TetherResponse