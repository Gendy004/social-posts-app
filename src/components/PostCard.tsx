import { Pressable, StyleSheet, Text, View } from "react-native";
import { PostWithUser } from "../types";
import Avatar from "./Avatar";

type Props = {
  post: PostWithUser;
  onPress: () => void;
};

export default function PostCard({ post, onPress }: Props) {
  const userName = post.user?.name || "Unknown User";

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Avatar name={userName} />
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content} numberOfLines={3}>
        {post.body}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  userName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});