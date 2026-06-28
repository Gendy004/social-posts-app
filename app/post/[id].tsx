import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Avatar from "../../src/components/Avatar";
import CommentCard from "../../src/components/CommentCard";
import { getCommentsByPostId, getPostById, getUserById } from "../../src/services/api";
import { Comment, PostWithUser } from "../../src/types";

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [post, setPost] = useState<PostWithUser | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDetails() {
    if (!id) return;

    try {
      setError("");

      const postData = await getPostById(id);

      let postWithUser: PostWithUser = postData;

      try {
        const user = await getUserById(postData.user_id);
        postWithUser = { ...postData, user };
      } catch {
        postWithUser = postData;
      }

      const commentsData = await getCommentsByPostId(id);

      setPost(postWithUser);
      setComments(commentsData);
    } catch {
      setError("Could not load post details.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>Loading details...</Text>
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error || "Post not found."}</Text>
      </View>
    );
  }

  const userName = post.user?.name || "Unknown User";

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <View style={styles.postCard}>
              <View style={styles.header}>
                <Avatar name={userName} />
                <Text style={styles.userName}>{userName}</Text>
              </View>

              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.content}>{post.body}</Text>
            </View>

            <Text style={styles.commentsTitle}>Comments</Text>

            {comments.length === 0 && (
              <Text style={styles.empty}>No comments for this post yet.</Text>
            )}
          </View>
        }
        renderItem={({ item }) => <CommentCard comment={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5FA",
  },
  list: {
    padding: 18,
  },
  postCard: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 14,
    marginBottom: 22,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  userName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111",
    marginBottom: 10,
  },
  content: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111",
    marginBottom: 12,
  },
  empty: {
    color: "#777",
    marginBottom: 12,
  },
  center: {
    flex: 1,
    backgroundColor: "#F4F5FA",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  error: {
    fontSize: 16,
    color: "#D33",
    textAlign: "center",
  },
});