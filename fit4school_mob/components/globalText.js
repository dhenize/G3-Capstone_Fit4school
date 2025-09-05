import { Text as RNText } from "react-native";

export function Text(props) {
  return <RNText {...props} style={[{ fontFamily: "Lexend_400Regular" }, props.style]} />;
}
