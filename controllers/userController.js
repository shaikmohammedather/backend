export function getUser(req, res) {
  res.json({
    message: "user fetched successfully",
    users: ["ather", "akmal"],
  });
}
