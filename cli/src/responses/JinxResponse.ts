interface JinxResponse {
  id: string;
  jinx: JinxInnerResponse[];
}

export interface JinxInnerResponse {
  id: string;
  reason: string;
}

export default JinxResponse