interface JinxResponse {
  id: string;
  jinx: JinxInnerResponse[];
}

interface JinxInnerResponse {
  id: string;
  reason: string;
}

export default JinxResponse