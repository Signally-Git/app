import parse from "html-react-parser";

export default function RenderHTML(props) {
  const mapObj = {
    PLACEHOLDER_FIRST_NAME: props.data.firstName,
    PLACEHOLDER_LAST_NAME: props.data.lastName,
    PLACEHOLDER_POSTE: props.data.poste,
    PLACEHOLDER_COMPANY: props.data.company,
    PLACEHOLDER_ADDRESS: props.data.address,
    PLACEHOLDER_MOBILE: props.data.mobile,
    PLACEHOLDER_PHONE: props.data.phone,
  };

  return parse(
    props.template.replace(
      /\b(?:PLACEHOLDER_FIRST_NAME|PLACEHOLDER_LAST_NAME|PLACEHOLDER_POSTE|PLACEHOLDER_COMPANY|PLACEHOLDER_ADDRESS|PLACEHOLDER_MOBILE|PLACEHOLDER_PHONE)\b/gi,
      (matched) => mapObj[matched]
    )
  );
}
