export default function ({ $auth, redirect }) {
    if (!$auth.user) {
        return redirect("/login");
    }
}