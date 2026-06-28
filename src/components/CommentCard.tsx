import { StyleSheet, Text, View } from "react-native";
import { Comment } from "../types";
import Avatar from "./Avatar";

type Props = {
  comment: Comment;
};

export default function CommentCard({ comment }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Avatar name={comment.name} />
        <Text style={styles.userName}>{comment.name}</Text>
      </View>

      <Text style={styles.content}>{comment.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },
  content: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});