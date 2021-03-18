import {ResultColor} from "pages/api/random-result";

const Color = ({value}: {value: ResultColor}) =>
  value === ResultColor.BLACK ? <span>BLACK</span> : <span>RED</span>;

export default Color